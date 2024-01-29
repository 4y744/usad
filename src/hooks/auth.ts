//Import React hooks
import { useEffect, useState } from "react";

//Import Firebase hooks
import { auth } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

//Import Firebase hooks
import { doc, getDoc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "./firebase.ts";
import { useNavigate } from 'react-router-dom';
import { userType } from "../types/index.ts";

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
            
            const usernameTaken = (await getDoc(doc(db, "usernames", credentials.username))).exists();
            if(usernameTaken) throw {code: "auth/username-taken"}
        
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            
            const batch = writeBatch(db);
                    
            batch.set(doc(db, "users", auth.currentUser!.uid), { 
                username: credentials.username,
                created: Date.now()
            });

            batch.set(doc(db, "usernames", credentials.username), { uid: auth.currentUser!.uid })

            await batch.commit()

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

// export const useGetUsername = () : [(uid: string) => void, string] => {
//     const [username, setUsername] = useState("");

//     const getUsername = async (uid: string) => {
//       await setUsername((await getDoc(doc(db, "users", uid))).data()?.username)
//     }

//     return [getUsername, username]
//}



export const useUser = () : userType => {
    const [user, setUser] = useState({username: "", email: "", logged: false, loading: true});

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            setUser({...user, loading: true})

            if (auth.currentUser) {
                getDoc(doc(db, "users", auth.currentUser.uid))
                .then((doc) =>{
                    setUser({
                        ...user, 
                        username: doc.data()?.username, 
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