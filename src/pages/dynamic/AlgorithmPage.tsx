//Import React hooks
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

//Import React Router hooks
import { Link, useParams } from 'react-router-dom';

//Import custom hooks
import { useGetAlgorithm } from '../../hooks/firestore.ts';

//Import contexts
import { InputContext } from '../../contexts/index.ts';

//Import components
import { LoadingSpinner } from '../../components/LoadingSpinner.tsx';

//Import utils
import { TimeFormatter } from '../../utils/formatter.ts';

//Import config constants
import { SHELL_URL } from '../../config/index.ts';


export const AlgorithmPage = () => {


    const {id} = useParams();
    const algorithm = useGetAlgorithm(id!);

    const input = useRef<string[]>([]);

    const sandboxRef = useRef<HTMLIFrameElement>(null);
    
    const [loading, setLoading] = useState(true);
    const [output, setOutput] = useState<Array<{value: string, timestamp: string}>>([]);

    const handleRun = () => {
        setLoading(true);
        sandboxRef.current!.contentWindow!.postMessage({func: algorithm.function, input: input.current}, "*");
    }

    const handleClearLog = () => {
        setOutput([]);
    }

    const handleMessage = (event: MessageEvent) => {

        if(event.origin == SHELL_URL){
            console.log("f");
            const timestamp = TimeFormatter.HourMinuteSecondMillisecond(event.data.timestamp);

            if(event.data.message != null)
            {
                setOutput(prev => [
                    ...prev,
                    {
                        value: event.data.message,
                        timestamp: timestamp
                    }
                ]);
                
                return setLoading(false);
            }

            setOutput((prev) => [
                ...prev,
                {value: event.data.value, timestamp: timestamp}
            ])


            setLoading(false);

        }
    }


    useEffect(() => {
        window.addEventListener("message", handleMessage)

        return () => {
            window.removeEventListener("message", handleMessage)
        }
        
    }, [])

    
    if(algorithm.loading) return <Placeholder/>
    

    return (
        <InputContext.Provider value={input}>
            <div className='w-full md:my-16 my-8 text-white
            flex justify-center items-center'>
            <iframe 
            sandbox="allow-same-origin allow-scripts"
            className='hidden'
            src={SHELL_URL} ref={sandboxRef}/>

            <div className='bg-zinc-900
            grid md:grid-cols-2 grid-cols-1 gap-5
            md:w-4/5 w-[90vw] p-4 rounded-md shadow-md'>
                
                <div className='flex flex-col gap-5'>
                    
                    <div className='flex flex-col bg-zinc-800 p-4 rounded-md
                    shadow-md'>
                        <h1 className='text-2xl font-semibold mb-1'>{algorithm.title}</h1>
                        <div className='text-sm text-zinc-300'>
                            <span>Posted by </span>
                            <Link to={`/user/${algorithm.author}`}
                            className='hover:underline font-semibold'>{algorithm.author}</Link>

                            <span> on </span>
                            <span className='font-semibold'>
                                {TimeFormatter.DayMonthYear(algorithm.created!)}
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col bg-zinc-800 p-4 rounded-md
                    shadow-md'>
                        <div className='flex items-center mb-2'>
                            <h1 className='text-xl font-semibold'>Inputs</h1>
                            <button
                            onClick={handleRun}
                            className={`bg-green-700
                            outline-2 outline-green-600 outline-offset-2
                            px-4 py-2 ml-auto rounded-md shadow-md
                            ${loading ?  "opacity-50" : "opacity-100 hover:bg-green-600 active:outline"}`}
                            disabled={loading}>
                            {loading ? <LoadingSpinner/> : <>Run</>}
                            </button>
                        </div>
                        {algorithm.input_type == "box" ? 
                        <InputBoxContainer inputs={algorithm.inputs!} /> :
                        <InputField placeholder={algorithm.inputs![0]}/>}
                    </div>
                </div>

                

                <div className='bg-zinc-800 p-4 rounded-md
                shadow-md'>
                    <h1 className='text-xl font-semibold mb-2'>Description</h1>
                    <p className='text-base'>{algorithm.description}</p>
                </div>

                <div className='flex flex-col bg-zinc-800 p-4
                rounded-md shadow-md'>
                    <div className='flex items-center mb-2'>
                        <h1 className='text-xl font-semibold'>Output log</h1>
                        <button
                        onClick={handleClearLog}
                        className="bg-green-700 hover:bg-green-600
                        active:outline outline-2 outline-green-600 outline-offset-2
                        px-4 py-2 ml-auto rounded-md shadow-md">
                            Clear
                        </button>
                    </div>
                    <OutputLog logs={output}/>
                </div>
                

                <div className='bg-zinc-800 p-4 rounded-md
                shadow-md'>
                    <h1 className='text-xl font-semibold mb-2'>JavaScript</h1>
                    <CodeContainer func={algorithm.function!}/>
                </div>

            </div>
        </div>
        </InputContext.Provider>

            

    )
}



const InputField = ({placeholder} : {placeholder: string}) => {

    const input = useContext(InputContext);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        input.current = event.target.value.split(/(?:,| |[\n])+/);
        input.current = input.current.filter((str) => str !== "");
    }

    return (
        <textarea
        onChange={handleChange}
        placeholder={placeholder}
        className='bg-zinc-900 resize-none
        p-2 rounded-md shadow-md h-36
        focus:outline outline-2 outline-green-600 outline-offset-2'/>
    )
}

const InputBoxContainer = ({inputs} : {inputs: string[]}) => {

    return (
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-5'>
            {inputs.map((input, key) => (
                <InputBox placeholder={input} index={key} key={key}/>
            ))}           
        </div>
    )
}


const InputBox = ({placeholder, index} : {placeholder: string, index: number}) => {

    const input = useContext(InputContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        input.current[index] = event.target.value.split(/(?:,| |[\n])+/)
        .filter((str) => str !== "")[0];
    }

    return (
        <input
        placeholder={placeholder}
        onChange={handleChange}
        className='bg-zinc-900
        p-2 rounded-md shadow-md
        focus:outline outline-2 outline-green-600 outline-offset-2' 
        type="text" />
    )
}


const OutputLog = ({logs} : {logs: Array<{value: string, timestamp: string}>}) => {

    const logRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        logRef.current!.scroll({top: logRef.current!.getBoundingClientRect().height + logRef.current!.scrollTop, behavior: 'smooth'});
    })
    
    return (
        <ul ref={logRef}
        className='bg-zinc-900 rounded-md p-4
            flex flex-col h-60 overflow-auto'>
            {logs.map(({value, timestamp}, key) => (
                <OutputLogLine key={key} text={value} timestamp={timestamp} />)
            )}
        </ul>
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


const CodeContainer = ({func} : {func: string}) => {

    return (
        <div className='bg-zinc-900 rounded-md p-4
        flex flex-col h-60 overflow-auto'>
            <span>{atob(func)}</span>
        </div>
    )
}

const Placeholder = () => {

    return (
        <div className='w-full md:my-16 my-8 text-white
            flex justify-center items-center'>

            <div className='bg-zinc-900
            grid md:grid-cols-2 grid-cols-1 gap-5
            md:w-4/5 w-[90vw] p-4 rounded-md shadow-md'>
                
                <div className='bg-zinc-800 p-4 rounded-md
                shadow-md h-60 flex justify-center items-center'>
                    <LoadingSpinner/>
                </div>

                <div className='bg-zinc-800 p-4 rounded-md
                shadow-md h-60 flex justify-center items-center'>
                    <LoadingSpinner/>
                </div>

                <div className='bg-zinc-800 p-4 rounded-md
                shadow-md h-60 flex justify-center items-center'>
                    <LoadingSpinner/>
                </div>

                <div className='bg-zinc-800 p-4 rounded-md
                shadow-md h-60 flex justify-center items-center'>
                    <LoadingSpinner/>
                </div>

            </div>
        </div>
    )
}
