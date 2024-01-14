//Import react hooks
import {useState, useEffect} from 'react';

//Import React Router hooks
import { Link } from 'react-router-dom';

//Import Firebase hooks
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../hooks/firebase";

//Import components
import { LinkCard } from '../components/LinkCard';

export const HomePage = () => {
    return <>
        <Heading/>
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
                <Link to="#" className="mx-2 px-4 py-3 my-3 rounded-md bg-green-700 hover:bg-green-600 transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600 shadow-md">Get started</Link>
                <Link to="/about" className="mx-2 px-4 py-3 my-3 rounded-md bg-green-700 hover:bg-green-600 transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600 shadow-md">Learn more</Link>
            </div>
        </div>
    </header>
    
)

const Featured = () => {
    
    const [isLoading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        getDocument();
    }, [])

    async function getDocument()
    {
        //Tries to get the documents from Firestore
        const docsRef = query(collection(db, "algorithms"));
        const docs = await getDocs(docsRef);
        let tempDocs : any = [];
        docs.forEach((doc) => {
            tempDocs.push({
                id: doc.id,
                ...doc.data()
              });
        })
        setDocuments(tempDocs);

        setLoading(false);     
    }
    
    return <div className='px-4'>
        <h1 className='font-bold text-white xl:text-2xl lg:text-xl text-lg py-3 text-start'>Featured</h1>
        <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-5'>
            {documents.map((doc: any) => (
                    <LinkCard key={doc.id} algorithmId={doc.id} title={doc.title} author={doc.author} language="BG" date="28/12/23" votes={5}/>
            ))}
        </div>
    </div>
}
