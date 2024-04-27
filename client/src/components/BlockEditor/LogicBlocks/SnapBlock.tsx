import { useContext, useEffect, useRef } from "react"
import { BlockEditorContext, MasterBlockContext } from "../BlockEditor"
import { useTranslation } from "react-i18next";

export const SnapBlock = ({parent}: {parent: {id: string, port: number}}) => {

    const {set, selectedBlock, blockEditorRef} = useContext(BlockEditorContext);
    const masterId = useContext(MasterBlockContext);

    //Used to attach event listeners
    const snapRef = useRef<HTMLDivElement>(null);

    //Checks if the cursor is in the rect bounds of the snapRef object
    const mouseOver = useRef(false);

    const {t} = useTranslation();
    
    const handleAttach = () => {

        if(!mouseOver.current || selectedBlock.current == "start" || selectedBlock.current == masterId) return;

        set(prev => prev.map((block) => {
            if(block.id == parent.id){
                block.ports[parent.port] = selectedBlock.current;
            }
            if(block.id == selectedBlock.current)
            {
                block.attached = true;
            }
            
            return block;
        }))
        
    }

    const handleMouseMove = (event: MouseEvent) => {
        if(!snapRef.current!) return mouseOver.current = false;;
        
        const snapRect = snapRef.current!.getBoundingClientRect();
 
        mouseOver.current = event.clientY > snapRect.top 
        && event.clientY < snapRect.bottom 
        && event.clientX > snapRect.left 
        && event.clientX < snapRect.right;

        mouseOver.current! ? snapRef.current!.classList.add("!rounded-none") : snapRef.current!.classList.remove("!rounded-none");
    }

    const handleTouchMove = (event: TouchEvent) => {
        if(!snapRef.current!) return mouseOver.current = false;

        const snapRect = snapRef.current!.getBoundingClientRect();

        mouseOver.current = event.touches[0].clientY > snapRect.top 
        && event.touches[0].clientY < snapRect.bottom 
        && event.touches[0].clientX > snapRect.left 
        && event.touches[0].clientX < snapRect.right;

        mouseOver.current! ? snapRef.current!.classList.add("!rounded-none") : snapRef.current!.classList.remove("!rounded-none");
    }


    useEffect(() => {
        blockEditorRef.current!.addEventListener("mouseup", handleAttach);
        blockEditorRef.current!.addEventListener("mousemove", handleMouseMove);

        blockEditorRef.current!.addEventListener("touchend", handleAttach);
        blockEditorRef.current!.addEventListener("touchmove", handleTouchMove);

        return () => {

            if(!blockEditorRef.current){
                return;
            }

            blockEditorRef.current!.removeEventListener("mouseup", handleAttach);
            blockEditorRef.current!.removeEventListener("mousemove", handleMouseMove);

            blockEditorRef.current!.removeEventListener("touchend", handleAttach);
            blockEditorRef.current!.removeEventListener("touchmove", handleTouchMove);
        }
    }, [])
    
    return (
        <div ref={snapRef} className="rounded-lg w-36 h-12
        flex justify-center items-center transition-rounded duration-100
        border-2 border-dashed border-cyan-700">
            <h1 className="text-white text-xs px-3">{t("drag-a-block-here")}</h1>
        </div>
    )
}