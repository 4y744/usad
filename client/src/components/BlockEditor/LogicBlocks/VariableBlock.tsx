import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { BlockType } from "../../../types";
import { BlockEditorContext } from "../BlockEditor"
import { RemoveButton } from "../RemoveButton";
import { useTranslation } from "react-i18next";

export const VariableBlock = ({block}: {block: BlockType}) => {

    const {set} = useContext(BlockEditorContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const {t} = useTranslation();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(block.metadata?.values[0] == event.target.value) return;
        set(prev => prev.map((b) => {
            if(b.id == block.id) b.metadata!.values[0] = event.target.value;
            return b;
        }))
    }

    useEffect(() => {
        inputRef.current!.onmousemove = (event: MouseEvent) => event.stopPropagation();
    }, [])
    
    return (

        <>
            <div className="w-52 h-fit bg-sky-700 rounded-lg
            flex flex-col p-2
            border-2 border-sky-900 relative
            focus-within:outline outline-2 outline-offset-2 outline-sky-700">
                <RemoveButton blockId={block.id}/>
                
                <h1 className="text-lg font-semibold text-center">{t("variable")}</h1>

                <input onBlur={handleChange} 
                ref={inputRef} 
                type="text"
                placeholder="" 
                onChange={handleChange}
                className="no-scrollbar 
                outline-none text-end w-full h-12 bg-transparent placeholder-white text-white
                border-2 border-sky-800 rounded-md pr-2"
                defaultValue={block.metadata?.values[0]}/>
            </div>
        </>
    )
}