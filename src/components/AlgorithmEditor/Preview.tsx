import { MutableRefObject, useEffect, useRef, useState } from "react";
import { algorithmDraftType } from "../../types"
import { useSandbox } from "../../hooks/shell";
import { AlgorithmInput } from "../AlgorithmViewer/AlgorithmInput";
import { OutputLog } from "../AlgorithmViewer/OutputLog";
import { Sandbox } from "../Sandbox";

export const Preview = ({draftRef} : {draftRef: MutableRefObject<algorithmDraftType>}) => {

    const [renderedAlgorithm, setRenderedAlgorithm] = useState<algorithmDraftType>({} as algorithmDraftType);

    const input = useRef<Array<{variable: string, content: string}>>([]);
    const [output, setOutput] = useState<Array<{message: string, timestamp: string}>>([]);

    const sandboxRef = useRef<HTMLIFrameElement>(null);
    const {sendMessage, onMessage, pending} = useSandbox(sandboxRef);

    useEffect(() => {
        onMessage((data) => setOutput([...output, data]))
    }, [output])

    const handleRun = () => {
        sendMessage(draftRef.current, input.current);
    }


    return (
        
        <>
            <div className="bg-zinc-800 rounded-md shadow-md
            flex items-center mb-4 p-2">
                
                <h1 className="text-xl font-semibold">Preview</h1>

                <button className="bg-green-700 rounded-md shadow-md
                hover:bg-green-600
                active:outline outline-2 outline-green-600 outline-offset-2
                px-4 py-2 ml-auto"
                onClick={() => {}}>Reload</button>

            </div>

            <div>
                <div className="grid grid-cols-2
                gap-5 auto-cols-max">
                    <Sandbox ref={sandboxRef}/>

                    <div className="bg-zinc-800 rounded-md shadow-md
                    p-4">
                        <AlgorithmInput
                        algorithm={renderedAlgorithm}
                        inputRef={input}
                        status={pending}
                        handleRun={handleRun}/>
                    </div>

                    <div className="bg-zinc-800 rounded-md shadow-md
                    p-4">
                        <OutputLog
                        logs={output}
                        clearLogs={() => setOutput([])}/>
                    </div>
                </div>
            </div>
        </>
        
    )
}