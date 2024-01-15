//Import React hooks
import { useEffect, useState, useRef } from "react";

//Import Firebase hooks
import { doc, collection, getDoc, getDocs, writeBatch, where, query } from "firebase/firestore";
import { db } from "./firebase.ts";
import { useNavigate } from 'react-router-dom';

export const useGetUser = (param: {username?: string, uid?: string}, handleError: () => void) : {user: {username: string, uid: string}, loading: boolean} => {
    const [loading, setLoading] = useState(true);
    const user = useRef({username: "", uid: ""});

    useEffect(() => {
        const fetch = async () => {

            try{

                if(param.uid != null){
                    const userDocRef = doc(db, "users", param.uid);
                    const userDoc = await getDoc(userDocRef);
                    if(!userDoc.exists()) throw new Error("User does not exist");
                    const data = userDoc.data();
                    user.current = {
                        uid: param.uid,
                        username: data.username
                    };
                }
                else{
                    const q = query(collection(db, "users"), where("username", "==", param.username));
                    const userDoc = await getDocs(q);
                    if(!userDoc.docs[0].exists()) throw new Error("User does not exist");
                    const data = userDoc.docs[0].data();
                    user.current = {
                        uid: userDoc.docs[0].id,
                        username: param.username!
                    };
                }

            }
            catch(err){
                handleError();
            }
            
        }

        setLoading(true);

        fetch()
        .then(() => setLoading(false))
        
        
    }, [])

    return {user: user.current, loading}
}

export const useGetAlgorithms = (params: {username?: string, uid?: string}) : {algorithms: any[] | undefined} => {
    const [algorithms, setAlgorithms] = useState<any[]>();

    const {user, loading} = useGetUser({username: params.username, uid: params.uid}, () => {})


    useEffect(() => {
        const fetch = async () => {

            try{
                const q = query(collection(db, "algorithms"), where("author", "==", user.uid));
                const algDocs = await getDocs(q);
               
                if(algDocs.empty) throw new Error("Not found!")

                const data = Object.entries(algDocs.docs).map(([key, doc]) => doc.data());
                
                
                setAlgorithms({
                    ...data
                })
            }
            catch(err){
                console.log(err);
            }
            
        }

        if(!user) fetch()

    }, [user])

    return {algorithms}
}