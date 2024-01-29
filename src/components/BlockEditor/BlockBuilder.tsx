import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import { BuildBlock } from "./BuildBlock";

import { Draggable } from "./Draggable";
import { blockType } from "../../types";
import { BlockEditorContext, MasterBlockContext } from "../../contexts";

export const BlockBuilder = ({blocks, setBlocks, blockEditorRef, scale} : {blocks: blockType[], setBlocks: Dispatch<SetStateAction<blockType[]>>, blockEditorRef: RefObject<HTMLDivElement>, scale: RefObject<number>}) => {
    
    const selectedBlock = useRef("")
    const zoomMagnitude = useRef(1.05);
    
    const clusters = blocks.filter((block) => block.attached == false);

    useEffect(() => {
        localStorage.setItem("test", JSON.stringify(blocks));
    }, [blocks])

    return (
        <BlockEditorContext.Provider value={{blocks, setBlocks, selectedBlock, blockEditorRef, scale}}>
            {clusters.map((block) => (
                <MasterBlockContext.Provider key={block.id} value={block.id}>
                    <Draggable startPos={{x: block.position.x, y: block.position.y}} 
                    scale={scale} zoomMagnitude={zoomMagnitude.current}>
                        <div className="flex">
                            <BuildBlock parentId={block.id} port={0} isMaster={true}/>
                        </div>
                    </Draggable>
                </MasterBlockContext.Provider>
            ))}
        </BlockEditorContext.Provider>
    )


}