import { collection, getDoc } from 'firebase/firestore';
//Import React hooks
import { useEffect, useState } from "react";

//Import Firebase hooks
import { auth } from "./firebase"
import { User, createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut } from "firebase/auth";

//Import Firebase hooks
import { doc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "./firebase.ts";
import { useUsernameValidator } from './validate.ts';
import { useNavigate } from 'react-router-dom';

export const useSignUp = (redirectUrl: string): [(username: string, email: string, password: string, confirmPassword: string) => void, boolean, string] => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [validateUsername, usernameError] = useUsernameValidator();

    useEffect(() => {
        setError(usernameError);
    }, [usernameError])

    const SignUp = async (username: string, email: string, password: string, confirmPassword: string) => {
        if (username.length == 0 || email.length == 0 || password.length == 0 || confirmPassword.length == 0) return setError("input/empty-fields");
        if (!validateUsername(username)) return setError("auth/invalid-username");
        if ((await getDoc(doc(db, "usernames", username))).exists()) return setError("auth/username-taken");

        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password).then(() => {
            const batch = writeBatch(db);
            batch.set(doc(db, "users", auth.currentUser!.uid), { username: username });
            batch.set(doc(db, "usernames", username), { uid: auth.currentUser!.uid })
            batch.commit()
                .then(() => navigate(redirectUrl))
                .catch((err) => setError(err.code));
        }).catch((err) => setError(err.code))

        setLoading(false);
    }

    return [SignUp, loading, error]
}

export const useSignIn = (redirectUrl: string): [(email: string, password: string) => void, boolean, string] => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const SignIn = async (email: string, password: string) => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
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

export const useGetUser = (): [string] => {
    const [username, setUsername] = useState("");

    onAuthStateChanged(auth, () => {
        if (auth.currentUser) getDoc(doc(db, "users", auth.currentUser.uid))
            .then((doc) => setUsername(doc.data()?.username))
        else setUsername("")
    })

    return [username];
}