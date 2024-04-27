import { useContext, useRef } from "react"
import { BlockEditorContext } from "../BlockEditor/BlockEditor.tsx"

export const RemoveButton = ({blockId} : {blockId: string}) => {

    const {blocks, set, blockEditorRef, scale} = useContext(BlockEditorContext);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const deleteBlock = () => {
        const block = blocks.find((b) => b.id == blockId);
        
        set(prev => prev.map((b) => {
            if(block!.ports[0] == b.id)
            {
                b.attached = false;
                b.position = {
                    x: (buttonRef.current!.getBoundingClientRect().right - blockEditorRef.current!.getBoundingClientRect().left + blockEditorRef.current!.scrollLeft) / (scale.current! / 100),
                    y: (buttonRef.current!.getBoundingClientRect().bottom - blockEditorRef.current!.getBoundingClientRect().top + blockEditorRef.current!.scrollTop) / (scale.current! / 100)
                }
            }

            return b;
        }))

        set(prev => prev.filter((b) => b.id != blockId))
    }
    
    return (
        <button className="bg-red-700 hover:bg-red-600
        active:outline outline-2 outline-red-600 outline-offset-2
        h-6 w-6 text-sm rounded-md
        absolute top-2 left-3"
        ref={buttonRef}
        onClick={deleteBlock}>
            <i className="fa-solid fa-trash"></i>
        </button>
    )
}