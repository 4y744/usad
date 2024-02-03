import { useContext } from "react"
import { AuthContext } from "../../contexts"
import blankProfile from "../../assets/images/blank-profile-image.png"

export const ProfileContainer = () => {

    const user = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center
        gap-1 bg-zinc-800 p-4 rounded-md shadow-md">
            <img src={user?.pfp || blankProfile} alt="This image is missing..." 
            className="w-16 aspect-square rounded-full
            outline outline-2 outline-green-600 outline-offset-2
            mb-2"/>

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col items-center justify-center
            px-2 py-2">
                <h1 className="text-green-600 font-semibold">{user.username}</h1>
                <h2 className="text-white text-xs">{user.email}</h2>
            </div>
        </div>
    )
}
export const InfoContainer = ({views, votes, forks} : {views: number, votes: number, forks: number}) => {

    //TODO: remove props and use auth context

    return (
        <div className="flex flex-col gap-3 p-4
        bg-zinc-800 rounded-md shadow-md">
            <InfoBox 
            title="Views" 
            faClass="fa-solid fa-eye" 
            count={views}/>

            <InfoBox 
            title="Votes" 
            faClass="fa-solid fa-check-to-slot" 
            count={votes}/>

            <InfoBox 
            title="Forks" 
            faClass="fa-solid fa-code-fork"
            count={forks}/>
        </div>
    )
}

const InfoBox = ({title, faClass, count} : {title: string, faClass: string, count: number}) => {

    return (
        <div className="bg-zinc-900 rounded-md shadow-md
        px-4 py-3">
            <h1 className="text-green-600 font-semibold text-lg">
                {title}
            </h1>
            <div className="flex gap-2 items-center">
                <i className={`${faClass} text-sm`}/>
                <span>
                    {count}
                </span>
            </div>
        </div>
    )
}