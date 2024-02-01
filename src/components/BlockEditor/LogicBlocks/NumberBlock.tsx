import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { blockType } from "../../../types";
import { BlockEditorContext } from "../../../contexts";

export const NumberBlock = ({block}: {block: blockType}) => {

    const {setBlocks} = useContext(BlockEditorContext);
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(block.metadata?.values[0] == event.target.value) return;
        setBlocks(prev => prev.map((b) => {
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
            border-2 border-green-900
            focus-within:outline outline-2 outline-offset-2 outline-green-700">
                {block.attached ? null 
                : <i className="fa-solid fa-up-down-left-right text-white text-xl"></i>}
                <input onBlur={handleChange} ref={inputRef} type="number" placeholder="0" className="no-scrollbar 
                outline-none text-end w-16 h-8 bg-transparent placeholder-white text-white"
                defaultValue={block.metadata?.values[0]}/>
            </div>
        </>
    )
}