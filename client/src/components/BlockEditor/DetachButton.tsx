import { useContext, useEffect, useRef, useState } from "react"
import { BlockType } from "../../types/index.ts";
import { BlockEditorContext } from "../BlockEditor/BlockEditor.tsx"


export const DetachButton = ({parent, port, position}: {parent: BlockType, port: number, position: string}) => {

        const {blocks, set, blockEditorRef, scale} = useContext(BlockEditorContext);
        const [attached, setAttached] = useState(false);
        const buttonRef = useRef<HTMLButtonElement>(null)
    
        useEffect(() => {
            setAttached(blocks.find((block) => block.id == parent.ports[port]) ? true : false);

            buttonRef.current!.addEventListener("mousedown", (event: Event) => event.stopPropagation());
            buttonRef.current!.addEventListener("touchstart", (event: Event) => event.stopPropagation());

            buttonRef.current!.addEventListener("mouseup", (event: MouseEvent) => event.stopPropagation());
            buttonRef.current!.addEventListener("touchend", (event: TouchEvent) => event.stopPropagation());
            
        }, [blocks])

        const detachBlock = () => {
            if(!attached) return;

            set(prev => 
                prev.map((block) => {
                    if(block.id == parent.ports[port])
                    {
                        block.attached = false;
                        block.position.x = (buttonRef.current!.getBoundingClientRect().right - blockEditorRef.current!.getBoundingClientRect().left + blockEditorRef.current!.scrollLeft) / (scale.current! / 100);
                        block.position.y = (buttonRef.current!.getBoundingClientRect().bottom - blockEditorRef.current!.getBoundingClientRect().top + blockEditorRef.current!.scrollTop) / (scale.current! / 100);
                    }
                    return block;
                })
                .map((block) => {
                    if(block.id == parent.id)
                    {
                        block.ports[port] = "";
                    }
                    return block;
                })
            )
        }
        
        return (
            <button ref={buttonRef} className={`rounded-full h-6 w-6
            active:outline outline-2 outline-offset-1
            flex items-center justify-center z-10 text-white
            ${attached 
            ? "bg-red-700 hover:bg-red-600 outline-red-600"
            : "bg-green-600 hover:bg-green-500 outline-green-500"}
            ${position == "right" ? "absolute right-0 top-[22px] translate-x-1/2 -translate-y-1/2" : null}
            ${position == "top" ? "absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2" : null}`}
            onClick={detachBlock}>
                {attached 
                ? <i className="fa-solid fa-xmark"></i> 
                : <i className={`fa-solid fa-arrow-right
                ${position == "flex" || position == "top" ? "rotate-90" : "rotate-0"}`}></i>}
            </button>
        )
    }
