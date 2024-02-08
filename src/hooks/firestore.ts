//Import React hooks
import { useEffect, useState, useRef, useContext } from "react";

//Import Firebase hooks
import { doc, collection, getDoc, getDocs, writeBatch, where, query, DocumentData, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.ts";
import { algorithmDocType, algorithmDraftType, userType } from "../types/index.ts";
import { AuthContext } from "../contexts/index.ts";

export const useGetUser = (param: {username?: string, uid?: string}) : [userType, boolean, string] => {
    const [user, setUser] = useState<userType>({} as userType);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetch = async () => {

            try{

                if(param.username != null){
                    const userDocRef = doc(db, "users", param.username);
                    const userDoc = await getDoc(userDocRef);
                    if(!userDoc.exists()) throw new Error("User does not exist");
                    const data = userDoc.data();
                    setUser({
                        username: param.username,
                        ...data
                    } as userType);

                }
                else if(param.uid != null){
                    const q = query(collection(db, "users"), where("username", "==", param.username));
                    const userDoc = await getDocs(q);
                    if(!userDoc.docs[0].exists()) throw new Error("User does not exist");
                    const data = userDoc.docs[0].data();
                    setUser({
                        uid: param.uid,
                        ...data
                    } as userType);

                }else{
                    throw new Error();
                }

            }
            catch(err){
                setError(err as string);
            }

            setLoading(false);
            
        }

        fetch()
        
    }, [])

    return [user, loading, error];
}

export const useGetAlgorithms = (params: {username?: string, uid?: string}) : [algorithmDocType[], boolean, string] => {
    const [algorithms, setAlgorithms] = useState<algorithmDocType[]>([] as algorithmDocType[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");


    const [user, userLoading] = useGetUser({username: params.username, uid: params.uid})


    useEffect(() => {
        const fetch = async () => {

            if(userLoading) return;

            try{
                const q = query(collection(db, "algorithms"), where("author", "==", user.username), where("visibility", "==", "public"));
                const algDocs = await getDocs(q);

                let tempDocs : algorithmDocType[] = [];
                algDocs.forEach((doc) => {
                    tempDocs.push({
                        id: doc.id,
                        ...doc.data()
                    } as algorithmDocType);
                })
                setAlgorithms(tempDocs);
            }
            catch(err){
                setError(err as string);
            }

            setLoading(false);

        }

        fetch()

    }, [user])

    return [algorithms, loading, error];
}

export const useGetOwnAlgorithms = () : [algorithmDocType[], boolean, string] => {
    const [algorithms, setAlgorithms] = useState<algorithmDocType[]>([] as algorithmDocType[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");


    const user = useContext(AuthContext);


    useEffect(() => {
        const fetch = async () => {

            try{
                const q = query(collection(db, "algorithms"), where("author", "==", user.username));
                const algDocs = await getDocs(q);
                
                let tempDocs : algorithmDocType[] = [];

                algDocs.forEach((doc) => {
                    tempDocs.push({
                        id: doc.id,
                        ...doc.data()
                    } as algorithmDocType);
                })


                setAlgorithms(tempDocs);
            }
            catch(err){
                setError(err as string);
            }

            setLoading(false);
        }

        fetch()

    }, [user])

    return [algorithms, loading, error];
}


export const useGetAlgorithm = (id: string) : [algorithmDocType, boolean, string] => {
    const [algorithm, setAlgorithm] = useState<algorithmDocType>({} as algorithmDocType);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetch = async () => {

            try{
                const docRef = doc(db, "algorithms", id);
                const algDoc = await getDoc(docRef);
               
                if(!algDoc.exists()) throw new Error("Not found!")

                setAlgorithm({
                    id: algDoc.id,
                    ...algDoc.data()
                } as algorithmDocType)
                

            }
            catch(err){
                setError(err as string)
            }

            setLoading(false);
            
        }

        fetch()
    }, [])

    return [algorithm, loading, error];
}

export const usePostAlgorithm = () => {

    const [loading, setLoading] = useState(true);

    const PostAlgorithm = async (algorithm: algorithmDraftType) => {
        const collectionRef = collection(db, "algorithms");

        await addDoc(collectionRef, algorithm);

        setLoading(false);
        console.log("added");
    }
    
    return {PostAlgorithm, loading}
}

export const useDeleteAlgorithm = () => {

    const [loading, setLoading] = useState(true);

    const DeleteAlgorithm = async (id: string) => {
        const docRef = doc(db, "algorithms", id);

        await deleteDoc(docRef);

        setLoading(false);
        console.log("added");
    }
    
    return {DeleteAlgorithm, loading}
}