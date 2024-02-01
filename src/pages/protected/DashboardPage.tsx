import { useContext, useState } from "react"
import { useGetAlgorithms } from "../../hooks/firestore"
import { AlgorithmsContext, AuthContext } from "../../contexts"
import { Link } from "react-router-dom";
import { algorithmType } from "../../types";
import { TimeFormatter } from "../../utils/formatter";

export const DashboardPage = () => {

    const {username} = useContext(AuthContext);
    const {algorithms, loading} = useGetAlgorithms({username: username});

    const [selectedView, setSelectedView] = useState<"list" | "box">("box")

    if(loading) return <>Loading</>;

    return (
        <div className='w-full my-16 text-white
        flex justify-center items-center'>

            <div className="grid md:grid-cols-4 grid-cols-1 gap-5
            w-5/6 min-h-[80vh]">

                <div className="bg-zinc-900 shadow-md rounded-md
                row-start-1 md:row-end-4 md:col-start-1 md:col-end-2
                row-end-2
                p-8">

                </div>

                <div className="bg-zinc-900 shadow-md rounded-md
                md:row-start-1 md:row-end-4 md:col-start-2 md:col-end-5
                row-start-2 row-end-5
                flex flex-col gap-5
                p-8">
                    
                    <div className="bg-zinc-800 shadow-md rounded-md
                    w-full p-2">
                        
                        <div className="bg-zinc-900 w-fit rounded-md shadow-md
                        flex">
                            <button
                            className="py-2 px-4 text-lg
                            hover:bg-green-600 rounded-l-md
                            active:outline outline-2 outline-green-600 outline-offset-2"
                            onClick={() => setSelectedView("list")}>
                                <i className="fa-solid fa-list"></i>
                            </button>
                            <button
                            className="py-2 px-4 text-lg
                            hover:bg-green-600 rounded-r-md
                            active:outline outline-2 outline-green-600 outline-offset-2"
                            onClick={() => setSelectedView("box")}>
                                <i className="fa-solid fa-border-all"></i>
                            </button>
                        </div>

                    </div>
                    
                
                        <AlgorithmsContext.Provider value={algorithms!}>
                            <div className="bg-zinc-800 shadow-md rounded-md
                            w-full h-full ">
                                {selectedView == "list" ? <ListView/> : <BoxView/>}
                            </div>
                        </AlgorithmsContext.Provider>
                    

                </div>

            </div>

        </div>
    )
}

const ListView = () => {

    const algorithms = useContext(AlgorithmsContext);

    return (
        <div className="p-4 flex flex-col gap-2">
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
            <div className="flex flex-col">
                <Link to={`/algorithm/${alg.id}`}>
                    <h1 className="text-sm font-semibold
                    hover:underline">{alg.title}</h1>
                    
                </Link>
                <span className="text-xs text-zinc-300">
                    posted on {TimeFormatter.DayMonthYear(alg.created!)}
                </span>
            </div>

            <div>
                <span className="bg-zinc-800 py-1 px-2 mx-2
                rounded-md shadow-md text-xs">BG</span> 
            </div>

            <div className="flex flex-col">
                <span className="text-xs text-green-600
                font-semibold">
                    <i className="fa-solid fa-check-to-slot mr-1"></i>
                    <span>votes: 54</span>
                </span>

                <span className="text-xs text-green-600
                font-semibold">
                    <i className="fa-solid fa-square-poll-horizontal mr-1"></i>
                    <span>comments: 54</span>
                </span>
            </div>
            
            <div className="ml-auto
            flex gap-2">
                <ViewActionButton faClass="fa-solid fa-lock" handleClick={() => {}}/>
                <ViewActionButton faClass="fa-solid fa-pen" handleClick={() => {}}/>
                <ViewActionButton faClass="fa-solid fa-trash" handleClick={() => {}}/>
            </div>
        </div>
    )
}

const BoxView = () => {

    const algorithms = useContext(AlgorithmsContext);

    return (
        <div className="w-full p-4 gap-2
        grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
            {algorithms?.map((alg) => (
               <BoxViewItem alg={alg}/>
            ))}
        </div>
    )
}

const BoxViewItem = ({alg} : {alg: algorithmType}) => {

    return (
        <div key={alg.id} className="bg-zinc-900 rounded-md shadow-md
        flex flex-col
        p-4">
            <div className="flex items-center">
                <Link to={`/algorithm/${alg.id}`}>
                    <h1 className="text-sm font-semibold
                    hover:underline">{alg.title}</h1>
                </Link>
                <span className="bg-zinc-800 py-1 px-2 mx-2
                rounded-md shadow-md text-xs h-fit">BG</span>
            </div>

            <div>
                <span className="text-xs text-zinc-300">
                    posted on {TimeFormatter.DayMonthYear(alg.created!)}
                </span>
            </div>
            

            <div className="flex flex-col">
                <span className="text-xs text-green-600
                font-semibold">
                    <i className="fa-solid fa-check-to-slot mr-1"></i>
                    <span>votes: 54</span>
                </span>

                <span className="text-xs text-green-600
                font-semibold">
                    <i className="fa-solid fa-square-poll-horizontal mr-1"></i>
                    <span>comments: 54</span>
                </span>
            </div>

            <div className="ml-auto mt-auto pt-5
            flex gap-2">
                <ViewActionButton faClass="fa-solid fa-lock" handleClick={() => {}}/>
                <ViewActionButton faClass="fa-solid fa-pen" handleClick={() => {}}/>
                <ViewActionButton faClass="fa-solid fa-trash" handleClick={() => {}}/>
            </div>

        </div>
    )
}

const ViewActionButton = ({faClass, handleClick} : {faClass: string, handleClick: () => void}) => {

    return (
        <button className="bg-zinc-800 rounded-md shadow-md
        px-2 py-2 hover:bg-zinc-700 text-sm
        active:outline outline-2 outline-green-600 outline-offset-2
        flex justify-center items-center"
        onClick={handleClick}>
            <i className={faClass}/>
        </button>
    )
}