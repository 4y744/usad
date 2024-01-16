//Import React hooks
import { useEffect, useState, useRef } from "react";

//Import Firebase hooks
import { doc, collection, getDoc, getDocs, writeBatch, where, query, DocumentData } from "firebase/firestore";
import { db } from "./firebase.ts";

export const useGetUser = (param: {username?: string, uid?: string}) : {username: string, uid: string, created: Date, loading: boolean, error: boolean} => {
    const [user, setUser] = useState({username: "", uid: "", created: new Date(), loading: true, error: false});

    useEffect(() => {
        const fetch = async () => {

            try{

                if(param.uid != null){
                    const userDocRef = doc(db, "users", param.uid);
                    const userDoc = await getDoc(userDocRef);
                    if(!userDoc.exists()) throw new Error("User does not exist");
                    const data = userDoc.data();
                    setUser({
                        uid: param.uid,
                        username: data.username,
                        created: new Date(data.created),
                        loading: false,
                        error: false
                    });

                }
                else if(param.username != null){
                    const q = query(collection(db, "users"), where("username", "==", param.username));
                    const userDoc = await getDocs(q);
                    if(!userDoc.docs[0].exists()) throw new Error("User does not exist");
                    const data = userDoc.docs[0].data();
                    setUser({
                        uid: userDoc.docs[0].id,
                        username: param.username!,
                        created: new Date(data.created),
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

export const useGetAlgorithms = (params: {username?: string, uid?: string}) : DocumentData[] | undefined => {
    const [algorithms, setAlgorithms] = useState<DocumentData[]>();

    const user = useGetUser({username: params.username, uid: params.uid})


    useEffect(() => {
        const fetch = async () => {

            try{
                const q = query(collection(db, "algorithms"), where("author", "==", user.username));
                const algDocs = await getDocs(q);
               
                if(algDocs.empty) throw new Error("Not found!")

                let tempDocs : any = [];
                algDocs.forEach((doc) => {
                    tempDocs.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })


                setAlgorithms(tempDocs)
            }
            catch(err){
                
            }
            
        }

        fetch()

    }, [user])

    return algorithms;
}