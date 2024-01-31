import { Link } from "react-router-dom";

export const LinkCard = (props: {algorithmId: string, title: string, author: string, language: string, date: string, votes: number}) => (
    <div className="bg-zinc-900 text-white h-20 w-full px-4 
    flex flex-col justify-center items-start shadow-md
    border-l-green-600 border-l-4">
        <div className="flex items-center w-full py-0.5">
            <Link to={`/algorithm/${props.algorithmId}`} className="md:text-base text-sm font-bold hover:underline truncate">{props.title}</Link>
            <span className="text-xs px-2 py-1 ml-2 rounded-md bg-zinc-800 select-none">{props.language}</span>
        </div>

        <div className="flex items-center py-0.5">
            <span className="text-xs text-gray-300">{props.date}</span>
            <LinkCardAuthor username={props.author}></LinkCardAuthor>
            <div className="flex items-center justify-center">
                <LinkCardAction faClass="fa-caret-up" onclick={() => {}}/>
                <span className="text-xs text-gray-300 mx-1">{props.votes}</span>
                <LinkCardAction faClass="fa-caret-down" onclick={() => {}}/>
            </div>
            <LinkCardAction faClass="fa-retweet" onclick={() => {}}/>
        </div>
    </div>
)


const LinkCardAuthor = (props : {username : string}) => (
    <Link className="text-gray-300 text-xs ml-2 hover:text-gray-200" to={`/user/${props.username}`}>
        <span>by</span>
        <span className="mx-1 underline">{props.username}</span>
    </Link>
)

const LinkCardAction = (props: {faClass: string, onclick: any}) => (
    <button onClick={props.onclick} className="mx-0.5 rounded-md hover:bg-zinc-800 active:bg-zinc-700"><i className={`fa-solid ${props.faClass} py-1 px-2`}/></button>
)