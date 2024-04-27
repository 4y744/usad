//Import React hooks and misc
import { RefObject, useEffect, useState } from "react";

//Import config
import { SHELL_URL } from "../config";

export const useSandbox = (sandboxRef: RefObject<HTMLIFrameElement>, callback: (output: {message: string, timestamp: number}) => void) : [(code: string, input: {variable: string, value: string | string[]}[]) => void, boolean] => {

    const [pending, setPending] = useState(true);

    const handleMessage = (event: MessageEvent) => {

        if(event.origin != SHELL_URL) return;

        callback({
            message: event.data.message,
            timestamp: event.data.timestamp
        });

        setPending(false);
    }

    
    const SendMessage = (code: string, input: {variable: string, value: string | string[]}[]) => {

        sandboxRef.current!.contentWindow!.postMessage({func: code, input: input}, "*");

        setPending(true);

    }


    useEffect(() => {
        window.addEventListener("message", handleMessage)

        return () => {
            window.removeEventListener("message", handleMessage)
        }
        
    }, [])


    return [SendMessage, pending];
}