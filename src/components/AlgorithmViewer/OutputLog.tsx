import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export const OutputLog = ({logs, clearLogs} : {logs: Array<{message: string, timestamp: string}>, clearLogs: () => void}) => {

    const logRef = useRef<HTMLUListElement>(null);

    const {t} = useTranslation();

    useEffect(() => {
        logRef.current!.scroll({top: logRef.current!.getBoundingClientRect().height + logRef.current!.scrollTop, behavior: 'smooth'});
    })
    
    return (
        <>
            <div className='flex items-center mb-2'>
                <h1 className='text-xl font-semibold'>{t("output-log")}</h1>
                <button
                onClick={clearLogs}
                className="bg-green-700 hover:bg-green-600
                active:outline outline-2 outline-green-600 outline-offset-2
                px-4 py-2 ml-auto rounded-md shadow-md">
                    {t("clear")}
                </button>
            </div>

            <ul ref={logRef}
            className='bg-zinc-900 rounded-md p-4
            flex flex-col h-60 overflow-auto'>
                {logs.map(({message, timestamp}, key) => (
                    <OutputLogLine key={key} text={message} timestamp={timestamp} />)
                )}
            </ul>
        </>
    )
}

const OutputLogLine = ({text, timestamp} : {text: string, timestamp: string}) => {
    
    return (
        <li>
            <span className='text-green-600 font-semibold'>[{timestamp}]: </span>
            {text}
        </li>
    )
}

