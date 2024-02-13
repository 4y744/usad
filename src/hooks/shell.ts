//Import React hooks
import { RefObject, useEffect, useRef, useState } from "react";

//Import config
import { SHELL_URL } from "../config";

//Import types
import { algorithmDraftType, messageDataType, userInput } from "../types";

//Import utils
import { TimeFormatter } from "../utils/formatter";

//Import i18n hooks
import { useTranslation } from "react-i18next";

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