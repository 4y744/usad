import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react"
import { algorithmDraftType, blockType } from "../../types/index.ts";
import { BlockBuilder } from "../BlockEditor/BlockBuilder.tsx";
import { useBlockCompiler, useDisableScroll, useDragToScroll, useScrollToZoom } from "../../hooks/editor.tsx";
import { useTranslation } from "react-i18next";
                     

export const BlockEditor = ({draftRef} : {draftRef: MutableRefObject<algorithmDraftType>}) => {

    const {t} = useTranslation();

    //Contains current blocks
    const [blocks, setBlocks] = useState<blockType[]>([ {
        id: "start",
        type: "start",
        attached: false,
        position: {
            x: 0,
            y: 0
        },
        ports: ["1"]
    }]);
    
    //Reference to the block editor ref
    const blockEditorRef = useRef<HTMLDivElement>(null);
    
    //Changes scale when scroll wheel is moved
    const {scale} = useScrollToZoom(blockEditorRef, 0.05);

    //Enables dragto scroll
    useDragToScroll(blockEditorRef);

    //Disables scroll on focus
    useDisableScroll(blockEditorRef);

    const [Compile] = useBlockCompiler();

    const handleCompile = () => {
        const code = Compile(blocks);
        draftRef.current.function = btoa(code);
    }

    const selectedBlockType = useRef("exit");

    const addBlock = () => {
        setBlocks([...blocks, {
            id: Date.now().toString(),
            type: selectedBlockType.current,
            metadata: {
                values: []
            },   
            attached: false,
            position: {
                x: blockEditorRef.current!.scrollLeft,
                y: blockEditorRef.current!.scrollTop
            },
            ports: []
        }])
    }

    return (
        <div className="bg-zinc-900 rounded-md shadow-md
        flex flex-col gap-5">

            <div className="bg-zinc-800 rounded-md shadow-md
            flex flex-wrap gap-3 p-2">
                
                <ScaleManager
                scale={scale}
                magnitude={0.05}
                blockEditorRef={blockEditorRef}/>

                <div className="bg-zinc-900 rounded-md shadow-md
                flex">

                    <button className="px-4 py-2
                    hover:bg-zinc-700 rounded-l-md"
                    onClick={() => addBlock()}>
                        {t("add")}
                    </button>

                    <select className="bg-zinc-900 rounded-r-md
                    hover:bg-zinc-800 pl-2" id="operators"
                    onChange={(event) => {selectedBlockType.current = event.target.value;}} defaultValue={"exit"}>
                        <option value="exit">
                            {t("exit")}
                        </option>
                        <option value="print">
                            {t("print")}
                        </option>
                        <option value="math">
                            {t("math")}
                        </option>
                        <option value="condition">
                            {t("condition")}
                        </option>
                        <option value="comparison">
                            {t("comparison")}
                        </option>
                        <option value="for">
                            {t("for-loop")}
                        </option>
                        <option value="while">
                            {t("while-loop")}
                        </option>
                        <option value="set">
                            {t("set")}
                        </option>
                        <option value="variable">
                            {t("variable")}
                        </option>
                        <option value="number">
                            {t("number")}
                        </option>
                        <option value="string">
                            {t("string")}
                        </option>
                        <option value="parse">
                            {t("parse-number")}
                        </option>
                    </select>
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