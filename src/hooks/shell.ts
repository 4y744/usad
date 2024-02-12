import { RefObject, useEffect, useRef, useState } from "react";
import { SHELL_URL } from "../config";
import { algorithmDraftType } from "../types";
import { TimeFormatter } from "../utils/formatter";
import { useTranslation } from "react-i18next";

type userInput = {
    variable: string, 
    content: string
}

type messageDataType = {
    message: string, 
    timestamp: string
}

export const useSandbox = (sandboxRef: RefObject<HTMLIFrameElement>) => {

    const [pending, setPending] = useState(true);
    const onMessageFunc = useRef<(data: messageDataType) => void>(() => {});

    const {t} = useTranslation();

    const handleMessage = (event: MessageEvent) => {

        if(event.origin != SHELL_URL) return;

        const timestamp = TimeFormatter.HourMinuteSecondMillisecond(event.data.timestamp);

        onMessageFunc.current({
            message: t(event.data.message),
            timestamp: timestamp
        });

        setPending(false);
    }

    
    const sendMessage = (algorithm: algorithmDraftType, userInput: userInput[]) => {
        sandboxRef.current!.contentWindow!.postMessage({func: algorithm.function, input: userInput, type: algorithm.input_type}, "*");
        setPending(true);
    }

    const onMessage = (func: (data: messageDataType) => void) => {
        onMessageFunc.current = func;
    }

    useEffect(() => {
        window.addEventListener("message", handleMessage)

        return () => {
            window.removeEventListener("message", handleMessage)
        }
        
    }, [])


    return {sendMessage, onMessage, pending};
}