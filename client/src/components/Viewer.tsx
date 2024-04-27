import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { useSandbox } from "../hooks/shell";
import { AlgorithmType } from "../types";
import { LoadingSpinner } from "./LoadingSpinner";
import { Sandbox } from "./Sandbox";
import { useTranslation } from "react-i18next";
import { TimeFormatter } from "../utils/formatter";
import { useBlockCompiler } from "../hooks/editor";

export const Viewer = ({algorithm} : {algorithm: AlgorithmType}) => {

    const {t} = useTranslation();

    const sandboxRef = useRef<HTMLIFrameElement>(null);
    const logRef = useRef<HTMLDivElement>(null);

    const [output, setOutput] = useState<{message: string, timestamp: number}[]>([]);

    const {Compile} = useBlockCompiler();

    useEffect(() => {

        if(!logRef.current){
            return;
        }

        logRef.current!.scroll({top: 100000, behavior: 'smooth'});

    }, [output])

    useEffect(() => {

        setOutput([]);

        inputRef.current.map((inp, index) => {

            inp.variable = algorithm.inputs[index].variable;

            return inp;
        })

    }, [algorithm.id]);

    const inputRef = useRef<{variable: string, value: string | string[]}[]>([]);

    const [SendMessage, pending] = useSandbox(sandboxRef, (data: {message: string, timestamp: number}) => {

        setOutput(prev => [...prev, data]);

    })

    const handleRun = () => {

        const func = algorithm.editor == "code" ? algorithm.code : Compile(JSON.parse(algorithm.code));

        SendMessage(func, inputRef.current);

    }

    return (
        <>
        <Sandbox
        ref={sandboxRef}/>

        <div className="grid md:grid-cols-2 grid-cols-1
        bg-zinc-900 rounded-md shadow-md
        border border-zinc-700">

            <div className="
            md:border-r border-r-zinc-700">

                <div className="flex items-center px-4 py-2
                border-b border-b-zinc-700">

                    <h2 className="font-medium">{t("inputs")}</h2>

                    <button className={`bg-green-700 outline-2 outline-green-600 outline-offset-2
                    px-4 py-2 ml-auto rounded-md shadow-md
                    ${pending ? "opacity-50" : "hover:bg-green-600 active:outline"}`}
                    disabled={pending}
                    onClick={handleRun}>

                        {pending ? (
                            <LoadingSpinner/>
                        ) : (
                            <>
                            {t("run")}
                            </>
                        )}

                    </button>

                </div>

                <div className="h-[300px]">

                    {algorithm.input_type == "single" ? (

                        <SingleInput
                        algorithm={algorithm}
                        inputRef={inputRef}/>

                    ) : (

                        <MultipleInputs
                        algorithm={algorithm}
                        inputRef={inputRef}/>
                        
                    )}

                </div>

            </div>

            <div className="md:border-none border-t border-t-zinc-700">

                <div className="flex items-center px-4 py-2
                border-b border-b-zinc-700">

                    <h2 className="font-medium">{t("output-log")}</h2>

                    <button className="bg-green-700 hover:bg-green-600
                    active:outline outline-2 outline-green-600 outline-offset-2
                    px-4 py-2 ml-auto rounded-md shadow-md"
                    onClick={() => setOutput([])}>
                        {t("clear")}
                    </button>

                </div>

                <div className="flex flex-col h-[300px] overflow-y-scroll p-2"
                ref={logRef}>

                    {output.map((data, index) => (

                        <div className="flex items-center gap-1"
                        key={index}>
                            <span className="text-green-700 font-medium">
                                [{TimeFormatter.HourMinuteSecondMillisecond(data.timestamp)}]:
                            </span>

                            <span>
                                {t(data.message)}
                            </span>
                        </div>

                    ))}

                </div>

            </div>

        </div>
        </>
    )
}

const SingleInput = ({algorithm, inputRef} : {algorithm: AlgorithmType, inputRef: MutableRefObject<{variable: string, value: string | string[]}[]>}) => {

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

        inputRef.current[0] = {
            variable: algorithm.inputs[0].variable,
            value: event.target.value
            .split(/(?:,| |[\n])+/)
            .filter((str) => str !== "")
        }

    }

    return (
        <textarea className="resize-none
        bg-zinc-900 rounded-b-md p-4 w-full h-full
        focus:outline-none"
        placeholder={algorithm.inputs[0].label}
        onChange={handleChange}/>
    )
}

const MultipleInputs = ({algorithm, inputRef} : {algorithm: AlgorithmType, inputRef: MutableRefObject<{variable: string, value: string | string[]}[]>}) => {

    const handleChange = (variable: string, value: string, index: number) => {

        inputRef.current[index] = {
            variable: variable,
            value: value.split(/(?:,| |[\n])+/)
            .filter((str) => str !== "")[0]
        }

    }

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1
        gap-4 p-4">
            {algorithm.inputs?.map((inp, index) => (

                <input type="text" 
                key={index}
                placeholder={inp.label}
                onChange={(event) => handleChange(inp.variable, event.target.value, index)}
                className="bg-zinc-900 rounded-md
                focus:outline-none
                border border-zinc-700 p-2"/>

            ))}
        </div>
    )
}