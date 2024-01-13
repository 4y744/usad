
//Import components
import { Input } from '../components/Input.tsx';
import { Loading } from '../components/Loading.tsx';
import { NotFoundPage } from './NotFoundPage.tsx';

//Import react hooks
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

//Import Firebase hooks
import { getDoc, doc } from "firebase/firestore";
import { db } from "../hooks/firebase.ts";


interface alg_interface{
    name: string;
    description: string;
    input_type: string;
    inputs: Array<string>;
    function: string;
}

export const AlgorithmPage = () => {
    
    const [alg, setAlg] = useState<alg_interface>();
    const [isLoading, setLoading] = useState(true);
    const [canAccess, setCanAccess] = useState(true);
    const {id} = useParams();

    //Gets called on page load or when params are changed
    useEffect(() => {
        getDocument();
    }, [id])

    async function getDocument()
    {
        //Tries to get the document from Firestore
        const docRef = doc(db, `algorithms/${id}`);
        const document = await getDoc(docRef);
        setAlg(document.data() as alg_interface);

        //Checks if document in empty (was not received)
        if(document.data() == undefined) setCanAccess(false);

        setLoading(false);
    }

    //Displays while the page is loading
    if (isLoading) 
    {
        return <Loading/>
    }
    
    //If the Firestore document isn't found returns 404
    if(!canAccess)
    {
        return <NotFoundPage/>
    }
    return (
        <div>
            <div>
                <h1>{alg?.name || "No name"}</h1>
                <Input inputs={alg?.inputs || [""]} type={alg?.input_type || "field"} function={alg?.function || ""}></Input>
            </div>
            <div>
                <h1>Описание</h1>
                <p>{alg?.description || "No description"}</p>
            </div>
        </div>
    )
}
