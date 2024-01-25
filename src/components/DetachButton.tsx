import { useContext, useEffect, useRef, useState } from "react";
import { BlockEditorContext } from "../pages/BlockEditor";

export const DetachButton = ({id, port, position}: {id: string, port: number, position: string}) => {

    const {blocks, setBlocks} = useContext(BlockEditorContext);
    const [attached, setAttached] = useState(false);

    useEffect(() => {
        const parent = blocks.find((block) => block.id == id);
        setAttached(blocks.find((block) => block.id == parent?.ports[port]) ? true : false);
    }, [blocks])
    
    const detachBlock = () => {
        setBlocks(blocks
            .map((block) => {
                if(block.id == blocks.find((block) => block.id == id)!.ports[port])
                {
                    block.attached = false;
                }
                return block;
            })
            .map((block) => {
                if(block.id == id)
                {
                    block.ports[port] = "";
                }
                return block;
        }))
        
    }
    
    return (
        <button className={`aspect-square rounded-lg
        active:outline outline-2 outline-offset-2
        ${attached 
        ? "bg-green-600 hover:bg-green-500 outline-green-500" 
        : "bg-red-700 hover:bg-red-600 outline-red-600"}
        ${position == "right" ? "absolute h-12 w-3 right-0 top-1/2 -translate-y-1/2" : null}
        ${position == "flex" ? "h-3 w-12 my-2" : null}`}
        onClick={detachBlock}></button>
    )
}