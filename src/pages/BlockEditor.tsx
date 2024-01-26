import { Dispatch, MutableRefObject, RefObject, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react"

import { Draggable } from "../components/Draggable"
import { useBlockBuilder, useCompiler } from "../hooks/editor.tsx"


type blockType = {
    id: string,
    type: string,
    attached: boolean,
    position: {
        x: number,
        y: number
    }
    metadata?: {
        values: string[]
    },
    ports: string[]
}
                                                            
export const BlockEditorContext = createContext<
{blocks: blockType[], setBlocks: Dispatch<SetStateAction<blockType[]>>,
selectedBlock: MutableRefObject<string>, blockEditorRef: RefObject<HTMLDivElement>}>
({blocks: [], setBlocks: () => {}, selectedBlock: {current: ""}, blockEditorRef: {current: null}});

export const BlockEditor = () => {

    const [blocks, setBlocks] = useState<blockType[]>([]);
    //const [selectedBlock, setSelectedBlock] = useState("");
    const selectedBlock = useRef("")
    //const {CompileToBlocks, CompileToJavaScript} = useCompiler();
    const {BlockBuilder} = useBlockBuilder(blocks);

    const blockEditorRef = useRef<HTMLDivElement>(null);
    const mouseDown = useRef(false);
    const pos = useRef({ top: 0, left: 0, x: 0, y: 0 })



    useEffect(() => {

        setBlocks([
            {
                id: "start",
                type: "start",
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["1"]
            },
            {
                id: "1",
                type: "condition",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["2", "3", ""]
            },
            {
                id: "2",
                type: "print",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["exit"]
            },
            {
                id: "3",
                type: "comparison",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                metadata: {
                    values: [">"]
                },
                ports: ["6", "7"]
            },
            {
                id: "4",
                type: "run",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            },
            {
                id: "6",
                type: "number",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                metadata: {
                    values: ["1"]
                },
                ports: []
            },
            {
                id: "7",
                type: "number",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                metadata: {
                    values: ["1"]
                },
                ports: []
            },
            {
                id: "exit",
                type: "exit",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            },
            {
                id: "gg",
                type: "condition",
                attached: false,
                position: {
                    x: 0,
                    y: 0
                },
                ports: ["gg2"]
            },
            {
                id: "gg2",
                type: "exit",
                attached: true,
                position: {
                    x: 0,
                    y: 0
                },
                ports: []
            }
        ]);

        blockEditorRef.current!.scroll({top: 0, left: 0, behavior: "smooth"})

        blockEditorRef.current!.addEventListener("mousedown", handleMouseDown);
        blockEditorRef.current!.addEventListener("mouseup", handleMouseUp);
        blockEditorRef.current!.addEventListener("mousemove", handleDrag)

        blockEditorRef.current!.addEventListener("scroll", (event: Event) => event.preventDefault())

        blockEditorRef.current!.addEventListener("touchstart", handleTouchStart);
        blockEditorRef.current!.addEventListener("touchend", handleTouchEnd);
        blockEditorRef.current!.addEventListener("touchmove", handleTouchMove)
        
    }, [])

    const handleMouseDown = (event: MouseEvent) => {

         pos.current = {
            // The current scroll
            left: blockEditorRef.current!.scrollLeft,
            top: blockEditorRef.current!.scrollTop,
            // Get the current mouse position
            x: event.clientX,
            y: event.clientY,
        };
        mouseDown.current = true;

    }

    const handleMouseUp = (event: MouseEvent) => {

        mouseDown.current = false;
    }

    const handleDrag = (event: MouseEvent) => {
        if(!mouseDown.current) return;
    
        //Uses the old scroll and the difference in mouse position to scroll the document
        blockEditorRef.current!.scrollTop = pos.current.top - (event.clientY - pos.current.y);
        blockEditorRef.current!.scrollLeft = pos.current.left - (event.clientX - pos.current.x);
    }

    const handleTouchStart = (event: TouchEvent) => {

        pos.current = {
           // The current scroll
           left: blockEditorRef.current!.scrollLeft,
           top: blockEditorRef.current!.scrollTop,
           // Get the current mouse position
           x: event.touches[0].clientX,
           y: event.touches[0].clientY,
       };
       mouseDown.current = true;

   }

   const handleTouchEnd = (event: TouchEvent) => {
       mouseDown.current = false;
   }

   const handleTouchMove = (event: TouchEvent) => {
       if(!mouseDown.current) return;
   
       //Uses the old scroll and the difference in mouse position to scroll the document
       blockEditorRef.current!.scrollTop = pos.current.top - (event.touches[0].clientY - pos.current.y);
       blockEditorRef.current!.scrollLeft = pos.current.left - (event.touches[0].clientX - pos.current.x);
   }

    return (
        <div className="w-full flex justify-center items-center my-8">
            <BlockEditorContext.Provider value={{blocks, setBlocks, selectedBlock, blockEditorRef}}>
                <div ref={blockEditorRef} className="relative w-5/6 h-[80vh] 
                bg-zinc-800 hover:cursor-move overflow-scroll
                border-8 border-zinc-900
                no-scrollbar">
                    <div className="w-[3000px] h-[3000px] pointer-events-none"></div>
                    {BlockBuilder()}
                </div>
            </BlockEditorContext.Provider>
        </div>
        
    )
}