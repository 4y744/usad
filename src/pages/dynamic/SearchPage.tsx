//Import React Router hooks
import { Link, useParams } from "react-router-dom"

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper"
import { LoadingSpinner } from "../../components/Loading/LoadingSpinner";
import { NotFoundPage } from "../static/NotFoundPage";

//Import firestore hooks
import { useQueryAlgorithms } from "../../hooks/firestore";

//Import utils
import { TimeFormatter } from "../../utils/formatter";
import { useTranslation } from "react-i18next";

export const SearchPage = () => {

    const {query} = useParams();
    const [algorithms, loading, error] = useQueryAlgorithms({term: query!});

    const {t} = useTranslation();

    if(loading) return <Placeholder/>
    if(error) return <NotFoundPage/>

    return (
        <PageWrapper>
            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-5 p-8 md:w-5/6 h-[80vh] w-[95%]">

                <div className="bg-zinc-800 rounded-md shadow-md
                p-4">
                    <h1 className="text-xl font-semibold
                    text-center">{t("search-results-for")}<span className="text-green-600">{query}</span></h1>
                </div>

                <div className="bg-zinc-800 rounded-md shadow-md p-4
                h-full overflow-y-auto">

                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
                        {algorithms.map((alg) => (
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
                                    px-2 py-1 ml-2">BG</span>

                                </div>

                                <div className="flex gap-1">
                                    <span className="text-zinc-300 text-xs">
                                        Posted on {TimeFormatter.DayMonthYear(alg.created)}
                                    </span>
                                    <span className="text-zinc-300 text-xs
                                    flex gap-1">
                                        by
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