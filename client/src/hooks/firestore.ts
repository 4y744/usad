//Import React hooks
import { useEffect, useState, useContext } from "react";

//Import React Router hooks
import { useNavigate } from "react-router-dom";

//Import Firebase misc
import { doc, collection, getDoc, getDocs, where, query, addDoc, deleteDoc, updateDoc, setDoc, collectionGroup } from "firebase/firestore";

//Import Firebase config
import { db } from "../services/firebase.ts";

//Import types
import { AlgorithmType, CommentType, UserType, VoteType } from "../types/index.ts";

//Import contexts
import { AuthContext } from "../App.tsx";

//Import custom hooks
import { useToast } from "./toast.ts";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const useGetUser = (username: string) : [UserType, boolean, string] => {

    const [user, setUser] = useState<UserType>({} as UserType);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    /**
     * Fetches the requested user's public information.
     */
    useEffect(() => {

        const fetch = async () => {

            setLoading(true);

            try{
    
                const docRef = doc(db, "users", username);
    
                const userDoc = await getDoc(docRef);
                
                if(!userDoc.exists()){
                    throw new Error();
                }
                
                setUser({
                    username: userDoc.id,
                    ...userDoc.data()
                } as UserType);
    
            }
            catch(err){

                setError(err as string);
    
            }
    
            setLoading(false);
            
        }

        fetch();
        
    }, [username])

    return [user, loading, error];
}

export const useGetAlgorithm = (id: string) : [AlgorithmType, boolean, string, (callback: (value: AlgorithmType) => AlgorithmType) => void] => {

    const [algorithm, setAlgorithm] = useState<AlgorithmType>({} as AlgorithmType);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    /**
     * Fetches an algorithm based on the given id.
     */
    useEffect(() => {
        
        const fetch = async () => {

            setLoading(true);

            try{
    
                const docRef = doc(db, "algorithms", id);
                const res = await getDoc(docRef);
    
                setAlgorithm({
                    id: res.id,
                    score: res.data()?.score || 0,
                    comments: res.data()?.comments || 0,
                    forks: res.data()?.forks || 0,
                    ...res.data()
                } as AlgorithmType);
                
            }
            catch(err){
    
                setError(err as string);
    
            }
    
            setLoading(false);
            
        }

        fetch();

    }, [id]);

    return [algorithm, loading, error, (callback: (value: AlgorithmType) => AlgorithmType) => setAlgorithm(callback)];
}

export const useGetAlgorithms = (username: string) : [AlgorithmType[], boolean, string, (callback: (value: AlgorithmType[]) => AlgorithmType[]) => void] => {

    const auth = useContext(AuthContext);

    const [algorithms, setAlgorithms] = useState<AlgorithmType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    /**
     * Fetches algorithms based on the given username.
     */
    useEffect(() => {

        const fetch = async () => {

            setLoading(true);

            try{
    
                const conditions = [];
    
                conditions.push(where("author", "==", username));
        
                if(auth.username != username){
                    conditions.push(where("visibility", "==", "public"));
                }
    
                const q = query(collection(db, "algorithms"), ...conditions);
                const res = await getDocs(q);
    
                setAlgorithms(res.docs.map(alg => ({
                    id: alg.id,
                    score: alg.data().score || 0,
                    comments: alg.data().comments || 0,
                    forks: alg.data().forks || 0,
                    ...alg.data()
                }) as AlgorithmType));
    
            }
            catch(err){
    
                setError(err as string);
    
            }
    
            setLoading(false);
    
        }

        fetch()

    }, [username]);

    return [algorithms, loading, error, (callback: (value: AlgorithmType[]) => AlgorithmType[]) => setAlgorithms(callback)];
}

export const useGetComments = ({id, username} : {id?: string, username?: string}) : [CommentType[], boolean, string, (callback: (value: CommentType[]) => CommentType[]) => void] => {

    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    /**
     * Fetches comments based on the given username
     */
    useEffect(() => {

        const fetch = async () => {

            setLoading(true);

            try{

                let q;

                if(username){

                    q = query(collectionGroup(db, "comments"), where("author", "==", username));

                }
                else if(id){

                    q = query(collection(db, "algorithms", id, "comments"));

                }
                else{

                    throw new Error();

                }
                
                const res = await getDocs(q);
    
                setComments(res.docs.map((doc) => ({
                    id: doc.id,
                    postId: doc.ref.parent.parent?.id,
                    ...doc.data()
                }) as CommentType));
    
            }
            catch(err){
    
                setError(err as string);
    
            }
    
            setLoading(false);
    
        }

        fetch();

    }, [id])

    return [comments, loading, error, (callback: (value: CommentType[]) => CommentType[]) => setComments(callback)];
}

export const useGetForks = (id: string) : [AlgorithmType[], boolean, string] => {

    const [forks, setForks] = useState<AlgorithmType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    /**
     * Fetches algorithms based on the given username.
     */
    useEffect(() => {

        const fetch = async () => {

            setLoading(true);

            try{
    
                const q = query(collection(db, "algorithms"), where("visibility", "==", "public"), where("fork_of", "==", id));
                const res = await getDocs(q);
    
                setForks(res.docs.map(alg => ({
                    id: alg.id,
                    ...alg.data()
                }) as AlgorithmType));
    
            }
            catch(err){
    
                setError(err as string);
    
            }
    
            setLoading(false);
    
        }

        fetch()

    }, [id]);

    return [forks, loading, error];
}

export const useGetVotes = (id: string) : [VoteType[], boolean, string, reload: (callback: (value: VoteType[]) => VoteType[]) => void] => {

    const [votes, setVotes] = useState<VoteType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    /**
     * Fetches comments based on the given username
     */
    useEffect(() => {

        const fetch = async () => {

            setLoading(true);

            try{
                
                const q = query(collection(db, "algorithms", id, "votes"));
                const res = await getDocs(q);
    
                setVotes(res.docs.map(vote => ({
                    author: vote.id,
                    ...vote.data()
                }) as VoteType))
    
            }
            catch(err){

                setError(err as string);
    
            }
    
            setLoading(false);
    
        }

        fetch();

    }, [id])

    return [votes, loading, error, (callback: (value: VoteType[]) => VoteType[]) => setVotes(callback)];

}

export const usePostAlgorithm = () : [(algorithm: AlgorithmType, callback?: () => void) => void, boolean, string] => {

    const {username} = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {AddToast} = useToast();

    const navigate = useNavigate();

    const {t} = useTranslation();

    /**
     * Posts an algorithm document.
     * @param algorithm - Algorithm you want to post.
     * @param callback - Called if the request was successful.
     */
    const PostAlgorithm = async (algorithm: AlgorithmType, callback?: () => void) => {

        setLoading(true);
        
        try{

            const docRef = await addDoc(collection(db, "algorithms"), {
                ...algorithm,
                author: username,
                created: Date.now()
            });
 
            navigate(`/algorithm/${docRef.id}`);

            if(callback){
                callback();
            }

        }
        catch(err){

            setError(err as string);

            AddToast({
                title: t("error"),
                text: t("error-message"),
                type: "error"
            });

        }

        setLoading(false);

    }
    
    return [PostAlgorithm, loading, error]
}

export const useDeleteAlgorithm = () : [(id: string, callback?: () => void) => void, boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {AddToast} = useToast();

    const {t} = useTranslation();

    /**
     * Deletes an algorithm document.
     * @param id - The id of the `Firestore` document.
     * @param callback - Called if the request was successful.
     */
    const DeleteAlgorithm = async (id: string, callback?: () => void) => {

        setLoading(true);
        
        try{

            const docRef = doc(db, "algorithms", id);

            await deleteDoc(docRef);

            if(callback){
                callback();
            }

        }
        catch(err){

            setError(err as string);

            AddToast({
                title: t("error"),
                text: t("error-message"),
                type: "error"
            });

        }

        setLoading(false);

    }
    
    return [DeleteAlgorithm, loading, error]
}

export const useEditAlgorithm = () : [(id: string, delta: any, callback?: () => void) => void, boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {AddToast} = useToast();

    const {t} = useTranslation();

    /**
     * Edits an algorithm document by applying the passed `delta` parameter to it.
     * @param id - The id of the `Firestore` document.
     * @param delta - The fields you want to edit.
     * @param callback - Called if the request was successful.
     */
    const EditAlgorithm = async (id: string, delta: any, callback?: () => void) => {

        setLoading(true);
        
        try{

            const docRef = doc(db, "algorithms", id);

            await updateDoc(docRef, delta);
            
            if(callback){
                callback();
            }

        }
        catch(err){

            setError(err as string);
            
            AddToast({
                title: t("error"),
                text: t("error-message"),
                type: "error"
            });

        }

        setLoading(false);

    }
    
    return [EditAlgorithm, loading, error]
}

export const usePostComment = () : [(id: string, comment: CommentType, callback?: () => void) => void, boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const auth = useContext(AuthContext);

    const {AddToast} = useToast();

    const {t} = useTranslation();

    /**
     * Posts an algorithm document.
     * @param id - Adds a comment to a document.
     * @param comment - The comment object you want to add.
     * @param callback - Called if the request was successful.
     */
    const PostComment = async (id: string, comment: CommentType, callback?: () => void) => {

        setLoading(true);
        
        try{

            if(comment.text == ""){

                throw new Error();

            }

            const collectionRef = collection(db, "algorithms", id, "comments");

            await addDoc(collectionRef, {
                ...comment,
                author: auth.username,
                created: Date.now()
            });

            if(callback){
                callback();
            }

        }
        catch(err){
            console.log(err)
            setError(err as string);

            AddToast({
                title: t("error"),
                text: t("error-message"),
                type: "error"
            });

        }

        setLoading(false);

    }
    
    return [PostComment, loading, error]

}

export const useDeleteComment = () : [(id: string, commentId: string, callback?: () => void) => void, boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {AddToast} = useToast();

    const {t} = useTranslation();

    /**
     * Deletes a comment from a document.
     * @param id - The id of the document the comment belongs to.
     * @param commentId - The id of the comment you want to delete.
     * @param callback - Called if the request was successful.
     */
    const DeleteComment = async (id: string, commentId: string, callback?: () => void) => {

        setLoading(true);
        
        try{

            const collectionRef = collection(db, "algorithms", id, "comments");

            const docRef = doc(collectionRef, commentId);

            await deleteDoc(docRef);

            if(callback){
                callback();
            }

        }
        catch(err){

            setError(err as string);

            AddToast({
                title: t("error"),
                text: t("error-message"),
                type: "error"
            });

        }

        setLoading(false);

    }
    
    return [DeleteComment, loading, error]

}

export const useAddVote = () : [(id: string, vote: VoteType, callback?: () => void) => void, boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const auth = useContext(AuthContext);

    /**
     * Adds a vote from a document.
     * @param id - The id of the document you want to add a vote to.
     * @param callback - Called if the request was successful.
     */
    const AddVote = async (id: string, vote: VoteType, callback?: () => void) => {
 
        setLoading(true);
        
        try{

            const collectionRef = collection(db, "algorithms", id, "votes");

            await setDoc(doc(collectionRef, auth.username), vote);

            if(callback){
                callback();
            }

        }
        catch(err){

            setError(err as string);

        }

        setLoading(false);

    }
    
    return [AddVote, loading, error]

}

export const useRemoveVote = () : [(id: string, callback?: () => void) => void, boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const auth = useContext(AuthContext);

    /**
     * Removes a vote from a document.
     * @param id - The id of the document you want to remove a vote from.
     * @param callback - Called if the request was successful.
     */
    const RemoveVote = async (id: string, callback?: () => void) => {

        setLoading(true);
        
        try{

            const collectionRef = collection(db, "algorithms", id, "votes");

            const docRef = doc(collectionRef, auth.username);

            await deleteDoc(docRef);

            if(callback){
                callback();
            }

        }
        catch(err){

            setError(err as string);

        }

        setLoading(false);

    }
    
    return [RemoveVote, loading, error]

}

