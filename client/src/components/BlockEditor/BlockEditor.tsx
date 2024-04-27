import { createContext, Dispatch, MutableRefObject, RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import { AlgorithmType, BlockType } from "../../types/index.ts";
import { useDragToScroll, useScrollToZoom } from "../../hooks/editor.ts";
import { Cluster } from "./Cluster.tsx";
import { BuildBlock } from "./BuildBlock.tsx";
import { useTranslation } from "react-i18next";
type blockEditorContextType = {
    blocks: BlockType[], 
    set: (callback: (value: BlockType[]) => BlockType[]) => void,
    selectedBlock: MutableRefObject<string>,
    blockEditorRef: RefObject<HTMLDivElement>,
    editorContainer: RefObject<HTMLDivElement>,
    scale: RefObject<number>
}


export const MasterBlockContext = createContext<string>("");
export const BlockEditorContext = createContext<blockEditorContextType>({} as blockEditorContextType);
                     

export const BlockEditor = ({algorithm, reload} : {algorithm: AlgorithmType, reload: (callback: (value: AlgorithmType) => AlgorithmType) => void}) => {

    const {t} = useTranslation();

    //Contains current blocks
    const [blocks, setBlocks] = useState<BlockType[]>([]);

    useEffect(() => {

        try{

            setBlocks(JSON.parse(algorithm.code));

        }
        catch{

            setBlocks([
            {
                id: "start",
                type: "start",
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: [],
                }])

        }

    }, []);

    useEffect(() => {

        reload(prev => ({...prev, code: JSON.stringify(blocks)}));

    }, [blocks])

    const selectedBlock = useRef("")
    
    //Reference to the block editor ref ands its container
    const blockEditorRef = useRef<HTMLDivElement>(null);
    const editorContainer = useRef<HTMLDivElement>(null)

    //Enables dragto scroll
    useDragToScroll(blockEditorRef, editorContainer);

    //Allows user to scroll to zoom
    const scale = useScrollToZoom(blockEditorRef, editorContainer);

    const set = (callback: (value: BlockType[]) => BlockType[]) => {

        setBlocks(callback)

    }; 

    const selected = useRef<string>("exit");

    const handleAdd = () => {

        setBlocks([...blocks, 
        {
            id: Date.now().toString(),
            type: selected.current,
            attached: false,
            metadata: {
                values: []
            },
            position: {
                x: editorContainer.current!.scrollLeft * (scale.current / 100),
                y: editorContainer.current!.scrollTop * (scale.current / 100)
            },
            ports: [],
        }])

    }

    return (
        <>

            <div className="flex gap-2 p-2
            border-b border-b-zinc-700">

                <button className="px-2 h-8
                bg-zinc-800 rounded-md shadow-md hover:bg-zinc-700"
                onClick={handleAdd}>
                    {t("add")}
                </button>

                <select className="bg-zinc-800 rounded-md shadow-md
                hover:bg-zinc-700 px-2 h-8" id="operators"
                onChange={(event) => {selected.current = event.target.value;}} defaultValue={"exit"}>

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
                    <option value="length">
                        {t("length")}
                    </option>

                </select>
            </div>


            <div className="overflow-scroll no-scrollbar
            w-full h-[500px]"
            ref={editorContainer}>

                <div tabIndex={0} ref={blockEditorRef} className="relative 
                w-[10000px] h-[10000px] origin-top-left block-editor-bg">
                        
                    <BlockEditorContext.Provider value={{blocks, set, selectedBlock, blockEditorRef, editorContainer, scale}}>

                        {blocks
                        .filter((block) => block.attached == false)
                        .map((block) => (

                            <MasterBlockContext.Provider key={block.id} value={block.id}>

                                <Cluster startPos={{x: block.position.x, y: block.position.y}}>

                                    <BuildBlock 
                                    parentId={block.id} 
                                    port={0} 
                                    isMaster={true}/>

                                </Cluster>

                            </MasterBlockContext.Provider>

                        ))}

                    </BlockEditorContext.Provider>

                </div>

            </div>
        </>
   
    )
}
