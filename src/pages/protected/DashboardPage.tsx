//Import React hooks
import { useContext, useState } from "react"

//Import React Router hooks
import { Link, useNavigate } from "react-router-dom";

//Import custom hooks
import { useGetOwnAlgorithms } from "../../hooks/firestore"

//Import contexts
import { AlgorithmsContext, AuthContext } from "../../contexts"

//Import types
import { algorithmDocType } from "../../types";

//Import utils
import { AlgorithmSorter } from "../../utils/sorter";
import { copyToClipboard } from "../../utils/actions";
import { TimeFormatter } from "../../utils/formatter";

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";
import { NotFoundPage } from "../static/NotFoundPage";
import { LoadingSpinner } from "../../components/LoadingSpinner";

//Import config
import { ROOT_URL } from "../../config";

//Import assets
import blankProfile from "../../assets/images/blank-profile-image.png"


export const DashboardPage = () => {

    const [algorithms, loading, error] = useGetOwnAlgorithms();

    const [selectedView, setSelectedView] = useState<"list" | "box">("box")
    const [selectedSort, setSelectedSort] = useState<"alphabetical" | "reverse-alphabetical" | "post-date" | "reverse-post-date">("post-date");

    const sortAlgorithms = (algorithms: algorithmDocType[], type: string) => {
        switch(type){
            case "alphabetical": 
                return AlgorithmSorter.byAlphabeticalOrder(algorithms);
            case "reverse-alphabetical": 
                return AlgorithmSorter.byReverseAlphabeticalOrder(algorithms);
            case "post-date": 
                return AlgorithmSorter.byPostDate(algorithms);
            case "reverse-post-date": 
                return AlgorithmSorter.byReversePostDate(algorithms);
        }
    }

    if(loading) return <Placeholder/>
    if(error) return <NotFoundPage/>

    return (
        <PageWrapper>

            <div className="grid lg:grid-cols-4 grid-cols-1 gap-5
            md:w-5/6 w-[95%] min-h-fit">

                <div className="bg-zinc-900 shadow-md rounded-md
                row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-2
                row-end-2 p-8
                flex flex-col gap-5">
                    
                    <ProfileContainer/>

                    <InfoContainer views={3255} votes={1245} forks={43}/>

                </div>

                <div className="bg-zinc-900 shadow-md rounded-md h-fit
                lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-5
                row-start-2 row-end-5
                flex flex-col gap-5
                p-8">
                    
                    <div className="bg-zinc-800 shadow-md rounded-md
                    w-full p-2 gap-2
                    flex items-center">

                        <ViewManager
                        setSort={(sort) => setSelectedSort(sort)}
                        setView={(view) => setSelectedView(view)}/>

                    </div>
                    
                
                    <div className="bg-zinc-800 shadow-md rounded-md
                    w-full h-[60vh] overflow-y-auto">

                        <AlgorithmsContext.Provider value={sortAlgorithms(algorithms!, selectedSort)!}>

                            {selectedView == "list" ? <ListView/> : <BoxView/>}

                        </AlgorithmsContext.Provider>

                    </div>
                    
                </div>

            </div>

        </PageWrapper>
    )
}


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

const ViewManager = ({setSort, setView} : {setSort: (sort: "alphabetical" | "reverse-alphabetical" | "post-date" | "reverse-post-date") => void, setView: (view: "list" | "box") => void}) => {

    const navigate = useNavigate();
    
    return (
        <>
            <div className="bg-zinc-900 w-fit rounded-md shadow-md
            flex mr-auto">
                <ViewManagerButton 
                handleClick={() => navigate("/create")} 
                faClass="fa-solid fa-plus"/>
            </div>

            <div className="bg-zinc-900 w-fit rounded-md shadow-md
            flex">
                <ViewManagerButton 
                handleClick={() => setSort("alphabetical")} 
                faClass="fa-solid fa-arrow-down-a-z"/>
                            
                <ViewManagerButton 
                handleClick={() => setSort("reverse-alphabetical")} 
                faClass="fa-solid fa-arrow-up-a-z"/>

                <ViewManagerButton 
                handleClick={() => setSort("post-date")} 
                faClass="fa-solid fa-arrow-down-1-9"/>

                <ViewManagerButton 
                handleClick={() => setSort("reverse-post-date")} 
                faClass="fa-solid fa-arrow-up-1-9"/>
            </div>

            <div className="bg-zinc-900 w-fit rounded-md shadow-md
            flex ml-auto">
                <ViewManagerButton 
                handleClick={() => setView("list")} 
                faClass="fa-solid fa-list"/>

                <ViewManagerButton 
                handleClick={() => setView("box")} 
                faClass="fa-solid fa-border-all"/>
            </div>
        </>
    )
}

const ViewManagerButton = ({faClass, handleClick} : {faClass: string, handleClick: () => void}) => {

    return (
        <button className="py-2 px-4 md:text-base text-sm
        hover:bg-green-600 rounded-md
        active:outline outline-2 outline-green-600 outline-offset-2"
        onClick={handleClick}>
            <i className={faClass}/>
        </button>
    )
}

//List view components
export const ListView = () => {

    const algorithms = useContext(AlgorithmsContext);

    return (
        <div className="p-4 grid gap-2 h-fit auto-rows-fr">
            {algorithms?.map((alg) => (
                <div className="bg-zinc-900 rounded-md shadow-md
                flex items-center p-4 gap-2" key={alg.id}>
                    
                    <div className="flex lg:flex-row flex-col w-1/2">
        
                        <div className="flex flex-col lg:w-1/2">
                            <ViewTitleCard title={alg.title!} id={alg.id!}/>
                            <ViewPostDate created={alg.created!}/>
                        </div>
        
                        <div className="flex items-center gap-2
                        md:text-xs text-2xs lg:mx-3 text-green-600
                        font-semibold">
        
                            <ViewInformation 
                            votes={"1000"} 
                            comments={"100"} 
                            visibility={"public"}/>
        
                        </div>
        
                    </div>
        
                    <div className="ml-auto
                    grid lg:grid-cols-5 grid-cols-3 gap-2">
                       <ViewActionButtonContainer alg={alg}/>
                    </div>
                </div>
            ))}
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
                <div className="bg-zinc-900 rounded-md shadow-md
                flex flex-col p-4" key={alg.id} >
                   
                    <ViewTitleCard title={alg.title!} id={alg.id!}/>
                    <ViewPostDate created={alg.created!}/>
        
                    <div className="flex flex-col mt-2
                    md:text-xs text-2xs font-semibold text-green-600">
       
                        <ViewInformation 
                        votes={`Votes: ${1000}`} 
                        comments={`Comments: ${100}`} 
                        visibility={`Visibility: ${"public"}`}/>
                   
                    </div>
       
                    <div className="ml-auto mt-auto pt-5
                    flex gap-2">
                        <ViewActionButtonContainer alg={alg}/>
                    </div>
       
               </div>
            ))}
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

const ViewInformation = ({votes, comments, visibility} : {votes: string, comments: string, visibility: string}) => {

    return (
        <>
            <span>
                <i className="fa-solid fa-check-to-slot mr-1"></i>
                <span>{votes}</span>
            </span>

            <span>
                <i className="fa-solid fa-square-poll-horizontal mr-1"></i>
                <span>{comments}</span>
            </span>

            <span>
                <i className="fa-solid fa-eye mr-1"></i>
                <span>{visibility}</span>
            </span>
        </>
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

const ViewActionButtonContainer = ({alg} : {alg: algorithmDocType}) => {

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

export const Placeholder = () => (
    <div className='w-full md:md:my-16 my-8 text-white
        flex justify-center items-center'>

        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5
        md:w-5/6 w-[95%] min-h-fit">

            <div className="bg-zinc-900 shadow-md rounded-md
            row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-2
            row-end-2 p-8 min-h-80
            flex flex-col gap-5">
                <div className="bg-zinc-800 shadow-md rounded-md w-full h-1/3
                grid place-items-center">
                    <LoadingSpinner/>
                </div>
                <div className="bg-zinc-800 shadow-md rounded-md w-full h-2/3
                grid place-items-center">
                    <LoadingSpinner/>
                </div>
            </div>

            <div className="bg-zinc-900 shadow-md rounded-md h-fit
            lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-5
            row-start-2 row-end-5
            flex flex-col gap-5
            p-8">
                    
                <div className="bg-zinc-800 shadow-md rounded-md
                w-full p-2 h-12 gap-2
                grid place-items-center">
                    <LoadingSpinner/>
                </div>

                
                <div className="bg-zinc-800 shadow-md rounded-md
                w-full h-[60vh] overflow-y-auto
                grid place-items-center">
                    <LoadingSpinner/>
                </div>
                    
            </div>

        </div>

    </div>
)