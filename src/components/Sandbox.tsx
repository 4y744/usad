import { useEffect, useRef } from "react"
import { SHELL_URL } from "../config"
import { algorithmDocType, submittedInputType } from "../types";
import { TimeFormatter } from "../utils/formatter";

export const Sandbox = ({algorithm, userInput, setStatus, setOutput} : 
    {algorithm: algorithmDocType, userInput: submittedInputType[], setStatus: (pending: boolean) => void, setOutput: (output: {value: string, timestamp: string}) => void}) => {


    //TODO: ADD FORWARD REF

    const sandboxRef = useRef<HTMLIFrameElement>(null);

    const handleMessage = (event: MessageEvent) => {

        if(event.origin != SHELL_URL) return;

        const timestamp = TimeFormatter.HourMinuteSecondMillisecond(event.data.timestamp);

        if(event.data.message != null)
        {
            setOutput({value: event.data.message, timestamp: timestamp});
            setStatus(false);
        }
        else{
            setOutput({value: event.data.value, timestamp: timestamp});
            setStatus(false);
        }
    }

    useEffect(() => {
        window.addEventListener("message", handleMessage)

        return () => {
            window.removeEventListener("message", handleMessage)
        }
        
    }, [])


    useEffect(() => {

        sandboxRef.current!.contentWindow!.postMessage({func: algorithm.function, input: userInput, type: algorithm.input_type}, "*");
        setStatus(true);
    }, [userInput])

    return (
        <iframe 
        sandbox="allow-same-origin allow-scripts"
        className='hidden'
        src={SHELL_URL} ref={sandboxRef}/>
    )
}