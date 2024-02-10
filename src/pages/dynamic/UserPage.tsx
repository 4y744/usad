//Import React Router hooks
import { Link, useParams } from "react-router-dom"
import { useGetAlgorithms, useGetUser } from "../../hooks/firestore";
import { NotFoundPage } from "../static/NotFoundPage";
import { LoadingSpinner } from "../../components/Loading/LoadingSpinner";
import { TimeFormatter } from "../../utils/formatter";
import { PageWrapper } from "../../components/Layout/PageWrapper";
import blankProfile from "../../assets/images/blank-profile-image.png"

export const UserPage = () => {

    const {username} = useParams();

    const [user, loading, error] = useGetUser({username: username});
    const [algorithms] = useGetAlgorithms({username: username});

    if(loading) return <Placeholder/>
    if(error) return <NotFoundPage/>

    return (
        <PageWrapper>

            {/* <div className="md:grid md:grid-cols-3 md:grid-rows-3 gap-5
            flex flex-col
            md:w-[700px] w-[500px] mx-5 my-12 md:aspect-square
            text-white">

                <div className="bg-zinc-900 shadow-md rounded-md
                p-4">
                    <h1 className="text-lg bg-zinc-800 rounded-md text-center py-1 mb-2">Profile</h1>
                    <div className="text-sm">
                        <span>Username: </span> 
                        <span className="text-green-600 font-bold">{user.username}</span></div>
                    <div className="text-sm">
                        <span>Created at: </span>
                        <span className="text-green-600 font-bold">
                            {TimeFormatter.DayMonthYear(user.created)}
                        </span>
                    </div>
                </div>
                
                <div className="bg-zinc-900 shadow-md rounded-md
                md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-4 p-4
                overflow-y-scroll no-scrollbar max-h-[750px]">
                    
                    <h1 className="text-lg bg-zinc-800 rounded-md text-center py-1 mb-4">Algorithms</h1>
                    {algorithms ? 
                    <div className="bg-zinc-800 rounded-md flex flex-col gap-5 p-4">
                        {algorithms?.map((alg: DocumentData) => (
                            <LinkCard key={alg.id} algorithmId={alg.id} title={alg.title} author={alg.author} language="BG" date="28/12/23" votes={5}/>
                        ))}
                    </div> : <h2 className="w-full text-center text-sm">This user hasn't shared any algorithms yet...</h2>}
                </div>
                
                <div className="bg-zinc-900 shadow-md rounded-md
                md:row-start-2 md:row-end-4 p-4 max-h-[500px]">
                    <h1 className="text-lg bg-zinc-800 rounded-md text-center py-1 mb-4">Comments</h1>
                    <h2 className="w-full text-center text-sm">This user hasn't written any comments yet...</h2>
                </div>
            </div> */}

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-5 p-8">

                <div className="bg-zinc-800 rounded-md shadow-md
                flex flex-col items-center p-4">

                    <img src={user?.pfp || blankProfile} alt="This image is missing..." 
                    className="w-16 aspect-square rounded-full
                    outline outline-2 outline-green-600 outline-offset-2
                    mb-2"/>

                    <div className="bg-zinc-900 rounded-md shadow-md
                    flex flex-col items-center justify-center
                    px-2 py-2 w-fit">
                        <h1 className="text-green-600 font-semibold">{user.username}</h1>
                    </div>

                </div>
                
                <div className="bg-zinc-800 rounded-md shadow-md
                flex flex-col gap-3 p-4
                h-[50vh] overflow-y-auto">
                    {algorithms.map((alg) => (
                        <Link key={alg.id} 
                        to={`/algorithm/${alg.id}`} 
                        className="bg-zinc-900 rounded-md shadow-md
                        text-white w-full h-full py-4 px-8 group
                        flex flex-col justify-center">

                            <div className="flex">

                                <h1 className="font-medium max-w-3/4 truncat
                                group-hover:underline">
                                    {alg.title}
                                </h1>
                                <span className="bg-zinc-800 rounded-md shadow-md
                                text-xs h-fit
                                px-2 py-1 ml-2">BG</span>

                            </div>

                            <div>
                                <span className="text-zinc-300 text-xs"
                                >Posted on {TimeFormatter.DayMonthYear(alg.created)}</span>
                            </div>

                        </Link> 
                    ))}
                </div>
            </div>
        </PageWrapper>
    )
}

const Placeholder = () => (
    <PageWrapper>
        <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-5 p-8">

                <div className="bg-zinc-800 rounded-md shadow-md
                flex flex-col items-center p-4">

                    <img src={blankProfile} alt="This image is missing..." 
                    className="w-16 aspect-square rounded-full
                    outline outline-2 outline-green-600 outline-offset-2
                    mb-2"/>

                    <div className="bg-zinc-900 rounded-md shadow-md
                    flex flex-col items-center justify-center
                    px-2 py-2 w-32 h-12">
                        <LoadingSpinner/>
                    </div>

                </div>
                
                <div className="bg-zinc-800 rounded-md shadow-md
                flex justify-center items-center p-4
                h-[50vh] w-96">
                    <div>
                        <LoadingSpinner/>
                    </div>
                </div>
            </div>
    </PageWrapper>
)
