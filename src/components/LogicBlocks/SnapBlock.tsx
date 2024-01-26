import { useContext, useEffect, useRef, useState } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { MasterBlockContext } from "../../hooks/editor";
import { start } from "@popperjs/core";

export const SnapBlock = ({parent}: {parent: {id: string, port: number}}) => {

    const {blocks, setBlocks, selectedBlock} = useContext(BlockEditorContext);
    const masterId = useContext(MasterBlockContext);

    //Used to attach event listeners
    const snapRef = useRef<HTMLDivElement>(null);

    //Checks if the cursor is in the rect bounds of the snapRef object
    const mouseOver = useRef(false);
    
    const handleAttach = (event: MouseEvent | TouchEvent) => {

        if(!mouseOver.current || selectedBlock.current == "start" || selectedBlock.current == masterId) return;

        setBlocks(blocks.map((block) => {
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
        const snapRect = snapRef.current!.getBoundingClientRect();

        mouseOver.current = event.pageY > snapRect.top 
        && event.pageY < snapRect.bottom 
        && event.pageX > snapRect.left 
        && event.pageX < snapRect.right;

        mouseOver.current! ? snapRef.current!.classList.add("!rounded-none") : snapRef.current!.classList.remove("!rounded-none")
    }

    const handleTouchMove = (event: TouchEvent) => {
        const snapRect = snapRef.current!.getBoundingClientRect();

        mouseOver.current = event.touches[0].pageY > snapRect.top 
        && event.touches[0].pageY < snapRect.bottom 
        && event.touches[0].pageX > snapRect.left 
        && event.touches[0].pageX < snapRect.right;
    }


    useEffect(() => {
        document.addEventListener("mouseup", handleAttach)
        document.addEventListener("mousemove", handleMouseMove)

        document.addEventListener("touchend", handleAttach)
        document.addEventListener("touchmove", handleTouchMove)
        
        return () => {
            //Event listeners mounted to elements are automatically removed when the component unmounts
            document.removeEventListener("mouseup", handleAttach)
            document.removeEventListener("mousemove", handleMouseMove)

            document.removeEventListener("touchend", handleAttach)
            document.removeEventListener("touchmove", handleTouchMove)
        }

    }, [])
    
    return (
        <div ref={snapRef} className="rounded-lg min-h-12
        flex justify-center items-center transition-rounded duration-100
        border-2 border-dashed border-cyan-700">
            <h1 className="text-white text-xs px-3">Drag a block here...</h1>
        </div>
    )
}