import { useEffect, useRef, useState } from "react"
import { blockType } from "../../types/index.ts";
import { BlockBuilder } from "../../components/BlockEditor/BlockBuilder.tsx";
import { useDisableScroll, useDragToScroll, useScrollToZoom } from "../../hooks/editor.tsx";
                     

export const BlockEditor = () => {

    //Contains current blocks
    const [blocks, setBlocks] = useState<blockType[]>([]);
    
    //Reference to the block editor ref
    const blockEditorRef = useRef<HTMLDivElement>(null);
    
    //Changes scale when scroll wheel is moved
    const {scale} = useScrollToZoom(blockEditorRef, 0.05);

    //Enables dragto scroll
    useDragToScroll(blockEditorRef);

    //Disables scroll on focus
    useDisableScroll(blockEditorRef);
    
    //Temp way to set the blocks
    useEffect(() => {
        
        setBlocks([
            {
                id: "start",
                type: "start",
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["1"]
            },
            {
                id: "1",
                type: "condition",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["2", "3", ""]
            },
            {
                id: "2",
                type: "print",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["exit"]
            },
            {
                id: "3",
                type: "comparison",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                metadata: {
                    values: [">"]
                },
                ports: ["6", "7"]
            },
            {
                id: "4",
                type: "run",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            },
            {
                id: "6",
                type: "number",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                metadata: {
                    values: ["1"]
                },
                ports: []
            },
            {
                id: "7",
                type: "number",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                metadata: {
                    values: ["1"]
                },
                ports: []
            },
            {
                id: "exit",
                type: "exit",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            },
            {
                id: "gg",
                type: "condition",
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["gg2"]
            },
            {
                id: "gg2",
                type: "exit",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            }
        ]);

        
    }, [])

    return (
        <div className="w-full flex justify-center items-center my-8">
                <div tabIndex={0} ref={blockEditorRef} className="relative w-5/6 h-[80vh] 
                bg-zinc-800 hover:cursor-move overflow-hidden
                border-8 border-zinc-900
                no-scrollbar">
                    <div className="w-[10000px] h-[10000px] pointer-events-none"></div>
                    <BlockBuilder 
                        blocks={blocks} 
                        setBlocks={setBlocks} 
                        blockEditorRef={blockEditorRef} 
                        scale={scale}/>
                </div>
        </div>
        
    )
}