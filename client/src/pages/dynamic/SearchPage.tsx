//Import React Router hooks
import { Link, useParams } from "react-router-dom"

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper"
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { NotFoundPage } from "../static/NotFoundPage";

//Import firestore hoo
//Import utils
import { TimeFormatter } from "../../utils/formatter";
import { useQueryAlgorithms } from "../../hooks/algolia";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const SearchPage = () => {

    const {query} = useParams();

    const [page, setPage] = useState(1);

    const {t} = useTranslation();

    const [algorithms, loading, error] = useQueryAlgorithms(query!, page - 1);

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

        return (
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
                        {t("search-results-for")} {query}
                    </h1>

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

    // const {query} = useParams();
    // const [algorithms, loading, error] = useQueryAlgorithms({term: query!});

    // const {t} = useTranslation();

    // if(loading) return <Placeholder/>
    // if(error) return <NotFoundPage/>

    // return (
    //     <PageWrapper>
    //         <div className="bg-zinc-900 rounded-md shadow-md
    //         flex flex-col gap-5 p-4 md:w-5/6 h-[80vh] w-[95%]">

    //             <div className="bg-zinc-800 rounded-md shadow-md
    //             p-4">
    //                 <h1 className="text-xl font-semibold
    //                 text-center">{t("search-results-for")}<span className="text-green-600">{query}</span></h1>
    //             </div>

    //             <div className="bg-zinc-800 rounded-md shadow-md p-4
    //             h-full overflow-y-auto">

    //                 <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
    //                     {algorithms.map((alg) => (
    //                         <div key={alg.id} 
    //                         className="bg-zinc-900 rounded-md shadow-md
    //                         text-white w-full h-full py-4 px-8
    //                         flex flex-col justify-center
    //                         border border-zinc-700">

    //                             <div className="flex">

    //                                 <Link 
    //                                 to={`/algorithm/${alg.id}`} 
    //                                 className="font-medium max-w-3/4 truncate
    //                                 hover:underline">
    //                                     {alg.title}
    //                                 </Link>

    //                                 <span className="bg-zinc-800 rounded-md shadow-md
    //                                 text-xs h-fit
    //                                 px-2 py-1 ml-2">BG</span>

    //                             </div>

    //                             <div className="flex gap-1">
    //                                 <span className="text-zinc-300 text-xs">
    //                                     Posted on {TimeFormatter.DayMonthYear(alg.created)}
    //                                 </span>
    //                                 <span className="text-zinc-300 text-xs
    //                                 flex gap-1">
    //                                     by
    //                                     <Link 
    //                                     to={`/user/${alg.author}`}
    //                                     className="hover:underline">
    //                                         {alg.author}
    //                                     </Link>
    //                                 </span>
        
    //                             </div>

    //                         </div> 
    //                     ))}
    //                 </div>
    //             </div>

    //         </div>
    //     </PageWrapper>
    // )
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