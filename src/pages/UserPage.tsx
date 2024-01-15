//Import React Router hooks
import { useParams } from "react-router-dom"
import { useGetAlgorithms, useGetUser } from "../hooks/auth";

export const UserPage = () => {

    const {username} = useParams();

    const {user, loading} = useGetUser(username!);
    const {algorithms} = useGetAlgorithms({username: username})

    return loading ? <PlaceHolder/> : (
        <div className="flex justify-center items-center w-full">
            <div className="grid md:grid-cols-3 grid-rows-3 gap-5
            md:w-[700px] w-[500px] mx-5 my-12 aspect-square
            text-white">
                <div className="bg-zinc-900 drop-shadow-md rounded-md
                p-4">
                    <h1 className="text-lg">Profile</h1>
                    <span>{user.username}</span>
                </div>
                
                <div className="bg-zinc-900 drop-shadow-md rounded-md
                md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-4 p-4
                ">
                    <h1 className="text-lge">Algorithms</h1>
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