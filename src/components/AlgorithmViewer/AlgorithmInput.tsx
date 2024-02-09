import { ChangeEvent, MutableRefObject, useContext } from "react";
import { InputContext } from "../../contexts";
import { algorithmDraftType } from "../../types";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

export const AlgorithmInput = ({algorithm, inputRef, status, handleRun} : {algorithm: algorithmDraftType, inputRef: MutableRefObject<{variable: string, content: string}[]>, status: boolean, handleRun: () => void}) => {
;
    return (
        <InputContext.Provider value={inputRef}>

            <div className='flex items-center mb-2'>
                <h1 className='text-xl font-semibold'>Inputs</h1>
                <button
                onClick={handleRun}
                className={`bg-green-700
                outline-2 outline-green-600 outline-offset-2
                px-4 py-2 ml-auto rounded-md shadow-md
                ${status ?  "opacity-50" : "opacity-100 hover:bg-green-600 active:outline"}`}
                disabled={status}>
                {status ? <LoadingSpinner/> : <>Run</>}
                </button>
            </div>

            {algorithm.input_type == "multiple" ? 
            <InputBoxContainer inputs={algorithm.inputs || [{variable: "", label:"[not available]"}]} /> :
            <InputField inputs= {algorithm.inputs || [{variable: "", label:"[not available]"}]}/>}
            
        </InputContext.Provider>
    )
}

export const InputField = ({inputs} : {inputs: Array<{variable: string, label: string}>}) => {

    const inputRef = useContext(InputContext);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const userInput = event.target.value.split(/(?:,| |[\n])+/)
        .filter((str) => str !== "").join(",");
        inputRef.current[0] = {variable: inputs[0].variable, content: userInput}
    }

    return (
        <textarea
        onChange={handleChange}
        placeholder={inputs[0].label}
        className='bg-zinc-900 resize-none
        p-2 rounded-md shadow-md h-36 w-full
        focus:outline outline-2 outline-green-600 outline-offset-2'/>
    )
}

export const InputBoxContainer = ({inputs} : {inputs: Array<{variable: string, label: string}>}) => {

    return (
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-5
        w-full'>
            {inputs.map((input, key) => (
                <InputBox placeholder={input.label} variable={input.variable} index={key} key={key}/>
            ))}           
        </div>
    )
}


const InputBox = ({placeholder, variable, index} : {placeholder: string, variable: string, index: number}) => {

    const inputRef = useContext(InputContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const userInput = event.target.value.split(/(?:,| |[\n])+/)
        .filter((str) => str !== "")[0];
        inputRef.current[index] = {variable: variable, content: userInput}
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