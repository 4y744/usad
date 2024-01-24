import { Dispatch, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react"

import { Draggable } from "../components/Draggable"
import { useBlockBuilder, useCompiler } from "../hooks/editor.tsx"


type blockType = {
    id: string,
    parent: string,
    type: string,
    attached: boolean,
    metadata?: {
        values: string[]
    },
    ports: string[]
}
                                                            
export const BlockEditorContext = createContext<[blockType[], Dispatch<SetStateAction<blockType[]>>]>([[], ()=>{}]);

export const BlockEditor = () => {

    const [blocks, setBlocks] = useState<blockType[]>([]);
    //const {CompileToBlocks, CompileToJavaScript} = useCompiler();
    const {BlockBuilder} = useBlockBuilder(blocks);

    useEffect(() => {

        setBlocks([
            {
                id: "start",
                parent: "",
                type: "start",
                attached: false,
                ports: ["1"]
            },
            {
                id: "1",
                parent: "start",
                type: "condition",
                attached: true,
                ports: ["2", "3", "4"]
            },
            {
                id: "2",
                parent: "1",
                type: "print",
                attached: true,
                ports: ["exit"]
            },
            {
                id: "3",
                parent: "1",
                type: "comparison",
                attached: true,
                metadata: {
                    values: [">"]
                },
                ports: ["6", "7"]
            },
            {
                id: "4",
                parent: "1",
                type: "run",
                attached: true,
                ports: []
            },
            {
                id: "6",
                parent: "3",
                type: "number",
                attached: true,
                metadata: {
                    values: ["1"]
                },
                ports: []
            },
            {
                id: "7",
                parent: "3",
                type: "number",
                attached: true,
                metadata: {
                    values: ["1"]
                },
                ports: []
            },
            {
                id: "exit",
                parent: "2",
                type: "exit",
                attached: true,
                ports: []
            },
            {
                id: "de",
                parent: "",
                type: "print",
                attached: false,
                ports: ["dee"]
            },
            {
                id: "dee",
                parent: "de",
                type: "print",
                attached: true,
                ports: []
            }
        ]);
        
    }, [])

    
    return (
        <BlockEditorContext.Provider value={[blocks, setBlocks]}>
            <div className="relative
            w-full h-[3000px] overflow-x-hidden">
                {BlockBuilder()}
            </div>
        </BlockEditorContext.Provider>
    )
}