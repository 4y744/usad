import { useRef } from "react"
import { Information } from "../../components/Create/Information"
import { Inputs } from "../../components/Create/Inputs"
import { algorithmDraftType, inputType } from "../../types";
import { CodeEditor } from "../../components/Create/CodeEditor";
import { usePostAlgorithm } from "../../hooks/firestore";
import { PageWrapper } from "../../components/Layout/PageWrapper";

export const CreatePage = () => {

    const code = useRef<string>("");

    const compiledCode = useRef<string>("");

    const inputs = useRef<inputType[]>([]);
    const inputType = useRef<"box" | "field">("box");
    
    const {PostAlgorithm, loading} = usePostAlgorithm();

    const dostuff = () => {
        PostAlgorithm({
            author: "USAD",
            created: Date.now()
        } as algorithmDraftType);
    }

    const compile = () => {
        compiledCode.current = code.current;

        //Replaces the variabls with the inputs and the indexes
        inputs.current.forEach((input, index) => {
            const inputRegex = new RegExp(`\\b${input.variable}\\b`, 'gi');
            compiledCode.current = compiledCode.current.replace(inputRegex, `input[${index}]`);
        })
        const logRegex = new RegExp(`\\b${"console.log"}\\b`, 'gi');
        compiledCode.current = compiledCode.current.replace(logRegex, "postMessage")
    }

    return (
        <PageWrapper>
            
            <button onClick={() => compile()}>COMPILE</button>

            <div className="grid grid-cols-1 place-items-center
            gap-5 md:w-5/6 w-[95%]">
                <div className="bg-zinc-900 rounded-md shadow-md
                grid lg:grid-cols-2 grid-cols-1 gap-5
                p-8 w-full  ">
                    
                    <Information/>
                    <Inputs 
                    getInputs={(inp: inputType[]) => inputs.current = inp}
                    typeRef={inputType}/>
                    
                </div>

                <div className="bg-zinc-900 rounded-md shadow-md 
                p-8 w-full">
                    <CodeEditor code={code}/>
                </div>

                <button onClick={() => dostuff()}>POST</button>
            </div>
            
        </PageWrapper>
    )
}