import { useEffect, useRef, useState } from "react";
import { algorithmDraftType } from "../../types"
import { InputContext } from "../../contexts";
import { useSandbox } from "../../hooks/shell";
import { AlgorithmInput } from "../AlgorithmViewer/AlgorithmInput";
import { OutputLog } from "../AlgorithmViewer/OutputLog";
import { Sandbox } from "../Sandbox";

export const Preview = ({algorithmDraft} : {algorithmDraft: algorithmDraftType}) => {

    const input = useRef<Array<{variable: string, content: string}>>([]);
    const [output, setOutput] = useState<Array<{message: string, timestamp: string}>>([]);

    const sandboxRef = useRef<HTMLIFrameElement>(null);
    const {sendMessage, onMessage, pending} = useSandbox(sandboxRef);

    useEffect(() => {
        onMessage((data) => setOutput([...output, data]))
    }, [output])

    const handleRun = () => {
        sendMessage(algorithmDraft, input.current);
    }

    return (
        
        <>
            <div>
                <h1 className="text-lg font-semibold mb-2">Preview</h1>
                <button className="bg-green-600">Reload</button>
            </div>
            <div>
                <div className="grid grid-cols-2
                gap-5 auto-cols-max">
                    <Sandbox ref={sandboxRef}/>

                    <div className="bg-zinc-800 rounded-md shadow-md
                    p-4">
                        <AlgorithmInput
                        algorithm={algorithmDraft}
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