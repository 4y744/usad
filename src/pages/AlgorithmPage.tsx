
//Import components
import { Input } from '../components/Input.tsx';
import { Loading } from '../components/Loading.tsx';
import { NotFoundPage } from './NotFoundPage.tsx';

//Import react hooks
import { useParams } from 'react-router-dom';

import { useGetlAlgorithm } from '../hooks/firestore.ts';

export const AlgorithmPage = () => {
    
    // const [alg, setAlg] = useState<alg_interface>();
    // const [isLoading, setLoading] = useState(true);
    // const [canAccess, setCanAccess] = useState(true);
    // const {id} = useParams();

    // //Gets called on page load or when params are changed
    // useEffect(() => {
    //     getDocument();
    // }, [id])

    // async function getDocument()
    // {
    //     //Tries to get the document from Firestore
    //     const docRef = doc(db, `algorithms/${id}`);
    //     const document = await getDoc(docRef);
    //     setAlg(document.data() as alg_interface);

    //     //Checks if document in empty (was not received)
    //     if(document.data() == undefined) setCanAccess(false);

    //     setLoading(false);
    // }

    // //Displays while the page is loading
    // if (isLoading) 
    // {
    //     return <Loading/>
    // }
    
    // //If the Firestore document isn't found returns 404
    // if(!canAccess)
    // {
    //     return <NotFoundPage/>
    // }

    const {id} = useParams();
    
    const algorithm = useGetlAlgorithm(id!)
    if(algorithm.loading) return <>Loading</>

    return (
        <div>
            <div>
                <h1>{algorithm?.name || "No name"}</h1>
                <Input inputs={algorithm.inputs!} type={algorithm.input_type!} function={algorithm.function!}></Input>
            </div>
            <div>
                <h1>Описание</h1>
                <p>{algorithm.description || "No description"}</p>
            </div>
        </div>
    )
}
