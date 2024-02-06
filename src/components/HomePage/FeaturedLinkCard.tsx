import { Link } from "react-router-dom";
import { useGetAlgorithms } from "../../hooks/firestore";
import { algorithmDocType } from "../../types"
import { LoadingSpinner } from "../LoadingSpinner";

export const Featured = () => {

    const {algorithms, loading} = useGetAlgorithms({username: "USAD"});

    if(loading) return <Placeholder/>

    return (
        <div className='px-4 my-4'>
            <h1 className='font-bold text-white xl:text-2xl lg:text-xl text-lg py-3 text-start'>Featured</h1>
                <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 
                place-items-center gap-5 auto-rows-fr'>
                    {algorithms?.map((doc: any) => (
                        <FeaturedLinkCard algorithm={doc} key={doc.id}/>   
                    ))}
                </div>
        </div>
    )
}


export const FeaturedLinkCard = ({algorithm} : {algorithm: algorithmDocType}) => {

    return (
        <Link to={`/algorithm/${algorithm.id}`} className="bg-zinc-900 rounded-md shadow-md
        text-white w-full h-full py-4 px-8 group
        flex flex-col justify-center gap-1">
            <div className="flex">
                <h1 className="font-medium max-w-3/4 truncat
                group-hover:underline">
                    {algorithm.title}
                </h1>
                <span className="bg-zinc-800 rounded-md shadow-md
                text-xs
                px-2 py-1 ml-2">BG</span>
            </div>
            <div>
                <p className="text-xs text-zinc-300">{algorithm.description}</p>
            </div>
        </Link>
    )
}

const Placeholder = () => {


    return (
        <div className='px-4 my-4'>
            <h1 className='font-bold text-white xl:text-2xl lg:text-xl text-lg py-3 text-start'>Featured</h1>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 
            place-items-center gap-5 auto-rows-fr'>
                {[1, 2, 3, 4].map((key) => (
                    <div className="bg-zinc-900 rounded-md shadow-md
                    w-full h-full p-8
                    flex justify-center items-center"
                    key={key}>
                        <LoadingSpinner/>
                    </div>
                ))}
            </div>
        </div>
    )
}