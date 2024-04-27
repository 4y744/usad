//Import React misc
import { RefObject, useEffect, useRef } from "react"

//Import types
import { BlockType } from "../types";

export const useDragToScroll = (blockEditorRef: RefObject<HTMLDivElement>, editorContainer: RefObject<HTMLDivElement>) => {

    //Refs for dragging to scroll
    const clicked = useRef(false);
    const clickPos = useRef({x: 0, y: 0});
    
    const handleMouseDown = (event: MouseEvent) => {

        clickPos.current = {
            x: event.clientX - blockEditorRef.current!.offsetLeft,
            y: event.clientY - blockEditorRef.current!.offsetTop
        }

        clicked.current = true;

    }

    const handleMouseUp = () => {

        clicked.current = false;
    }

    const handleDrag = (event: MouseEvent) => {

        if(!clicked.current) return;

        const diff = {
            x: clickPos.current.x - (event.clientX - blockEditorRef.current!.offsetLeft),
            y: clickPos.current.y - (event.clientY - blockEditorRef.current!.offsetTop)
        }

        clickPos.current = {
            x: event.clientX - blockEditorRef.current!.offsetLeft,
            y: event.clientY - blockEditorRef.current!.offsetTop
        }

        //Uses the difference from when the mouse was clicked and when it was moved to add a scroll.
        editorContainer.current!.scrollTop += diff.y;
        editorContainer.current!.scrollLeft += diff.x
    }

    useEffect(() => {
        blockEditorRef.current!.scroll({top: 0, left: 0, behavior: "smooth"})

        //Used to prevent refreshing the page on mobile devices.
        blockEditorRef.current!.addEventListener("scroll", (event: Event) => event.preventDefault());
    
        blockEditorRef.current!.addEventListener("mousedown", handleMouseDown);
        blockEditorRef.current!.addEventListener("mouseup", handleMouseUp);
        blockEditorRef.current!.addEventListener("mousemove", handleDrag)

    }, [])

}

export const useScrollToZoom = (blockEditorRef : RefObject<HTMLDivElement>, editorContainer: RefObject<HTMLDivElement>) => {

    const scale = useRef<number>(100);

    const handleZoom = (event: WheelEvent) => {

        const mousePos = {
            x: event.pageX - blockEditorRef.current!.offsetLeft + editorContainer.current!.scrollLeft,
            y: event.pageY - blockEditorRef.current!.offsetTop + editorContainer.current!.scrollTop
        }
        
        const diff = event.deltaY > 0 ? -2 : 2 ;

        scale.current += diff;
        blockEditorRef.current!.style.scale = `${scale.current}%`;

        //This could be shortened, but it's already hard to read so I will keep it like this for the sake of simplicity.
        //Keeps the point the mouse is on on the same spot, it finds how much it will shift when scale and adds that to the scroll.
        //This does not work perfectly, but it does the job and I can't be bothered to learn 15 more abstractions to do it properly.
        const offset = {
            x: mousePos.x * (scale.current / 100) - mousePos.x * ((scale.current - diff) / 100),
            y: mousePos.y * (scale.current / 100) - mousePos.y * ((scale.current - diff) / 100)
        }

        editorContainer.current!.scrollLeft += offset.x;
        editorContainer.current!.scrollTop += offset.y;

        event.preventDefault();

    }

    useEffect(() => {

        blockEditorRef.current!.addEventListener("wheel", handleZoom);

    }, [])

    return scale;
}

export const useBlockCompiler = () => {

    const blocks = useRef<BlockType[]>([]);
    
    const BuildScript = (blockId: string): string => {
        
        const block = blocks.current.find((b) => b.id == blockId);
        
        if(block == null) return ""
    
        switch(block.type){
            case "start":
                return (
                    BuildScript(block.ports[0])
                )
            case "exit":
                return (
                    ""
                )    
            case "print":
                return (
                    `postMessage(${BuildScript(block.ports[1])});\n${BuildScript(block.ports[0])}`
                )
            case "condition":
                return (
                    `if(${BuildScript(block.ports[1])}){\n${BuildScript(block.ports[2])}\n}\n${BuildScript(block.ports[0])}\nelse{\n${BuildScript(block.ports[3])}\n}\n`
                )  
            case "for":
                return (
                    `for(let i = 0; i < ${BuildScript(block.ports[1])}; i++){\n${BuildScript(block.ports[2])}\n}\n${BuildScript(block.ports[0])}`
                )    
            case "while":
                return (
                    `while(${BuildScript(block.ports[1])}){\n${BuildScript(block.ports[2])}\n}\n${BuildScript(block.ports[0])}`
                ) 
            case "comparison":
                return (
                    `${BuildScript(block.ports[0])} ${block.metadata?.values[0]} ${BuildScript(block.ports[1])}`
                )  
            case "number":
                return (
                    `${block.metadata?.values[0]}`
                )
            case "string":
                return (
                    `"${block.metadata?.values[0]}"`
                )
            case "variable":
                return (
                    `${block.metadata?.values[0]}`
                )
            case "set":
                return (
                    `${BuildScript(block.ports[1])} = ${BuildScript(block.ports[2])};\n${BuildScript(block.ports[0])}`
                )
            case "parse":
                return (
                    `parseFloat(${BuildScript(block.ports[1])})\n${BuildScript(block.ports[0])}`
                )
            case "length":
                return (
                    `${BuildScript(block.ports[1])}.length\n${BuildScript(block.ports[0])}`
                )
            case "math":
                if(block.metadata?.values[0] == "random") return (
                    `Math.floor(Math.random() * (${BuildScript(block.ports[1])} - ${BuildScript(block.ports[0])}) + ${BuildScript(block.ports[0])})`
                )
                if(block.metadata?.values[0] == "root") return (
                    `(${BuildScript(block.ports[0])} ** (1 / ${BuildScript(block.ports[1])}))`
                )
                return (
                    `(${BuildScript(block.ports[0])} ${block.metadata?.values[0]} ${BuildScript(block.ports[1])})`
                )
            default:
                return ``
        }
    }

    const Compile = (blockArray: BlockType[]) => {

        blocks.current = blockArray;

        return BuildScript("start");
        
    }

    return {Compile}
}
