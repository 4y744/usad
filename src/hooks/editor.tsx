
import { RefObject, useEffect, useRef } from "react"
import { Vector2 } from "../types";

// const BuildScript = (blockId: string, blocks: any): string => {
        
//     const block = blocks[blockId];
    
//     if(block == null) return ""

//     switch(block.type){
//         case "start":
//             return (
//                 BuildScript(block.ports.next, blocks)
//             )
//         case "exit":
//             return (
//                 ""
//             )    
//         case "print":
//             return (
//                 `console.log("Hello World!");\n${BuildScript(block.ports.next, blocks)}`
//             )
//         case "condition":
//             return (
//                 `if(${BuildScript(block.ports.condition, blocks)}){\n${BuildScript(block.ports.run, blocks)}\n}\n${BuildScript(block.ports.next, blocks)}`
//             )            
//         case "comparison":
//             return (
//                 `${BuildScript(block.ports.first, blocks)} ${block.metadata.comparator} ${BuildScript(block.ports.second, blocks)}`
//             )  
//         case "number":
//             return (
//                 `${block.metadata.number}`
//             )
//         default:
//             return ``
//     }
// }





export const useDragToScroll = (blockEditorRef: RefObject<HTMLDivElement>) => {

    //Refs for dragging to scroll
    const mouseDown = useRef(false);
    const dragPos = useRef({ scrollTop: 0, scrollLeft: 0, x: 0, y: 0 });
    

    const handleMouseDown = (event: MouseEvent) => {

        dragPos.current = {
            //Get the current scroll
            scrollLeft: blockEditorRef.current!.scrollLeft,
            scrollTop: blockEditorRef.current!.scrollTop,
            //Get the current mouse position
            x: event.clientX,
            y: event.clientY,
        };
        mouseDown.current = true;

    }

    const handleMouseUp = () => {

        mouseDown.current = false;
    }

    const handleDrag = (event: MouseEvent) => {

        if(!mouseDown.current) return;
    
        //Uses the old scroll and the difference in mouse position to scroll the document
        blockEditorRef.current!.scrollTop = dragPos.current.scrollTop - (event.clientY - dragPos.current.y);
        blockEditorRef.current!.scrollLeft = dragPos.current.scrollLeft - (event.clientX - dragPos.current.x);
    }

    const handleTouchStart = (event: TouchEvent) => {

        dragPos.current = {
            //Get the current scroll
            scrollLeft: blockEditorRef.current!.scrollLeft,
            scrollTop: blockEditorRef.current!.scrollTop,
            //Get the current touch position
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        };
        mouseDown.current = true;

    }

    const handleTouchEnd = () => {
        mouseDown.current = false;
    }

    const handleTouchMove = (event: TouchEvent) => {
        if(!mouseDown.current) return;
    
        //Uses the old scroll and the difference in mouse position to scroll the document
        blockEditorRef.current!.scrollTop = dragPos.current.scrollTop - (event.touches[0].clientY - dragPos.current.y);
        blockEditorRef.current!.scrollLeft = dragPos.current.scrollLeft - (event.touches[0].clientX - dragPos.current.x);
    }


    useEffect(() => {
        blockEditorRef.current!.scroll({top: 0, left: 0, behavior: "smooth"})

        blockEditorRef.current!.addEventListener("mousedown", handleMouseDown);
        blockEditorRef.current!.addEventListener("mouseup", handleMouseUp);
        blockEditorRef.current!.addEventListener("mousemove", handleDrag)

        blockEditorRef.current!.addEventListener("scroll", (event: Event) => event.preventDefault());

        blockEditorRef.current!.addEventListener("touchstart", handleTouchStart);
        blockEditorRef.current!.addEventListener("touchend", handleTouchEnd);
        blockEditorRef.current!.addEventListener("touchmove", handleTouchMove)
    }, [])

    
}

export const useScrollToZoom = (blockEditorRef : RefObject<HTMLDivElement>, magnitude: number) => {

    const scale = useRef(100);
    
    const mousePos = useRef<Vector2>({x: 0, y: 0});

    const handleZoom = (event: WheelEvent) => {
       
        scale.current = event.deltaY > 0 ? scale.current / (magnitude + 1) : scale.current * (magnitude + 1);
        blockEditorRef.current!.dispatchEvent(new CustomEvent("zoom", {detail: {deltaY: event.deltaY, scale: scale.current}}));
        
        //I've tried to many things to get the correct behavior, but I just can't do it.
        //Should of course be possible, but for now I will leave it at this.
        if(event.deltaY < 0)
        {
            blockEditorRef.current!.scrollLeft += mousePos.current.x * magnitude;
            blockEditorRef.current!.scrollTop += mousePos.current.y * magnitude;
        }
        else{
            blockEditorRef.current!.scrollLeft -= mousePos.current.x * magnitude;
            blockEditorRef.current!.scrollTop -= mousePos.current.y * magnitude;
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        mousePos.current = {
            x: event.clientX + blockEditorRef.current!.scrollLeft,
            y: event.clientY + blockEditorRef.current!.scrollTop
        }
    }

    useEffect(() => {
        blockEditorRef.current!.addEventListener("wheel", handleZoom);
        blockEditorRef.current!.addEventListener("mousemove", handleMouseMove);
    }, [])

    return {scale}
}

export const useDisableScroll = (blockEditorRef: RefObject<HTMLElement>) => {
    
    const handleEditorFocus = () => {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.height = "100%";
    }

    const handleEditorBlur = () => {
        document.documentElement.style.overflow = "auto";
        document.documentElement.style.height = "auto";
    }
    useEffect(() => {
        blockEditorRef.current!.addEventListener("focusin", handleEditorFocus);
        blockEditorRef.current!.addEventListener("focusout", handleEditorBlur);
    })
}

