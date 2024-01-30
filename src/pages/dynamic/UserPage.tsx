//Import React Router hooks
import { useParams } from "react-router-dom"
import { useGetAlgorithms, useGetUser } from "../../hooks/firestore";
import { NotFoundPage } from "../static/NotFoundPage";
import { LinkCard } from "../../components/LinkCard";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { DocumentData } from "firebase/firestore";

export const UserPage = () => {

    const {username} = useParams();

    const user = useGetUser({username: username});
    const {algorithms} = useGetAlgorithms({username: username});

    if(user.error) return <NotFoundPage/>

    return user.loading ? <Placeholder/> : (
        <div className="flex justify-center items-center w-full">

            <div className="md:grid md:grid-cols-3 md:grid-rows-3 gap-5
            flex flex-col
            md:w-[700px] w-[500px] mx-5 my-12 md:aspect-square
            text-white">

                <div className="bg-zinc-900 drop-shadow-md rounded-md
                p-4">
                    <h1 className="text-lg bg-zinc-800 rounded-md text-center py-1 mb-2">Profile</h1>
                    <div className="text-sm">
                        <span>Username: </span> 
                        <span className="text-green-600 font-bold">{user.username}</span></div>
                    <div className="text-sm">
                        <span>Created at: </span>
                        <span className="text-green-600 font-bold">
                            {user.created.getDate()}/
                            {("0" + (user.created.getMonth() + 1).toString()).slice(-2)}/
                            {user.created.getFullYear()}
                        </span>
                    </div>
                </div>
                
                <div className="bg-zinc-900 drop-shadow-md rounded-md
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
                
                <div className="bg-zinc-900 drop-shadow-md rounded-md
                md:row-start-2 md:row-end-4 p-4 max-h-[500px]">
                    <h1 className="text-lg bg-zinc-800 rounded-md text-center py-1 mb-4">Comments</h1>
                    <h2 className="w-full text-center text-sm">This user hasn't written any comments yet...</h2>
                </div>
            </div>
        </div>
    )
}

const Placeholder = () => (
    <div className="flex justify-center items-center w-full">

            <div className="md:grid md:grid-cols-3 md:grid-rows-3 gap-5
            flex flex-col
            md:w-[700px] w-[500px] mx-5 my-12 md:aspect-square
            text-white">

                <div className="bg-zinc-900 drop-shadow-md rounded-md
                p-4 flex justify-center items-center">
                    <LoadingSpinner/>
                </div>
                
                <div className="bg-zinc-900 drop-shadow-md rounded-md
                md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-4 p-4
                flex justify-center items-center">
                    <LoadingSpinner/>
                </div>
                
                <div className="bg-zinc-900 drop-shadow-md rounded-md
                md:row-start-2 md:row-end-4 p-4
                flex justify-center items-center">
                    <LoadingSpinner/>
                </div>
            </div>
        </div>
)
