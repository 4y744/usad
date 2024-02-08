//Import react hooks
import {useState, useEffect} from 'react';

//Import React Router hooks
import { Link } from 'react-router-dom';
import { useGetAlgorithms } from '../../hooks/firestore';
import { algorithmDocType } from '../../types';
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner';


export const HomePage = () => {

    return (
        <>
            <header className='
            flex flex-col justify-center items-center text-white w-full 
            h-80 bg-home-headline bg-no-repeat bg-cover'>
                <div className='flex flex-col justify-center items-center w-full lg:px-16 px-4'>
                    <h1 className='font-bold text-white xl:text-4xl lg:text-3xl text-3xl my-3 text-center'>Universal Scalable Algorithm Directory</h1>
                    <p className="my-3 xl:text-lg max-w-xl text-center">
                        The ultimate tool for creating and sharing algorithms.
                        Easily create and share your own specialized calculators. 
                    </p>
                    <div className='flex'>
                        <Link to="/dashboard" className="m-3 px-4 py-3 rounded-md bg-green-700 hover:bg-green-600 transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600 shadow-md">Get started</Link>
                        <Link to="/about" className="m-3 px-4 py-3 rounded-md bg-green-700 hover:bg-green-600 transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600 shadow-md">Learn more</Link>
                    </div>
                </div>
            </header>

            <div className='p-4
            grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 place-items-center'>
                <Card 
                title='Find ready-to-use algorithms'
                description='Find algorithms created by other users and run them in our sandbox.'
                faClass='fa-solid fa-magnifying-glass'/>
                    
                <Card 
                title='Create your own algorithms'
                description='Create, modify and share your own algorithms all in one place.'
                faClass='fa-solid fa-code'/>

                <Card 
                title='Built-in code editor'
                description="Built-in and accessible JavaScript code editor."
                faClass='fa-brands fa-square-js'/>

                <Card 
                title='Easy-to-use block editor'
                description="Flexible block editor that compiles to JavaScript."
                faClass='fa-solid fa-arrow-pointer'/>
            </div>
            
            <div className="bg-zinc-900 rounded-md shadow-md
            m-4 p-4">
                <Featured/>
            </div>
        </>
    )
}


const Card = ({title, description, faClass} : {title: string, description: string, faClass: string}) => {
    
    return (
        <div className='bg-zinc-900 text-white
        p-8 h-full w-full rounded-md shadow-md
        gap-5'>
            <i className={`${faClass} md:text-lg text-base`}/>
            <h1 className='md:text-base text-sm font-medium my-1'>{title}</h1>
            <p className='md:text-sm text-xs text-pretty text-zinc-300'>{description}</p>
        </div>
    )
}

export const Featured = () => {

    const [algorithms, loading] = useGetAlgorithms({username: "USAD"});

    return (
        <>
            <h1 className='font-bold text-white xl:text-2xl lg:text-xl text-lg pb-3 text-start'>Featured</h1>
                <div className='bg-zinc-800 rounded-md shadow-md p-4
                grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 
                place-items-center gap-5 auto-rows-fr'>
                    
                    {loading ?
                    [1, 2, 3, 4].map((key) => (
                        <div className="bg-green-700 rounded-md shadow-md
                        w-full h-full p-8
                        flex justify-center items-center"
                        key={key}>
                            <LoadingSpinner/>
                        </div>
                    )) : 
                    algorithms?.map((algorithm: algorithmDocType) => (

                        <Link to={`/algorithm/${algorithm.id}`} className="bg-green-700 rounded-md shadow-md
                        text-white w-full h-full py-4 px-8 group
                        flex flex-col justify-center gap-1" key={algorithm.id}>
                            <div className="flex">
                                <h1 className="font-medium max-w-3/4 truncat
                                group-hover:underline">
                                    {algorithm.title}
                                </h1>
                                <span className="bg-green-800 rounded-md shadow-md
                                text-xs h-fit
                                px-2 py-1 ml-2">BG</span>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-300">{algorithm.description}</p>
                            </div>
                        </Link> 

                    ))}

                </div>
        </>
    )
}
