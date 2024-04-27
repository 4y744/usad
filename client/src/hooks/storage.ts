//Import React hooks and misc
import { RefObject, useCallback, useContext, useEffect, useState } from "react";

//Import Firebase Storage misc
import { storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//Import components
import { useToast } from "./toast";
import { usePopup } from "./popup";
import { useTranslation } from "react-i18next";

export const useGetImage = (path: string) : [string, boolean, string, () => void] => {

    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetch = useCallback(async () => {

        setLoading(true);

        try{

            const imageRef = ref(storage, path);
            
            const url = await getDownloadURL(imageRef);

            setUrl(url);

        }
        catch(err){

            setError(err as string);

        }

        setLoading(false);
        
    }, [])

    useEffect(() => {

        fetch()
        
    }, [])

    return [url, loading, error, fetch];

}

export const useSetImage = (filepickerRef: RefObject<HTMLInputElement>, path: string, callback?: () => void) : [() => void, boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {AddToast} = useToast();
    const {SetPopup} = usePopup();

    const {t} = useTranslation();

    const UploadImage = async () => {

        filepickerRef.current!.click();

    }

    const handleChange = () => {

        SetPopup({
            title: t("update-pfp"),
            text: t("update-pfp-text"),
            type: "confirm",
            callback: async () => {

                try{

                    setLoading(true);

                    const imageRef = ref(storage, path);

                    await uploadBytes(imageRef, filepickerRef.current!.files![0]);

                    if(callback){
                        callback();
                    }

                }
                catch(err){

                    AddToast({
                        title: t("error"),
                        text: t("error-message"),
                        type: "error"
                    });

                    setError(err as string);

                }

                setLoading(false);

            }
        });

    }

    useEffect(() => {

        filepickerRef.current!.addEventListener("change", handleChange)

    }, [])
    
    return [UploadImage, loading, error]

}