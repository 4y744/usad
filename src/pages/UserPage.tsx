//Import React Router hooks
import { useParams } from "react-router-dom"
import { useGetAlgorithms, useGetUser } from "../hooks/firestore";
import { NotFoundPage } from "./NotFoundPage";
import { LinkCard } from "../components/LinkCard";

export const UserPage = () => {

    const {username} = useParams();

    const user = useGetUser({username: username});
    const algorithms = useGetAlgorithms({username: username});

    if(user.error) return <NotFoundPage/>

    return user.loading ? <PlaceHolder/> : (
        <div className="flex justify-center items-center w-full">
            <div className="grid md:grid-cols-3 grid-rows-3 gap-5
            md:w-[700px] w-[500px] mx-5 my-12 aspect-square
            text-white">
                <div className="bg-zinc-900 drop-shadow-md rounded-md
                p-4">
                    <h1 className="text-lg">Profile</h1>
                    <p>{user.username}</p>
                    <p>
                        {user.created.getDate()}/{user.created.getMonth() + 1}/{user.created.getFullYear()}
                    </p>
                </div>
                
                <div className="bg-zinc-900 drop-shadow-md rounded-md
                md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-4 p-4
                overflow-y-scroll
                flex flex-col gap-5
                ">
                    <h1 key="title" className="text-lge">Algorithms</h1>
                    {algorithms?.map((alg) => (
                        <LinkCard key={alg.id} algorithmId={alg.id} title={alg.title} author={alg.author} language="BG" date="28/12/23" votes={5}/>
                    ))}
                </div>
                <div className="bg-zinc-900 drop-shadow-md rounded-md
                md:row-start-2 md:row-end-4 p-4">
                    <h1 className="text-lg">Comments</h1>
                </div>
            </div>
        </div>
    )
}

const PlaceHolder = () => (
    <div>PLACEHOLDER</div>
)