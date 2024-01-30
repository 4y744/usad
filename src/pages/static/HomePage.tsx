//Import react hooks
import {useState, useEffect} from 'react';
//Import React Router hooks
import { Link } from 'react-router-dom';

//Import Firebase hooks
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../hooks/firebase";

//Import components
import { LinkCard } from '../../components/LinkCard';
import { useGetAlgorithms } from '../../hooks/firestore';

export const HomePage = () => {

    return <>

        <Heading/>
        <Cards/>
        <Featured/>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt quisquam, ut nam quaerat quae soluta est vitae distinctio. Neque minus facere incidunt enim doloremque praesentium illum fugit odio. Soluta!</h1>
    </>
}

const Heading = () => (
    <header className='
        flex flex-col justify-center items-center text-white w-full 
        h-80 bg-home-headline bg-no-repeat bg-cover'>
        <div className='flex flex-col justify-center items-center w-full lg:px-16 px-4'>
            <h1 className='font-bold text-white xl:text-4xl lg:text-3xl text-2xl my-3 text-center'>Universal Scalable Algorithm Directory</h1>
            <p className="my-3 xl:text-lg lg:text-base text-sm max-w-xl sm:w-5/6 text-center">
                The ultimate tool for creating and sharing algorithms.
                Easily create and share your own specialized calculators. 
            </p>
            <div className='flex'>
                <Link to="/dashboard" className="mx-2 px-4 py-3 my-3 rounded-md bg-green-700 hover:bg-green-600 transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600 shadow-md">Get started</Link>
                <Link to="/about" className="mx-2 px-4 py-3 my-3 rounded-md bg-green-700 hover:bg-green-600 transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600 shadow-md">Learn more</Link>
            </div>
        </div>
    </header>
    
)

const Featured = () => {
    
    // const [isLoading, setLoading] = useState(true);
    // const [documents, setDocuments] = useState([]);

    // useEffect(() => {
    //     getDocument();
    // }, [])

    // async function getDocument()
    // {
    //     //Tries to get the documents from Firestore
    //     const docsRef = query(collection(db, "algorithms"));
    //     const docs = await getDocs(docsRef);
    //     let tempDocs : any = [];
    //     docs.forEach((doc) => {
    //         tempDocs.push({
    //             id: doc.id,
    //             ...doc.data()
    //           });
    //     })
    //     setDocuments(tempDocs);

    //     setLoading(false);     
    // }

    const {algorithms, loading} = useGetAlgorithms({username: "USAD"});


    return <div className='px-4'>
        <h1 className='font-bold text-white xl:text-2xl lg:text-xl text-lg py-3 text-start'>Featured</h1>
        {loading ? <h1>LOADING</h1> :
        <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-5'>
            {algorithms?.map((doc: any) => (
                    <LinkCard key={doc.id} algorithmId={doc.id} title={doc.title} author={doc.author} language="BG" date="28/12/23" votes={5}/>
            ))}
        </div>
        }
    </div>
}


const Cards = () => {

    return (
        <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 place-items-center
        mx-5'>
            <Card 
            title='Easily find ready-to-use algorithms'
            description='Having a problem trying to solve someting? Want to make it easier?
            Here you can find open source algorithms created by other users.
            USAD provides a safe and sanitazed enviroment to run code.'
            linktext='Start browsing...'
            url='/browse'/>
            
            <Card 
            title='Create your own algorithms'
            description='Have you ever felt the need to automate a task?
            Most of the time it might be beneficial to automate something
            instead of doing it manually. On USAD you can not only achieve that,
            but also easily customise and share your creations!'
            linktext='Start creating...'
            url='/create'/>

            <Card 
            title='Built-in code editor'
            description="Start writing code in the built-in JavaScript editor.
            USAD provides you with an easy-to-use code editor and runs the code
            for you. You don't need a fancy runtime like Node.js! Just write a
            function and the return value will be your output!"
            linktext='Start coding...'
            url='/dashboard/create/code-editor'/>

            <Card 
            title='Easy-to-use block editor'
            description="One of USAD's most powerful features is it's built-in
            accessible block editor. Code by dragging blocks and let the compiler
            take care of construction the source code. Start programming without
            writing a single line of code!"
            linktext='Try it out...'
            url='/dashboard/create/block-editor'/>
        </div>
    )
}
//Easily find and use algorithms.
const Card = ({title, description, linktext, url} : {title: string, description: string, linktext: string, url: string}) => {
    
    return (
        <div className='bg-zinc-900 border-t-4 border-t-green-600 text-white
        p-8 w-full h-full rounded-b-md drop-shadow-md 
        flex flex-col items-center gap-5'>
            <h1 className='md:text-lg text-base font-semibold'>{title}</h1>
            <p className='md:text-sm text-xs text-pretty text-zinc-200'>{description}</p>
            <Link to={url}
            className='bg-green-700 hover:bg-green-600 
            active:outline outline-2 outline-green-600 outline-offset-2
            md:text-sm text-sm
            px-4 py-2 w-fit rounded-md drop-shadow-md mt-auto'>{linktext}</Link>
        </div>
    )
}