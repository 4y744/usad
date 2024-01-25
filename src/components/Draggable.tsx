import { useContext, useEffect, useRef, useState } from "react"
import { BlockEditorContext } from "../pages/BlockEditor";

export const Draggable = ({children, masterId} : {children: any, masterId: string}) => {
    const draggable = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    //Relative cursor offset in draggable
    const clickPos = useRef({x: 0, y: 0});

    const {selectedBlock} = useContext(BlockEditorContext);


    //Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {
        if(!dragging.current) return;

        draggable.current!.style.left = `${event.pageX - clickPos.current.x}px`;
        draggable.current!.style.top = `${event.pageY - clickPos.current.y}px`;

    }

    const handleMouseDown = (event: MouseEvent) => {
        clickPos.current.x = event.pageX - draggable.current!.offsetLeft;
        clickPos.current.y = event.pageY - draggable.current!.offsetTop;

        dragging.current = true;
        selectedBlock.current = masterId;
        event.stopPropagation();
    }

    const handleMouseUp = (event: MouseEvent) => {
        dragging.current = false;
    }

    //Touch event handlers
    const handleTouchMove = (event: TouchEvent) => {
        if(!dragging.current) return;

        draggable.current!.style.left = `${event.touches[0].pageX - clickPos.current.x}px`;
        draggable.current!.style.top = `${event.touches[0].pageY - clickPos.current.y}px`;
        
        event.preventDefault();
    }

    const handleTouchStart = (event: TouchEvent) => {
        clickPos.current.x = event.touches[0].pageX - draggable.current!.offsetLeft;
        clickPos.current.y = event.touches[0].pageY - draggable.current!.offsetTop;

        dragging.current = true;
        selectedBlock.current = masterId;
        
        event.stopPropagation();
    }

    const handleTouchEnd = (event: TouchEvent) => {
        dragging.current = false;
    }

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove)
        draggable.current!.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        draggable.current!.addEventListener("touchmove", handleTouchMove);
        draggable.current!.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("touchend", handleTouchEnd);
        }
    }, [])


    

    return (
        <div className="absolute" style={{cursor: "grab", userSelect: "none"}} ref={draggable}>
            {children}
        </div>
       
    )
}