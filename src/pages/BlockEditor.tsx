import { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react"

import { Draggable } from "../components/Draggable"
import { useBlockBuilder, useCompiler } from "../hooks/editor.tsx"


type blockType = {
    id: string,
    type: string,
    attached: boolean,
    metadata?: {
        values: string[]
    },
    ports: string[]
}
                                                            
export const BlockEditorContext = createContext<
{blocks: blockType[], setBlocks: Dispatch<SetStateAction<blockType[]>>,
selectedBlock: MutableRefObject<string>}>
({blocks: [], setBlocks: () => {}, selectedBlock: {current: ""}});

export const BlockEditor = () => {

    const [blocks, setBlocks] = useState<blockType[]>([]);
    //const [selectedBlock, setSelectedBlock] = useState("");
    const selectedBlock = useRef("")
    //const {CompileToBlocks, CompileToJavaScript} = useCompiler();
    const {BlockBuilder} = useBlockBuilder(blocks);

    useEffect(() => {

        setBlocks([
            {
                id: "start",
                type: "start",
                attached: false,
                ports: ["1"]
            },
            {
                id: "1",
                type: "condition",
                attached: true,
                ports: ["2", "3", "4"]
            },
            {
                id: "2",
                type: "print",
                attached: true,
                ports: ["exit"]
            },
            {
                id: "3",
                type: "comparison",
                attached: true,
                metadata: {
                    values: [">"]
                },
                ports: ["6", "7"]
            },
            {
                id: "4",
                type: "run",
                attached: true,
                ports: []
            },
            {
                id: "6",
                type: "number",
                attached: true,
                metadata: {
                    values: ["1"]
                },
                ports: []
            },
            {
                id: "7",
                type: "number",
                attached: true,
                metadata: {
                    values: ["1"]
                },
                ports: []
            },
            {
                id: "exit",
                type: "exit",
                attached: true,
                ports: []
            },
            {
                id: "gg",
                type: "condition",
                attached: false,
                ports: ["gg2"]
            },
            {
                id: "gg2",
                type: "exit",
                attached: true,
                ports: []
            }
        ]);
        
    }, [])

    return (
        <BlockEditorContext.Provider value={{blocks, setBlocks, selectedBlock}}>
            <div className="relative
            w-full h-[3000px] overflow-x-hidden">
                {BlockBuilder()}
            </div>
        </BlockEditorContext.Provider>
    )
}