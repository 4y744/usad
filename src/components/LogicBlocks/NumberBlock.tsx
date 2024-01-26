import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { blockType, useBlockBuilder } from "../../hooks/editor"
import { DetachButton } from "../DetachButton"
import { BlockEditorContext } from "../../pages/BlockEditor";

export const NumberBlock = ({block}: {block: blockType}) => {

    const {blocks, setBlocks} = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(block.metadata?.values[0] == event.target.value) return;
        setBlocks(blocks.map((b) => {
            if(b.id == block.id) b.metadata!.values[0] = event.target.value;
            return b;
        }))
    }

    useEffect(() => {
        inputRef.current!.onmousemove = (event: MouseEvent) => event.stopPropagation();
    }, [])
    
    return (

        <>
            <div className="w-fit h-12 bg-green-700 rounded-lg
            flex justify-center items-center px-2
            focus-within:outline outline-2 outline-offset-2 outline-green-700">
                <input onBlur={handleChange} ref={inputRef} type="number" placeholder="0" className="no-scrollbar 
                outline-none text-end w-16 h-4 bg-transparent placeholder-white text-white"
                defaultValue={block.metadata?.values[0]}/>
            </div>
        </>
    )
}