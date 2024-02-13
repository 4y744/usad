//Import React hooks
import { useEffect, useRef, useState } from 'react';

//Import React Router hooks
import { Link, useParams } from 'react-router-dom';

//Import custom hooks
import { useGetAlgorithm } from '../../hooks/firestore.ts';
import { useSandbox } from '../../hooks/shell.ts';

//Import components
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner.tsx';
import { PageWrapper } from '../../components/Layout/PageWrapper.tsx';
import { NotFoundPage } from '../static/NotFoundPage.tsx';
import { Sandbox } from '../../components/Sandbox.tsx';
import { AlgorithmInput } from '../../components/AlgorithmViewer/AlgorithmInput.tsx';
import { CodeContainer } from '../../components/AlgorithmViewer/CodeContainer.tsx';
import { OutputLog } from '../../components/AlgorithmViewer/OutputLog.tsx';

//Import utils
import { TimeFormatter } from '../../utils/formatter.ts';

//Import i18n hooks
import { useTranslation } from 'react-i18next';


export const AlgorithmPage = () => {


    const {id} = useParams();
    const [algorithm, loading, error] = useGetAlgorithm(id!);

    const input = useRef<Array<{variable: string, content: string}>>([]);
    const [output, setOutput] = useState<Array<{message: string, timestamp: string}>>([]);

    const {t} = useTranslation();

    const sandboxRef = useRef<HTMLIFrameElement>(null);
    const {sendMessage, onMessage, pending} = useSandbox(sandboxRef);

    useEffect(() => {
        onMessage((data) => setOutput([...output, data]))
    }, [output])

    const handleRun = () => {
        sendMessage(algorithm, input.current);
    }

    
    if(loading) return <Placeholder/>
    if(error) return <NotFoundPage/>
    

    return (
        <PageWrapper>
            
            <Sandbox ref={sandboxRef}/>

            <div className='bg-zinc-900
            grid md:grid-cols-2 grid-cols-1 gap-5
            md:w-4/5 w-[90vw] p-4 rounded-md shadow-md'>
                
                <div className='flex flex-col gap-5'>
                    
                    <div className='flex flex-col bg-zinc-800 p-4 rounded-md
                    shadow-md'>
                        <h1 className='text-2xl font-semibold mb-1'>{algorithm.title}</h1>
                        <div className='text-sm text-zinc-300'>
                            <span>{t("posted-by")} </span>
                            <Link to={`/user/${algorithm.author}`}
                            className='hover:underline font-semibold'>{algorithm.author}</Link>

                            <span> {t("on")} </span>
                            <span className='font-semibold'>
                                {TimeFormatter.DayMonthYear(algorithm.created!)}
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col bg-zinc-800 p-4 rounded-md
                    shadow-md'>
                        
                        <AlgorithmInput 
                        inputRef={input}
                        algorithm={algorithm}
                        status={pending}
                        handleRun={handleRun}/>

                    </div>
                </div>

                

                <div className='bg-zinc-800 p-4 rounded-md shadow-md'>
                    <h1 className='text-xl font-semibold mb-2'>{t("description")}</h1>
                    <p className='text-base'>{algorithm.description}</p>
                </div>

                <div className='flex flex-col bg-zinc-800 p-4
                rounded-md shadow-md'>
                    
                    <OutputLog 
                    logs={output}
                    clearLogs={() => setOutput([])}/>

                </div>
                

                <div className='bg-zinc-800 p-4 rounded-md
                shadow-md'>

                    <CodeContainer func={algorithm.function!}/>

                </div>

            </div>
        
        </PageWrapper>

            

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
