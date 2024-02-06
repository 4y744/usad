//Import React hooks
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

//Import React Router hooks
import { Link, Navigate, useParams } from 'react-router-dom';

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
import { validateBase64String } from '../../utils/validator.ts';
import { PageWrapper } from '../../components/Layout/PageWrapper.tsx';
import { NotFoundPage } from '../static/NotFoundPage.tsx';


export const AlgorithmPage = () => {


    const {id} = useParams();
    const {algorithm, loading, error} = useGetAlgorithm(id!);

    const input = useRef<Array<{variable: string, content: string}>>([]);

    const sandboxRef = useRef<HTMLIFrameElement>(null);
    
    const [pending, setPending] = useState(true);

    const [output, setOutput] = useState<Array<{value: string, timestamp: string}>>([]);

    const handleRun = () => {
        setPending(true);
        sandboxRef.current!.contentWindow!.postMessage({func: algorithm.function, input: input.current, type: algorithm.input_type}, "*");
    }

    const handleClearLog = () => {
        setOutput([]);
    }

    const handleMessage = (event: MessageEvent) => {

        if(event.origin == SHELL_URL){
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
                
                return setPending(false);
            }

            setOutput((prev) => [
                ...prev,
                {value: event.data.value, timestamp: timestamp}
            ])


            setPending(false);

        }
    }


    useEffect(() => {
        window.addEventListener("message", handleMessage)

        return () => {
            window.removeEventListener("message", handleMessage)
        }
        
    }, [])

    
    if(loading) return <Placeholder/>
    if(error) return <NotFoundPage/>
    

    return (
        <PageWrapper>
            <InputContext.Provider value={input}>

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
                            ${pending ?  "opacity-50" : "opacity-100 hover:bg-green-600 active:outline"}`}
                            disabled={pending}>
                            {pending ? <LoadingSpinner/> : <>Run</>}
                            </button>
                        </div>
                        {algorithm.input_type == "box" ? 
                        <InputBoxContainer inputs={algorithm.inputs || [{variable: "", label:"[not available]"}]} /> :
                        <InputField inputs= {algorithm.inputs || [{variable: "", label:"[not available]"}]}/>}
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

            </InputContext.Provider>
        
        </PageWrapper>

            

    )
}



const InputField = ({inputs} : {inputs: Array<{variable: string, label: string}>}) => {

    const input = useContext(InputContext);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const userInput = event.target.value.split(/(?:,| |[\n])+/)
        .filter((str) => str !== "").join(",");
        input.current[0] = {variable: inputs[0].variable, content: userInput}
    }

    return (
        <textarea
        onChange={handleChange}
        placeholder={inputs[0].label}
        className='bg-zinc-900 resize-none
        p-2 rounded-md shadow-md h-36
        focus:outline outline-2 outline-green-600 outline-offset-2'/>
    )
}

const InputBoxContainer = ({inputs} : {inputs: Array<{variable: string, label: string}>}) => {

    return (
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-5'>
            {inputs.map((input, key) => (
                <InputBox placeholder={input.label} variable={input.variable} index={key} key={key}/>
            ))}           
        </div>
    )
}


const InputBox = ({placeholder, variable, index} : {placeholder: string, variable: string, index: number}) => {

    const input = useContext(InputContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const userInput = event.target.value.split(/(?:,| |[\n])+/)
        .filter((str) => str !== "")[0];
        input.current[index] = {variable: variable, content: userInput}
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
            <span>{validateBase64String(func)}</span>
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
