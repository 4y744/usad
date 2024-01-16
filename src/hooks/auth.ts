//Import React hooks
import { useEffect, useState } from "react";

//Import Firebase hooks
import { auth } from "./firebase"
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

//Import Firebase hooks
import { doc, collection, getDoc, getDocs, writeBatch, where, query } from "firebase/firestore";
import { db } from "./firebase.ts";
import { useUsernameValidator } from './validate.ts';
import { useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app";

export const useSignUp = (redirectUrl: string): [(credentials: {username: string, email: string, password: string, confirmPassword: string}) => void, boolean, string] => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [validateUsername, usernameError] = useUsernameValidator();

    useEffect(() => {
        setError(usernameError);
    }, [usernameError])

    const SignUp = async (credentials: {username: string, email: string, password: string, confirmPassword: string}) => {
        //Using a separate variable to store the errors avoids synchronisation problems as setState() is async.
        //It also only refreshes the component once when multiple errors are present.
        setLoading(true);

        let tempError = "";
        Object.entries(credentials).forEach(async([key, val]) => val.length == 0 && (tempError = "input/empty-fields"));
        credentials.username && await (await getDoc(doc(db, "usernames", credentials.username))).exists() && (tempError = "auth/username-claimed");
        
        if(tempError.length > 0){
            setLoading(false);
            return setError(tempError)
        };
        

        await createUserWithEmailAndPassword(auth, credentials.email, credentials.password).catch().then(() => {
            const batch = writeBatch(db);
            batch.set(doc(db, "users", auth.currentUser!.uid), { 
                username: credentials.username,
                created: Date.now()
            });
            batch.set(doc(db, "usernames", credentials.username), { uid: auth.currentUser!.uid })
            batch.commit()
                .then(() => navigate(redirectUrl))
                .catch((err) => setError(err.code));
        }).catch((err) => setError(err.code))

        setLoading(false);
    }

    return [SignUp, loading, error]
}

export const useSignIn = (redirectUrl: string): [(credentials: {email: string, password: string}) => void, boolean, string] => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const SignIn = async (credentials : {email: string, password: string}) => {
        //Using a separate variable to store the errors avoids synchronisation problems as setState() is async.
        //It also only refreshes the component once when multiple errors are present.
        setLoading(true);

        let tempError = "";
        Object.entries(credentials).forEach(async([key, val]) => val.length == 0 && (tempError = "input/empty-fields"));

        if(tempError.length > 0){
            setLoading(false);
            return setError(tempError)
        };

        setLoading(true);
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then(() => navigate(redirectUrl))
            .catch((err) => setError(err.code));
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
            .then(() => navigate(redirectUrl));
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

export const useUser = () : {username: string, email: string, logged: boolean, loading: boolean} => {
    const [user, setUser] = useState({username: "", email: "", logged: false, loading: true});

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            setUser({...user, loading: true})
            if (auth.currentUser) {
                getDoc(doc(db, "users", auth.currentUser.uid))
                .then((doc) => setUser({...user, username: doc.data()?.username, email: auth.currentUser!.email!, logged: true, loading: false}))
            }
            else {
                setUser({...user, username: "", email: "", logged: false, loading: false})
            }
        })
    }, []) 
    
    return user;
}