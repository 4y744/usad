import { RefObject, useContext, useEffect, useRef } from "react"
import { BlockEditorContext, MasterBlockContext } from "./BlockEditor.tsx"
import { Vector2 } from "../../types/index.ts";

export const Cluster = ({children, startPos} : {children: any, startPos: Vector2}) => {
    
    const draggable = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    //Relative cursor offset in draggable
    const clickPos = useRef<Vector2>({x: 0, y: 0});
    
    //The current position of the draggable (with scaling).
    const currentPos = useRef<Vector2>({x: 0, y: 0});

    const masterId = useContext(MasterBlockContext);
    const {selectedBlock, scale, set, blockEditorRef, editorContainer} = useContext(BlockEditorContext);


    //Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {

        if(!dragging.current || draggable.current == null){

            return;

        }
        
        currentPos.current = {
            x: (event.pageX - blockEditorRef.current!.offsetLeft + editorContainer.current!.scrollLeft - clickPos.current.x) * (100 / scale.current!),
            y: (event.pageY - blockEditorRef.current!.offsetTop + editorContainer.current!.scrollTop - clickPos.current.y) * (100 / scale.current!)
        }

        draggable.current!.style.top = `${currentPos.current.y}px`;
        draggable.current!.style.left = `${currentPos.current.x}px`;

    }

    const handleMouseDown = (event: MouseEvent) => {

        clickPos.current = {
            x: event.clientX - draggable.current!.getBoundingClientRect().left,
            y: event.clientY - draggable.current!.getBoundingClientRect().top
        }

        dragging.current = true;
        selectedBlock.current = masterId;

        draggable.current!.style.zIndex = "10";
        draggable.current!.style.cursor = "grabbing";
        
        event.stopPropagation();
    }

    const handleMouseUp = () => {
        
        if(!dragging.current){

            return;

        }
        
        dragging.current = false;
        draggable.current!.style.zIndex = "0";
        draggable.current!.style.cursor = "grab";


        set(prev => prev.map(b => {

            if(b.id == masterId){

                b.position = currentPos.current;

            }

            return b;
        }));
    }


    //Touch event handlers
    const handleTouchMove = (event: TouchEvent) => {

        if(!dragging.current || draggable.current == null){

            return;

        }

        currentPos.current = {
            x: (event.touches[0].pageX - blockEditorRef.current!.offsetLeft + editorContainer.current!.scrollLeft - clickPos.current.x) * (100 / scale.current!),
            y: (event.touches[0].pageY - blockEditorRef.current!.offsetTop + editorContainer.current!.scrollTop - clickPos.current.y) * (100 / scale.current!)
        }
  
        draggable.current!.style.top = `${currentPos.current.y}px`;
        draggable.current!.style.left = `${currentPos.current.x}px`;

        event.stopPropagation();

        //Even with stopPropagation, it will still scroll its parent,
        //to prevent that we need preventDefault.
        event.preventDefault();
    }

    const handleTouchStart = (event: TouchEvent) => {

        clickPos.current = {
            x: event.touches[0].clientX - draggable.current!.getBoundingClientRect().left,
            y: event.touches[0].clientY - draggable.current!.getBoundingClientRect().top
        }

        dragging.current = true;
        selectedBlock.current = masterId;

        draggable.current!.style.zIndex = "10";
        
        event.stopPropagation();
    }

    const handleTouchEnd = () => {

        draggable.current!.style.zIndex = "0";
        dragging.current = false;

        set(prev => prev.map(b => {

            if(b.id == masterId){

                b.position = currentPos.current;
                
            }

            return b;
        }));
    }

    //Event handlers are mounted in useEffect to only be added once on init.
    useEffect(() => {

        draggable.current!.style.left = `${startPos.x}px`;
        draggable.current!.style.top = `${startPos.y}px`;
        
        //Mount event handlers
        blockEditorRef.current!.addEventListener("mousemove", handleMouseMove)
        draggable.current!.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        //Touch event handlers
        draggable.current!.addEventListener("touchmove", handleTouchMove);
        draggable.current!.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);


        return () => {
            //Unmount event handlers
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("touchend", handleTouchEnd);
        }

    }, [])

    return (

        <div className="absolute flex w-fit cursor-grab select-none z-0" 
        tabIndex={0}  
        ref={draggable}>

            {children}

        </div>
       
    )
}