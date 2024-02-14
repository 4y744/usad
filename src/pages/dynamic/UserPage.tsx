//Import React Router hooks
import { Link, useParams } from "react-router-dom"

//Import firestore hooks
import { useGetAlgorithms, useGetUser } from "../../hooks/firestore";

//Import components
import { NotFoundPage } from "../static/NotFoundPage";
import { LoadingSpinner } from "../../components/Loading/LoadingSpinner";
import { PageWrapper } from "../../components/Layout/PageWrapper";

//Import utils
import { TimeFormatter } from "../../utils/formatter";

//Import assets
import blankProfile from "../../assets/images/blank-profile-image.png"

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const UserPage = () => {

    const {username} = useParams();

    const [user, loading, error] = useGetUser({username: username});
    const [algorithms] = useGetAlgorithms({username: username});

    const {t} = useTranslation();

    if(loading) return <Placeholder/>
    if(error) return <NotFoundPage/>

    return (
        <PageWrapper>

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-5 p-4
            w-[1000px] max-w-[95%]">

                <div className="bg-zinc-800 rounded-md shadow-md
                flex flex-col items-center justify-center p-4">

                    <img src={user?.pfp || blankProfile} alt="This image is missing..." 
                    className="w-24 aspect-square rounded-full
                    outline outline-2 outline-green-600 outline-offset-2
                    mb-2"/>

                    <div className="bg-zinc-900 rounded-md shadow-md
                    flex flex-col justify-center items-center p-2">

                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-green-600 font-semibold">{user.username}</h1>
                        </div>

                        <div className="bg-zinc-">
                            <span className="text-zinc-300 text-sm">
                                {t("joined")} {TimeFormatter.DayMonthYear(user.created)}
                            </span>
                        </div>

                    </div>

                </div>
                
                <div className="bg-zinc-800 rounded-md shadow-md
                p-4 h-[50vh] w-full overflow-y-auto">

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1
                    auto-rows-fr gap-3">         
                        {algorithms.map((alg) => (
                            <Link key={alg.id} 
                            to={`/algorithm/${alg.id}`} 
                            className="bg-zinc-900 rounded-md shadow-md
                            text-white w-full h-full py-4 px-8 group
                            flex flex-col justify-center
                            border border-zinc-700">

                                <div className="flex">

                                    <h1 className="font-medium max-w-3/4 truncate
                                    group-hover:underline">
                                        {alg.title}
                                    </h1>
                                    <span className="bg-zinc-800 rounded-md shadow-md
                                    text-xs h-fit
                                    px-2 py-1 ml-2">{alg.language}</span>

                                </div>

                                <div>
                                    <span className="text-zinc-300 text-xs">
                                        {t("postedon")} {TimeFormatter.DayMonthYear(alg.created)}
                                    </span>
                                </div>

                            </Link> 
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
        flex flex-col gap-5 p-4
        w-[1000px] max-w-[95%]">

            <div className="bg-zinc-800 rounded-md shadow-md
            flex flex-col items-center justify-center p-4">

            <img src={blankProfile} alt="This image is missing..." 
            className="w-24 aspect-square rounded-full
            outline outline-2 outline-green-600 outline-offset-2
            mb-2"/>

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col justify-center items-center p-2 w-24">
                <LoadingSpinner/>            
             </div>

            </div>
                
            <div className="bg-zinc-800 rounded-md shadow-md
            p-4 h-[50vh] w-full overflow-y-auto
            flex justify-center items-center">

                <LoadingSpinner/>

            </div>

        </div>
    </PageWrapper>
)
