//Import react hooks
import {useState, useEffect} from 'react';
//Import React Router hooks
import { Link } from 'react-router-dom';

//Import components
import { Featured } from '../../components/HomePage/FeaturedLinkCard';

export const HomePage = () => {

    return (
        <>

        <Heading/>
        <Cards/>
        <Featured/>
        
        </>
    )
}

const Heading = () => (
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
    
)


const Cards = () => {

    return (
        <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 place-items-center
        m-5'>
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