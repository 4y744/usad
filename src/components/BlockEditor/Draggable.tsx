import { RefObject, useContext, useEffect, useRef } from "react"
import { BlockEditorContext, MasterBlockContext } from "../../contexts";
import { Vector2 } from "../../types";

export const Draggable = ({children, startPos, scale} : {children: any, startPos: Vector2, scale: RefObject<number>}) => {
    const draggable = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    //Relative cursor offset in draggable
    const clickPos = useRef<Vector2>({x: 0, y: 0});
    
    //The current position of the draggable (without scaling)
    const currentPos = useRef<Vector2>({x: 0, y: 0});

    const masterId = useContext(MasterBlockContext);
    const {selectedBlock, blocks, setBlocks, blockEditorRef} = useContext(BlockEditorContext);

    //Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {
        if(!dragging.current) return;

        currentPos.current = {
            x: (event.clientX - clickPos.current.x) / (scale.current! / 100),
            y: (event.clientY - clickPos.current.y) / (scale.current! / 100) 
        }

        draggable.current!.style.top = `${currentPos.current.y * (scale.current! / 100)}px`;
        draggable.current!.style.left = `${currentPos.current.x * (scale.current! / 100)}px`;

        
    }

    const handleMouseDown = (event: MouseEvent) => {

        clickPos.current = {
            x: event.clientX - draggable.current!.offsetLeft,
            y: event.clientY - draggable.current!.offsetTop
        }

        dragging.current = true;
        selectedBlock.current = masterId;

        draggable.current!.style.zIndex = "10";
        draggable.current!.style.cursor = "grabbing";
        
        event.stopPropagation();
    }

    const handleMouseUp = () => {
        
        dragging.current = false;
        draggable.current!.style.zIndex = "0";
        draggable.current!.style.cursor = "grab";

        setBlocks(blocks.map((b) => {
            if(b.id == masterId)
            {
                b.position = currentPos.current;               
            }
            return b;
        }));
    }

    //Touch event handlers
    const handleTouchMove = (event: TouchEvent) => {
        if(!dragging.current) return;

        currentPos.current! = {
            x: event.touches[0].clientX - clickPos.current.x,
            y: event.touches[0].clientY - clickPos.current.y 
        }

        draggable.current!.style.top = `${currentPos.current.y}px`;
        draggable.current!.style.left = `${currentPos.current.x}px`;
        
        event.preventDefault();
    }

    const handleTouchStart = (event: TouchEvent) => {

        clickPos.current = {
            x: event.touches[0].clientX - draggable.current!.offsetLeft,
            y: event.touches[0].clientY - draggable.current!.offsetTop
        }

        dragging.current = true;
        selectedBlock.current = masterId;
        
        draggable.current!.style.zIndex = "10";

        event.stopPropagation();
    }

    const handleTouchEnd = () => {
        draggable.current!.style.zIndex = "0";
        dragging.current = false;

        setBlocks(blocks.map((b) => {
            if(b.id == masterId)
            {
                b.position = currentPos.current;               
            }
            return b;
        }));
    }

    const handleZoom = (event: CustomEvent<{deltaY: number, scale: number}>) => {
        if(!draggable.current) return;
        
        draggable.current!.style.scale = `${event.detail.scale}%`
        
        if(event.detail.deltaY > 0){
            draggable.current!.style.left = `${currentPos.current.x * (event.detail.scale / 100)}px`;
            draggable.current!.style.top = `${currentPos.current.y * (event.detail.scale / 100)}px`;
        }
        else{
            draggable.current!.style.left = `${currentPos.current.x * (event.detail.scale / 100)}px`;
            draggable.current!.style.top = `${currentPos.current.y * (event.detail.scale / 100)}px`;
        }
        
    }

    useEffect(() => {
        draggable.current!.style.top = `${startPos.y * (scale.current! / 100)}px`;
        draggable.current!.style.left = `${startPos.x * (scale.current! / 100)}px`;

        currentPos.current.x = startPos.x;
        currentPos.current.y = startPos.y;

        draggable.current!.style.scale = `${scale.current!}%`

        document.addEventListener("mousemove", handleMouseMove)
        draggable.current!.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        
        draggable.current!.addEventListener("touchmove", handleTouchMove);
        draggable.current!.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);
        
        blockEditorRef.current!.addEventListener("zoom", handleZoom as EventListener);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("touchend", handleTouchEnd);
        }
    }, [])


    

    return (
        <div className="absolute" tabIndex={0} style={{cursor: "grab", userSelect: "none", zIndex: "0", transformOrigin: "0 0"}} ref={draggable}>
            {children}
        </div>
       
    )
}