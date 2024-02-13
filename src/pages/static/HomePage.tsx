//Import React Router hooks
import { Link } from 'react-router-dom';

//Import Firestore hooks
import { useGetAlgorithms } from '../../hooks/firestore';

//Import types
import { algorithmDocType } from '../../types';

//Import components
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner';

//Import i18n hooks
import { useTranslation } from 'react-i18next';

//Import utils
import { AlgorithmFilter } from '../../utils/sorter';


export const HomePage = () => {

    const {t} = useTranslation();

    return (
        <>
            <header className='
            flex flex-col justify-center items-center text-white w-full 
            h-80 bg-home-headline bg-no-repeat bg-cover'>
                <div className='flex flex-col justify-center items-center w-full lg:px-16 px-4'>
                    <h1 className='font-bold text-white xl:text-4xl lg:text-3xl text-3xl my-3 text-center'>Universal Scalable Algorithm Directory</h1>
                    <p className="my-3 xl:text-lg max-w-xl text-center">
                        {t("slogan")}
                    </p>
                    <div className='flex'>
                        <Link to="/dashboard" 
                        className="m-3 px-4 py-3 rounded-md bg-green-700 hover:bg-green-600 transition-background duration-100 
                        active:outline outline-offset-2 outline-2 outline-green-600 shadow-md">
                            {t("getstarted")}
                        </Link>

                        <Link to="/about" 
                        className="m-3 px-4 py-3 rounded-md bg-green-700 hover:bg-green-600 transition-background duration-100 
                        active:outline outline-offset-2 outline-2 outline-green-600 shadow-md">
                            {t("learnmore")}
                        </Link>
                    </div>
                </div>
            </header>

            <div className='p-4
            grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 place-items-center'>
                <Card 
                title={t("featured-1-title")}
                description={t("featured-1-text")}
                faClass='fa-solid fa-magnifying-glass'/>
                    
                <Card 
                title={t("featured-2-title")}
                description={t("featured-2-text")}
                faClass='fa-solid fa-code'/>

                <Card 
                title={t("featured-3-title")}
                description={t("featured-3-text")}
                faClass='fa-brands fa-square-js'/>

                <Card 
                title={t("featured-4-title")}
                description={t("featured-4-text")}
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
        gap-5 border border-zinc-700'>
            <i className={`${faClass} md:text-lg text-base`}/>
            <h1 className='md:text-base text-sm font-medium my-1'>{title}</h1>
            <p className='md:text-sm text-xs text-pretty text-zinc-300'>{description}</p>
        </div>
    )
}

export const Featured = () => {

    const [algorithms, loading] = useGetAlgorithms({username: "USAD"});
    const {t, i18n} = useTranslation();

    return (
        <>
            <h1 className='font-bold text-white xl:text-2xl lg:text-xl text-lg pb-3 text-start'>
                {t("featured")}
            </h1>
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
                    AlgorithmFilter.byLanguage(algorithms, i18n.language.toUpperCase()).map((algorithm: algorithmDocType) => (
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
                                px-2 py-1 ml-2">{algorithm.language}</span>
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
