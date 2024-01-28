import { StartBlock } from "../components/BlockEditor/LogicBlocks/StartBlock.tsx"
import { ExitBlock } from "../components/BlockEditor/LogicBlocks/ExitBlock.tsx"
import { PrintBlock } from "../components/BlockEditor/LogicBlocks/PrintBlock.tsx"
import { ConditionalBlock } from "../components/BlockEditor/LogicBlocks/ConditionalBlock.tsx"
import { ComparisonBlock } from "../components/BlockEditor/LogicBlocks/ComparisonBlock.tsx.tsx"
import { SnapBlock } from "../components/BlockEditor/LogicBlocks/SnapBlock.tsx"
import { RefObject, useContext, useEffect, useRef } from "react"
import { NumberBlock } from "../components/BlockEditor/LogicBlocks/NumberBlock.tsx"
import { BlockEditorContext } from "../contexts/index.ts"

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


export const BuildBlock = ({parentId, port, isMaster,} : {parentId: string, port: number, isMaster?: boolean}) => {
    

    const {blocks} = useContext(BlockEditorContext);

    const parentBlock = blocks.find((parent) => parent.id == parentId);
    const block = blocks.find((block) => block.id == (isMaster ? parentId : parentBlock?.ports[port]));

    if(block == null) return (
        <SnapBlock parent={{id: parentId, port}}/>
    )

    switch(block.type){
        case "start": return <StartBlock block={block}/> 
        case "exit": return <ExitBlock block={block}/> 
        case "print": return <PrintBlock block={block}/>
        case "condition": return <ConditionalBlock block={block}/>  
        case "comparison": return <ComparisonBlock block={block}/>
        case "number": return <NumberBlock block={block}/> 
        default: return <SnapBlock parent={{id: parentId, port}}/>
    }
}


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

    const handleZoom = (event: WheelEvent) => {
       
        scale.current = event.deltaY > 0 ? scale.current / 1.05 : scale.current * 1.05;
        blockEditorRef.current!.dispatchEvent(new CustomEvent("zoom", {detail: {deltaY: event.deltaY, scale: scale.current}}));
    }

    useEffect(() => {
        blockEditorRef.current!.addEventListener("wheel", handleZoom);
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

