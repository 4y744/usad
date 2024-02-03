import { useContext } from "react";
import { algorithmType } from "../../types";
import { AlgorithmsContext } from "../../contexts";
import { Link } from "react-router-dom";
import { TimeFormatter } from "../../utils/formatter";
import { copyToClipboard } from "../../utils/actions";
import { ROOT_URL } from "../../config";

//List view components

export const ListView = () => {

    const algorithms = useContext(AlgorithmsContext);

    return (
        <div className="p-4 grid gap-2 h-fit auto-rows-fr">
            {algorithms?.map((alg) => (
                <ListViewItem key={alg.id} alg={alg}/>
            ))}
        </div>
    )
}

const ListViewItem = ({alg} : {alg: algorithmType}) => {

    return (
        <div className="bg-zinc-900 rounded-md shadow-md
        flex items-center p-4 gap-2">
            

            <div className="flex lg:flex-row flex-col w-1/2">
                <div className="flex flex-col lg:w-1/2">
                    <ViewTitleCard title={alg.title!} id={alg.id!}/>

                    <ViewPostDate created={alg.created!}/>
                </div>

                <ListViewInfoContainer votes={1000} comments={234} visibility="public"/>
            </div>

            
            
            <div className="ml-auto
            grid lg:grid-cols-5 grid-cols-3 gap-2">
               <ViewActionButtonContainer alg={alg}/>
            </div>
        </div>
    )
}

const ListViewInfoContainer = ({votes, comments, visibility} : {votes: number, comments: number, visibility: "public" | "private"}) => {

    return (
        <div className="flex items-center gap-2
        md:text-xs text-2xs lg:mx-3 text-green-600
        font-semibold">

            <span className="flex items-center">
                <i className="fa-solid fa-check-to-slot mr-1"></i>
                <span>{votes}</span>
            </span>

            <span className="flex items-center">
                <i className="fa-solid fa-square-poll-horizontal mr-1"></i>
                <span>{comments}</span>
            </span>

            <span className="flex items-center">
                <i className="fa-solid fa-eye mr-1"></i>
                <span>{visibility}</span>
            </span> 
        </div>
    )
}


//Box view components

export const BoxView = () => {

    const algorithms = useContext(AlgorithmsContext);

    return (
        <div className="p-4 gap-2 h-fit auto-rows-fr
        grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
            {algorithms?.map((alg) => (
               <BoxViewItem key={alg.id} alg={alg}/>
            ))}
        </div>
    )
}

const BoxViewItem = ({alg} : {alg: algorithmType}) => {

    return (
        <div key={alg.id} className="bg-zinc-900 rounded-md shadow-md
        flex flex-col
        p-4">
            
            <ViewTitleCard title={alg.title!} id={alg.id!}/>

            <ViewPostDate created={alg.created!}/>

            <BoxViewInfoContainer votes={1000} comments={234} visibility={alg.visibility!}/>

            <div className="ml-auto mt-auto pt-5
            flex gap-2">
                <ViewActionButtonContainer alg={alg}/>
            </div>

        </div>
    )
}

const BoxViewInfoContainer = ({votes, comments, visibility} : {votes: number, comments: number, visibility: "public" | "private"}) => {

    return (
        <div className="flex flex-col mt-2
        md:text-xs text-2xs font-semibold text-green-600">
            <span>
                <i className="fa-solid fa-check-to-slot mr-1"></i>
                <span>Votes: {votes}</span>
            </span>

            <span>
                <i className="fa-solid fa-square-poll-horizontal mr-1"></i>
                <span>Comments: {comments}</span>
            </span>

            <span>
                <i className="fa-solid fa-eye mr-1"></i>
                <span>Visibility: {visibility}</span>
            </span>
        </div>
    )
}


//Generic components

const ViewTitleCard = ({title, id} : {title: string, id: string}) => {

    return (
        <Link 
        className="flex items-start"
        to={`/algorithm/${id}`}>
            <h1 className="md:text-sm text-xs font-semibold
            hover:underline
            line-clamp-2 xl:w-72 w-40">
                {title}
            </h1>   
        </Link>
    )
}

const ViewPostDate = ({created} : {created: number}) => {

    return (
        <span className="md:text-xs text-2xs text-zinc-300">
            posted on {TimeFormatter.DayMonthYear(created)}
        </span>

    )
}



const ViewActionButton = ({faClass, handleClick} : {faClass: string, handleClick: () => void}) => {

    return (
        <button className="bg-zinc-800 rounded-md shadow-md
        hover:bg-zinc-700 
        md:text-sm sm:text-xs text-2xs
        sm:w-8 w-6 aspect-square
        active:outline outline-2 outline-green-600 outline-offset-2
        flex justify-center items-center"
        onClick={handleClick}>
            <i className={faClass}/>
        </button>
    )
}

const ViewActionButtonContainer = ({alg} : {alg: algorithmType}) => {

    return (
        <>
            <ViewActionButton 
            faClass="fa-solid fa-code-fork" 
            handleClick={() => {}}/>

            <ViewActionButton 
            faClass="fa-solid fa-link" 
            handleClick={() => copyToClipboard(`${ROOT_URL}/algorithm/${alg.id}`)}/>

            <ViewActionButton 
            faClass="fa-solid fa-lock" 
            handleClick={() => {}}/>
                
            <ViewActionButton 
            faClass="fa-solid fa-pen" 
            handleClick={() => {}}/>

            <ViewActionButton 
            faClass="fa-solid fa-trash" 
            handleClick={() => {}}/>
        </>
    )
}