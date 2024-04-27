//Import React hooks
import { useState } from "react";

//Import React Router hooks
import { Link } from "react-router-dom";

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper"
import { NotFoundPage } from "../static/NotFoundPage";
import { LoadingSpinner } from "../../components/LoadingSpinner";

//Import i18n hooks
import { useTranslation } from "react-i18next";

//Import custom hooks
import { useBrowseAlgorithms } from "../../hooks/algolia";

//Import utils
import { TimeFormatter } from "../../utils/formatter";

export const BrowsePage = () => {

    const {i18n, t} = useTranslation();

    const [page, setPage] = useState(1);
    const [language, setLanguage] = useState<string>(i18n.language.toUpperCase());

    const [algorithms, loading, error] = useBrowseAlgorithms(page - 1, language);

    const handlePrev = () => {

        if(page == 1){
            return;
        }

        setPage(page - 1);

    }

    const handleNext = () => {

        if(algorithms.length < 15){
            return;
        }

        setPage(page + 1);

    }

    if(error){

        return(
            <NotFoundPage/>
        )

    }
    
    return (
        <PageWrapper>
            
            <div className="bg-zinc-900 shadow-md rounded-md overflow-hidden
            border border-zinc-700">

                <div className="flex items-center
                p-4">

                    <h1 className="font-medium">
                        {t("browse-the-db")}
                    </h1>

                    <div className="flex w-fit ml-auto
                    rounded-md shadow-md overflow-hidden">

                        <button className={`${language == "BG" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"} 
                        px-2 py-1`}
                        onClick={() => setLanguage("BG")}>BG</button>

                        <button className={`${language == "EN" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                        px-2 py-1`}
                        onClick={() => setLanguage("EN")}>EN</button>
                    </div>

                </div>

                {loading ? (

                    <div className="flex justify-center items-center min-h-[60vh] w-full">
                        <LoadingSpinner/>
                    </div>

                ) : (

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1
                    auto-rows-min gap-px min-h-[60vh]">

                    {algorithms.map((algorithm, index) => (

                        <div className="flex flex-col p-4
                        outline outline-[1px] outline-zinc-700"
                        key={index}>
                
                            <div className="flex items-center gap-2">
                                            
                                <Link className="text-sm hover:underline"
                                to={`/algorithm/${algorithm.id}`}>
                                    {algorithm.title}
                                </Link>
                
                                <span className="bg-zinc-800 rounded-md shadow-md
                                px-2 py-1 text-xs">
                                    {algorithm.language}
                                </span>
                            </div>
                
                            <div className="flex gap-1 text-xs text-gray-300">
                
                                {t("posted-by")} 

                                <Link className="font-medium hover:underline"
                                to={`/user/${algorithm.author}`}>
                                    {algorithm.author}
                                </Link> 

                                {t("on")} 

                                <span className="font-medium">
                                    {TimeFormatter.DayMonthYear(algorithm.created)}.
                                </span>
                
                            </div>
                
                            <div className="flex items-center gap-4">
                
                                <div className="text-green-700 font-medium text-sm">
                
                                    <i className="fa-solid fa-up-long text-xs pr-1"/>
                                    <span>{algorithm.score}</span>
                
                                </div>
                
                                <div className="text-green-700 font-medium text-sm">
                
                                    <i className="fa-solid fa-message text-xs pr-1"/>
                                    <span>{algorithm.comments}</span>
                
                                </div>
                
                                <div className="text-green-700 font-medium text-sm">
                
                                    <i className="fa-solid fa-code-fork text-xs pr-1"/>
                                    <span>{algorithm.forks}</span>
                
                                </div>
                
                            </div>
                
                        </div>

                    ))}

                    </div>
                )}

            </div>
            
            <div className="flex justify-center w-full">
                <div className="flex items-center w-fit
                bg-zinc-900 rounded-md shadow-md
                border border-zinc-700 overflow-hidden">

                    <button className="px-4 py-2
                    hover:bg-zinc-800"
                    onClick={handlePrev}>
                        <i className="fa-solid fa-caret-left text-xl"/>
                    </button>

                    <span className="px-4">
                        {page}
                    </span>

                    <button className="px-4 py-2
                    hover:bg-zinc-800"
                    onClick={handleNext}>
                        <i className="fa-solid fa-caret-right text-xl"/>
                    </button>

                </div>
            </div>

        </PageWrapper>
    )

}