
import { RefObject, useEffect, useRef } from "react"

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

export const useScrollToZoom = (blockEditorRef : RefObject<HTMLDivElement>) => {

    const scale = useRef(100);
    const mousePos = useRef({x: 0, y: 0});

    const handleZoom = (event: WheelEvent) => {
       
        scale.current = event.deltaY > 0 ? scale.current / 1.05 : scale.current * 1.05;
        blockEditorRef.current!.dispatchEvent(new CustomEvent("zoom", {detail: {deltaY: event.deltaY, scale: scale.current}}));

        // if(event.deltaY < 0)
        // {
        //     blockEditorRef.current!.scrollLeft += mousePos.current.x / (scale.current + 100 * scale.current);
        //     blockEditorRef.current!.scrollTop += mousePos.current.y * ((scale.current * 1.05 - scale.current) / 100);
        // }
        
        // if(event.deltaY < 0)
        // {
        //     if(mousePos.current.x > blockEditorRef.current!.getBoundingClientRect().width / 2){

        //         blockEditorRef.current!.scrollLeft += mousePos.current.x  * (scale.current! / 100 - 1) - mousePos.current.x * ((scale.current! / 1.05) / 100 - 1);
        //     }
        //     else{
        //         blockEditorRef.current!.scrollLeft -= mousePos.current.x * ((scale.current! / 1.05) / 100 - 1) - mousePos.current.x  * (scale.current! / 100 - 1); 
        //     }

        //     if(mousePos.current.y > blockEditorRef.current!.getBoundingClientRect().height / 2)
        //     {
        //         blockEditorRef.current!.scrollTop += mousePos.current.y  * (scale.current! / 100 - 1) - mousePos.current.y * ((scale.current! / 1.05) / 100 - 1);
        //     }
        //     else{
        //         blockEditorRef.current!.scrollTop -= mousePos.current.y * ((scale.current! / 1.05) / 100 - 1) - (mousePos.current.y  * (scale.current! / 100 - 1));
        //     }
        //     // if(mousePos.current!.x > blockEditorRef.current!.getBoundingClientRect().width / 2)
        //     // {
        //     // }
        //     // else{
        //     //     blockEditorRef.current!.scrollLeft -= (mousePos.current.x  * (scale.current! / 100 - 1)) - (mousePos.current.x) * ((scale.current! / 1.05) / 100 - 1)
        //     // }
        //     //blockEditorRef.current!.scrollTop +=  ((mousePos.current.y + blockEditorRef.current!.getBoundingClientRect().height / 2) * ((scale.current! * 1.05) / 100 - 1)) - ((mousePos.current.y + blockEditorRef.current!.getBoundingClientRect().height / 2) * (scale.current! / 100 - 1))
        // }
        // else{
        //     blockEditorRef.current!.scrollLeft += (mousePos.current.x) * ((scale.current! / 1.05) / 100 - 1) - (mousePos.current.x  * (scale.current! / 100 - 1)) 
        //     blockEditorRef.current!.scrollTop += (mousePos.current.y) * ((scale.current! / 1.05) / 100 - 1) - (mousePos.current.y  * (scale.current! / 100 - 1))
            
        // }
        
        
    }

    const handleMouseMove = (event: MouseEvent) => {
        mousePos.current = {
            x: event.clientX - blockEditorRef.current!.getBoundingClientRect().left + blockEditorRef.current!.scrollLeft,
            y: event.clientY - blockEditorRef.current!.getBoundingClientRect().top + blockEditorRef.current!.scrollTop
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

