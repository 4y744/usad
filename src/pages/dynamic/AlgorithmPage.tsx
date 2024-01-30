

//Import react hooks
import { Link, useParams } from 'react-router-dom';

import { useGetUser, useGetlAlgorithm } from '../../hooks/firestore.ts';
import { useEffect, useRef } from 'react';

export const AlgorithmPage = () => {


    const {id} = useParams();
    const algorithm = useGetlAlgorithm(id!);

    if(algorithm.loading) return <>Loading</>
    
    return (
        <div className='w-full my-32 text-white
        flex justify-center items-center'>

            <div className='bg-zinc-900
            grid md:grid-cols-2 grid-cols-1 gap-5
            md:w-4/5 w-10/12 p-4 rounded-md drop-shadow-md'>
                
                <div className='flex flex-col gap-5'>
                    
                    <div className='flex flex-col bg-zinc-800 p-4 rounded-md
                    drop-shadow-md'>
                        <h1 className='text-2xl font-semibold mb-1'>{algorithm.title}</h1>
                        <div className='text-sm text-zinc-300'>
                            <span>Posted by </span>
                            <Link to={`/user/${algorithm.author}`}
                            className='hover:underline font-semibold'>{algorithm.author}</Link>

                            <span> on </span>
                            <span className='font-semibold'>20/20/20</span>
                        </div>
                    </div>

                    <div className='flex flex-col bg-zinc-800 p-4 rounded-md
                    drop-shadow-md'>
                        <div className='flex items-center mb-2'>
                            <h1 className='text-xl font-semibold'>Inputs</h1>
                            <button
                            className='bg-green-700 hover:bg-green-600
                            active:outline outline-2 outline-green-600 outline-offset-2
                            px-4 py-2 ml-auto rounded-md drop-shadow-md'>Run</button>
                        </div>
                        <InputField placeholder='Enter values here...'/>
                        {/* <InputBoxContainer/> */}
                    </div>
                </div>

                

                <div className='bg-zinc-800 p-4 rounded-md
                drop-shadow-md'>
                    <h1 className='text-xl font-semibold mb-2'>Description</h1>
                    <p className='text-base'>{algorithm.description}</p>
                </div>

                <div className='bg-zinc-800 p-4 rounded-md
                drop-shadow-md'>
                    <h1 className='text-xl font-semibold mb-2'>Output log</h1>
                    <OutputLog/>
                </div>

                <div className='bg-zinc-800 p-4 rounded-md
                drop-shadow-md'>
                    <h1 className='text-xl font-semibold mb-2'>JavaScript</h1>
                    <CodeContainer/>
                </div>

                {/* <div className='bg-zinc-800 p-4 rounded-md
                drop-shadow-md
                row-start-1 row-end-3'>
                    <h1 className='text-xl font-semibold mb-2'>Output log</h1>
                    <OutputLog/>
                </div> */}
            </div>

            {/* <div>
                <h1>{algorithm.title!}</h1>
                <Input inputs={algorithm.inputs!} type={algorithm.input_type!} function={algorithm.function!}></Input>
            </div>
            <div>
                <h1>Описание</h1>
                <p>{algorithm.description}</p>
            </div> */}
        </div>

            

    )
}

const OutputLogLine = ({text, timestamp} : {text: string, timestamp: string}) => {
    
    return (
        <span>
            <span 
            className='mr-1 text-green-600 font-semibold'>
                [{timestamp}]:
            </span>
            <span>{text}</span>
        </span>
    )
}

const InputField = ({placeholder} : {placeholder: string}) => {

    return (
        <textarea
        placeholder={placeholder}
        className='bg-zinc-900 resize-none
        p-2 rounded-md drop-shadow-md h-36
        focus:outline outline-2 outline-green-600 outline-offset-2'/>
    )
}

const InputBoxContainer = () => {

    return (
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-5'>
            <InputBox placeholder='Number'/>
            <InputBox placeholder='Log'/>
            <InputBox placeholder='Exponent'/>
            <InputBox placeholder='Enter values here'/>           
        </div>
    )
}


const InputBox = ({placeholder} : {placeholder: string}) => {

    return (
        <input
        placeholder={placeholder}
        className='bg-zinc-900
        p-2 rounded-md drop-shadow-md
        focus:outline outline-2 outline-green-600 outline-offset-2' 
        type="text" />
    )
}

const OutputLog = () => {

    return (
        <div className='bg-zinc-900 rounded-md p-4
            flex flex-col h-60 overflow-y-scroll'>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
            <OutputLogLine text='Fizz' timestamp='12:24:45.443'/>
        </div>
    )
}

const CodeContainer = () => {

    return (
        <div className='bg-zinc-900 rounded-md p-4
        flex flex-col h-60 overflow-y-scroll'>
            <span>{`
            function getBaseLog(x, y) {
                return Math.log(y) / Math.log(x);
            }

            // 2 x 2 x 2 = 8
            console.log(getBaseLog(2, 8));
                // Expected output: 3

            // 5 x 5 x 5 x 5 = 625
            console.log(getBaseLog(5, 625));
            // Expected output: 4
            `}</span>
        </div>
    )
}
