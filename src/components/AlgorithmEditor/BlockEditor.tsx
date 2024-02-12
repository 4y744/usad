import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react"
import { algorithmDraftType, blockType } from "../../types/index.ts";
import { BlockBuilder } from "../BlockEditor/BlockBuilder.tsx";
import { useBlockCompiler, useDisableScroll, useDragToScroll, useScrollToZoom } from "../../hooks/editor.tsx";
import { useTranslation } from "react-i18next";
                     

export const BlockEditor = ({draftRef} : {draftRef: MutableRefObject<algorithmDraftType>}) => {

    const {t} = useTranslation();

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

    const [Compile] = useBlockCompiler();
    
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
                type: "variable",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                metadata: {
                    values: ["num1"]
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
                type: "for",
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["gg2"]
            },
            {
                id: "gg2",
                type: "while",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            },
            {
                id: "gg3",
                type: "set",
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            },
            {
                id: "gg4",
                type: "parse",
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            },
            {
                id: "gg5",
                type: "math",
                metadata: {
                    values: []
                },   
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            }
        ]);

        
    }, [])

    const handleCompile = () => {
        const code = Compile(blocks);
        draftRef.current.function = btoa(code);
        console.log(code);
    }

    return (
        <div className="bg-zinc-900 rounded-md shadow-md
        flex flex-col gap-5">

            <div className="bg-zinc-800 rounded-md shadow-md
            flex gap-5 p-2">
                <ScaleManager
                scale={scale}
                magnitude={0.05}
                blockEditorRef={blockEditorRef}/>

                <div className="bg-zinc-900 rounded-md shadow-md
                flex">
                    <button className="px-4 py-2
                    hover:bg-zinc-700 rounded-l-md"
                    onClick={() => blockEditorRef.current?.focus()}>
                        Focus
                    </button>

                    <button className="px-4 py-2
                    hover:bg-zinc-700 rounded-r-md"
                    onClick={() => blockEditorRef.current?.blur()}>
                        Blur
                    </button>
                </div>

                <button className="bg-green-700 rounded-md shadow-md
                active:outline outline-2 outline-green-600 outline-offset-2
                hover:bg-green-600 px-4 py-2 ml-auto"
                onClick={handleCompile}>
                    {t("compile")}
                </button>
            </div>

            <div className="w-full flex justify-center items-center">

                <div tabIndex={0} ref={blockEditorRef} className="relative 
                bg-zinc-800 rounded-md shadow-md h-[600px]
                hover:cursor-move overflow-hidden no-scrollbar">

                    <div className="w-[10000px] h-[10000px] pointer-events-none"></div>

                    <BlockBuilder 
                    blocks={blocks} 
                    setBlocks={setBlocks} 
                    blockEditorRef={blockEditorRef} 
                    scale={scale}/>

                </div>
            </div>

        </div>
        
    )
}

const ScaleManager = ({scale, magnitude, blockEditorRef} : {scale: MutableRefObject<number>, magnitude: number, blockEditorRef: RefObject<HTMLDivElement>}) => {

    //Yes, I'm that creative.
    const [scaleState, setScaleState] = useState(scale.current);


    const handleZoom = (event: CustomEvent<{deltaY: number;scale: number;}>) => {
        setScaleState(event.detail.scale);
    }

    const zoomIn = () => {
        if(scale.current > 200) return;
        scale.current =  scale.current * (magnitude + 1);
        blockEditorRef.current!.dispatchEvent(new CustomEvent("zoom", {detail: {deltaY: 100, scale: scale.current}}));
    }

    const zoomOut = () => {
        if(scale.current < 30) return;
        scale.current = scale.current / (magnitude + 1);
        blockEditorRef.current!.dispatchEvent(new CustomEvent("zoom", {detail: {deltaY: -100, scale: scale.current}}));
    }

    useEffect(() => {
        blockEditorRef.current!.addEventListener("zoom", handleZoom as EventListener);
    }, [])

    return (
        <div className="bg-zinc-900 rounded-md shadow-md
        flex justify-center items-center w-fit">
            <button className="hover:bg-zinc-700 rounded-l-md text-lg
            active:outline ouline-2 outline-green-600
            h-10 aspect-square"
            onClick={() => zoomIn()}>+</button>

            <span className="mx-2 w-16 text-center">{scaleState.toPrecision(4)}%</span>

            <button className="hover:bg-zinc-700 rounded-r-md text-lg
            active:outline ouline-2 outline-green-600
            h-10 aspect-square"
            onClick={() => zoomOut()}>-</button>
        </div>
    )
}