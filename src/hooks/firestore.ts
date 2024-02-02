//Import React hooks
import { useEffect, useState, useRef } from "react";

//Import Firebase hooks
import { doc, collection, getDoc, getDocs, writeBatch, where, query, DocumentData } from "firebase/firestore";
import { db } from "./firebase.ts";
import { algorithmType } from "../types/index.ts";

export const useGetUser = (param: {username?: string, uid?: string}) : {username: string, uid: string, created: number, loading: boolean, error: boolean} => {
    const [user, setUser] = useState({username: "", uid: "", created: 0, loading: true, error: false});

    useEffect(() => {
        const fetch = async () => {

            try{

                if(param.username != null){
                    const userDocRef = doc(db, "users", param.username);
                    const userDoc = await getDoc(userDocRef);
                    if(!userDoc.exists()) throw new Error("User does not exist");
                    const data = userDoc.data();
                    setUser({
                        uid: data.uid,
                        username: param.username,
                        created: data.created,
                        loading: false,
                        error: false
                    });

                }
                else if(param.uid != null){
                    const q = query(collection(db, "users"), where("username", "==", param.username));
                    const userDoc = await getDocs(q);
                    if(!userDoc.docs[0].exists()) throw new Error("User does not exist");
                    const data = userDoc.docs[0].data();
                    setUser({
                        uid: param.uid,
                        username: userDoc.docs[0].id,
                        created: data.created,
                        loading: false,
                        error: false
                    });

                }else{
                    throw new Error();
                }

            }
            catch(err){
                setUser({...user, error: true})
            }
            
        }

        fetch()
        
    }, [])

    return user;
}

export const useGetAlgorithms = (params: {username?: string, uid?: string}) : {algorithms: algorithmType[] | undefined, loading: boolean} => {
    const [algorithms, setAlgorithms] = useState<algorithmType[]>([]);
    const [loading, setLoading] = useState(true);

    const user = useGetUser({username: params.username, uid: params.uid})


    useEffect(() => {
        const fetch = async () => {

            try{
                const q = query(collection(db, "algorithms"), where("author", "==", user.username));
                const algDocs = await getDocs(q);
               
                if(algDocs.empty) throw new Error("Not found!")

                let tempDocs : algorithmType[] = [];
                algDocs.forEach((doc) => {
                    tempDocs.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })


                setAlgorithms(tempDocs);
            }
            catch(err){
                
            }
            
            setLoading(false);
        }

        fetch()

    }, [user])

    return {algorithms, loading};
}




export const useGetAlgorithm = (id: string) => {
    const [algorithm, setAlgorithm] = useState<algorithmType>({id: "", loading: true});

    useEffect(() => {
        const fetch = async () => {

            try{
                const docRef = doc(db, "algorithms", id);
                const algDoc = await getDoc(docRef);
               
                if(!algDoc.exists()) throw new Error("Not found!")

                setAlgorithm({
                    id: algDoc.id,
                    ...algDoc.data(),
                    loading: false
                })
            }
            catch(err){
                
            }
            
        }

        fetch()
    }, [])

    return algorithm;
}