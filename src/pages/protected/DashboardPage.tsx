import { useContext, useEffect, useState } from "react"
import { useGetAlgorithms } from "../../hooks/firestore"
import { AlgorithmsContext, AuthContext } from "../../contexts"
import { Link } from "react-router-dom";
import { BoxView, ListView } from "../../components/Dashboard/DashboardView";
import { algorithmType } from "../../types";
import { AlgorithmSorter } from "../../utils/sorter";

export const DashboardPage = () => {

    const {username} = useContext(AuthContext);
    const {algorithms, loading} = useGetAlgorithms({username: username});

    const [selectedView, setSelectedView] = useState<"list" | "box">("box")
    const [selectedSort, setSelectedSort] = useState<"alphabetical" | "reverse-alphabetical" | "post-date" | "reverse-post-date">("post-date");


    const sortAlgorithms = (algorithms: algorithmType[], type: string) => {
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

    if(loading) return <>Loading</>;

    
    return (
        <div className='w-full md:md:my-16 my-8 my-8 text-white
        flex justify-center items-center'>

            <div className="grid md:grid-cols-4 grid-cols-1 gap-5
            md:w-5/6 w-[95%] min-h-fit">

                <div className="bg-zinc-900 shadow-md rounded-md
                row-start-1 md:row-end-4 md:col-start-1 md:col-end-2
                row-end-2 p-8">

                </div>

                <div className="bg-zinc-900 shadow-md rounded-md h-fit
                md:row-start-1 md:row-end-4 md:col-start-2 md:col-end-5
                row-start-2 row-end-5
                flex flex-col gap-5
                p-8">
                    
                    <div className="bg-zinc-800 shadow-md rounded-md
                    w-full p-2
                    flex gap-2">
                        
                        

                        <div className="bg-zinc-900 w-fit rounded-md shadow-md
                        flex">
                            <ViewManagerButton 
                            handleClick={() => setSelectedSort("alphabetical")} 
                            faClass="fa-solid fa-arrow-down-a-z"/>
                            
                            <ViewManagerButton 
                            handleClick={() => setSelectedSort("reverse-alphabetical")} 
                            faClass="fa-solid fa-arrow-up-a-z"/>

                            <ViewManagerButton 
                            handleClick={() => setSelectedSort("post-date")} 
                            faClass="fa-solid fa-arrow-down-1-9"/>

                            <ViewManagerButton 
                            handleClick={() => setSelectedSort("reverse-post-date")} 
                            faClass="fa-solid fa-arrow-up-1-9"/>
                        </div>

                        <div className="bg-zinc-900 w-fit rounded-md shadow-md
                        flex ml-auto">
                            <ViewManagerButton handleClick={() => setSelectedView("list")} faClass="fa-solid fa-list"/>
                            <ViewManagerButton handleClick={() => setSelectedView("box")} faClass="fa-solid fa-border-all"/>
   
                        </div>

                    </div>
                    
                
                    <div className="bg-zinc-800 shadow-md rounded-md
                    w-full h-[60vh] overflow-y-auto">
                        <AlgorithmsContext.Provider value={sortAlgorithms(algorithms!, selectedSort)!}>
                            {selectedView == "list" ? <ListView/> : <BoxView/>}
                        </AlgorithmsContext.Provider>
                    </div>
                    

                </div>

            </div>

        </div>
    )
}

const ViewManagerButton = ({faClass, handleClick} : {faClass: string, handleClick: () => void}) => {

    return (
        <button
            className="py-2 px-4 md:text-base text-sm
            hover:bg-green-600 rounded-md
            active:outline outline-2 outline-green-600 outline-offset-2"
            onClick={handleClick}>

            <i className={faClass}/>
        </button>
    )
}
