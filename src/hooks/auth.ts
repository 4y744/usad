//Import React hooks
import { useEffect, useState } from "react";

//Import Firebase hooks
import { auth } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

//Import Firestore hooks
import { collection, doc, getDoc, getDocs, query, setDoc, where, writeBatch } from "firebase/firestore";
import { db } from "./firebase.ts";

//Import React Router hooks
import { useNavigate } from 'react-router-dom';

//Import types
import { authType } from "../types/index.ts";

export const useSignUp = (redirectUrl: string): [(credentials: {username: string, email: string, password: string, confirmPassword: string}) => void, boolean, string] => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const SignUp = async (credentials: {username: string, email: string, password: string, confirmPassword: string}) => {

        setLoading(true);
        
        try{

            Object.entries(credentials).forEach(([key, val]) => {
                if(val.length == 0) {
                    throw {code: "input/empty-fields"}
                }
            });

            if(credentials.password != credentials.confirmPassword) throw {code: "input/password-mismatch"}
            
            const usernameTaken = (await getDoc(doc(db, "users", credentials.username))).exists();
            if(usernameTaken) throw {code: "auth/username-taken"}
        
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)

            await setDoc(doc(db, "users", credentials.username), {
                uid: auth.currentUser!.uid,
                created: Date.now()
            })

            navigate(redirectUrl);

        }
        catch(error: any){

            setError(error.code)
        }

        setLoading(false);
    }

    return [SignUp, loading, error]
}

export const useSignIn = (redirectUrl: string): [(credentials: {email: string, password: string}) => void, boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const SignIn = async (credentials : {email: string, password: string}) => {

        setLoading(true);

        try{
            Object.entries(credentials).forEach(([key, val]) => {
                if(val.length == 0){
                    throw {code: "input/empty-fields"}
                }
            });


            await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

            navigate(redirectUrl)

            setLoading(false);
        }
        catch(error: any){

            setError(error.code);
        }

        setLoading(false);
    }

    return [SignIn, loading, error]
}

export const useSignOut = (redirectUrl: string): [() => void, boolean] => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const SignOut = async () => {

        setLoading(true);

        await signOut(auth)

        navigate(redirectUrl);

        setLoading(false);
    }

    return [SignOut, loading]
}

export const useUser = () : authType => {
    const [user, setUser] = useState<authType>({loading: true} as authType);

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            setUser({...user, loading: true})

            if (auth.currentUser) {
                const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid) )
                getDocs(q)
                .then((data) =>{
                    setUser({
                        ...user, 
                        username: data.docs[0].id, 
                        email: auth.currentUser!.email!, 
                        logged: true, 
                        loading: false
                    })
                })
            }
            else {
                setUser({
                    ...user, 
                    username: "", 
                    email: "", logged: 
                    false, 
                    loading: false
                })
            }
        })
    }, []) 
    
    return user;
}