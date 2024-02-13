//Import React hooks
import { useState } from "react";

//Import React Router hooks
import { Link } from "react-router-dom";

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper"
import { NotFoundPage } from "../static/NotFoundPage";
import { LoadingSpinner } from "../../components/Loading/LoadingSpinner";

//Import firestore hooks
import { useGetAllAlgorithms } from "../../hooks/firestore";

//Import utils
import { TimeFormatter } from "../../utils/formatter";
import { AlgorithmFilter, AlgorithmSorter } from "../../utils/sorter";

//Import i18n hooks
import { useTranslation } from "react-i18next";

//Import types
import { algorithmDocType } from "../../types";

export const BrowsePage = () => {

    const [algorithms, loading, error] = useGetAllAlgorithms();

    const {t, i18n} = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language.toUpperCase());
    const [sort, setSort] = useState("post-date");

    const sortAlgorithms = (algorithms: algorithmDocType[]) => {
        switch(sort){
            case "alphabetical": 
                return AlgorithmSorter.byAlphabeticalOrder(algorithms);
            case "reverse-alphabetical": 
                return AlgorithmSorter.byReverseAlphabeticalOrder(algorithms);
            case "post-date": 
                return AlgorithmSorter.byPostDate(algorithms);
            case "reverse-post-date": 
                return AlgorithmSorter.byReversePostDate(algorithms);
        }
    }


    if(loading) return <Placeholder/>
    if(error) return <NotFoundPage/>

    return (
        <PageWrapper>
            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-5 p-8 md:w-5/6 w-[95%]">

                <div className="bg-zinc-800 rounded-md shadow-md
                p-4 gap-3
                flex sm:flex-row flex-col items-center">

                    <h1 className="text-xl font-bold
                    text-center">{t("browse-the-db")}</h1>

                    <div className="bg-zinc-900 rounded-md shadow-md
                    w-fit p-2 sm:ml-auto">
                        <span className="font-medium">{t("algorithms")}: </span>
                        <span className="text-green-600 font-semibold">{algorithms.length}</span>
                    </div>

                </div>

                <div className="bg-zinc-800 rounded-md shadow-md p-4
                flex gap-3">

                    <select className="bg-zinc-900 shadow-md rounded-md px-4 py-2
                    hover:bg-zinc-700"
                    defaultValue={i18n.language.toUpperCase() as "BG" | "EN" || "EN"}
                    onChange={(event) => setSelectedLanguage(event.target.value as "BG" | "EN")}>
                        <option>
                            BG
                        </option>
                        <option>
                            EN
                        </option>
                    </select>

                    <div className="bg-zinc-900 w-fit rounded-md shadow-md
                    flex ml-auto">
                    <SortButton
                    handleClick={() => setSort("alphabetical")} 
                    faClass="fa-solid fa-arrow-down-a-z"/>
                                
                    <SortButton 
                    handleClick={() => setSort("reverse-alphabetical")} 
                    faClass="fa-solid fa-arrow-up-a-z"/>

                    <SortButton 
                    handleClick={() => setSort("post-date")} 
                    faClass="fa-solid fa-arrow-down-1-9"/>

                    <SortButton 
                    handleClick={() => setSort("reverse-post-date")} 
                    faClass="fa-solid fa-arrow-up-1-9"/>
            </div>

                </div>
       

                <div className="bg-zinc-800 rounded-md shadow-md p-4
                h-full">

                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
                        {sortAlgorithms(AlgorithmFilter.byLanguage(algorithms, selectedLanguage))!
                        .map((alg) => (
                            <div key={alg.id} 
                            className="bg-zinc-900 rounded-md shadow-md
                            text-white w-full h-full py-4 px-8
                            flex flex-col justify-center
                            border border-zinc-700">

                                <div className="flex">

                                    <Link
                                    to={`/algorithm/${alg.id}`} 
                                    className="font-medium max-w-3/4 truncate
                                    hover:underline">
                                        {alg.title}
                                    </Link>

                                    <span className="bg-zinc-800 rounded-md shadow-md
                                    text-xs h-fit
                                    px-2 py-1 ml-2">{alg.language.toUpperCase()}</span>

                                </div>

                                <div className="flex gap-1">
                                    <span className="text-zinc-300 text-xs">
                                        {t("postedon")} {TimeFormatter.DayMonthYear(alg.created)}
                                    </span>
                                    <span className="text-zinc-300 text-xs
                                    flex gap-1">
                                        {t("by")}
                                        <Link 
                                        to={`/user/${alg.author}`}
                                        className="hover:underline">
                                            {alg.author}
                                        </Link>
                                    </span>
        
                                </div>

                            </div> 
                        ))}
                    </div>
                </div>

            </div>
        </PageWrapper>
    )
}

const SortButton = ({faClass, handleClick} : {faClass: string, handleClick: () => void}) => {

    return (
        <button className="py-2 sm:px-4 px-2 md:text-base text-sm
        hover:bg-green-600 rounded-md
        active:outline outline-2 outline-green-600 outline-offset-2"
        onClick={handleClick}>
            <i className={faClass}/>
        </button>
    )
}

const Placeholder = () => (
    <PageWrapper>
        <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-5 p-8 md:w-5/6 h-[80vh] w-[95%]">

            <div className="bg-zinc-800 rounded-md shadow-md
            p-4 grid place-items-center">
                <LoadingSpinner/>
            </div>

            <div className="bg-zinc-800 rounded-md shadow-md p-4
            h-full grid place-items-center">
                <LoadingSpinner/>
            </div>

        </div>
    </PageWrapper>
)