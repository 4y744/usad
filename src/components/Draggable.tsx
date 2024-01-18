import { useEffect, useRef } from "react"

export const Draggable = ({children} : any) => {
    const draggable = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    //Relative cursor offset in draggable
    const clickPos = useRef({x: 0, y: 0});

    const handleMouseMove = (event: MouseEvent) => {
        if(!dragging.current) return;

        draggable.current!.style.left = `${event.pageX - clickPos.current.x}px`;
        draggable.current!.style.top = `${event.pageY - clickPos.current.y}px`;
    }

    const handleMouseDown = (event: MouseEvent) => {
        clickPos.current.x = event.pageX - draggable.current!.offsetLeft;
        clickPos.current.y = event.pageY - draggable.current!.offsetTop;

        dragging.current = true;
        event.stopPropagation();
    }

    const handleMouseUp = (event: MouseEvent) => {
        dragging.current = false;

        event.stopPropagation();
    }


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
        event.stopPropagation();
    }

    const handleTouchEnd = (event: TouchEvent) => {
        dragging.current = false;

        event.stopPropagation();
    }

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove)
        draggable.current!.addEventListener("mousedown", handleMouseDown);
        draggable.current!.addEventListener("mouseup", handleMouseUp);

        draggable.current!.addEventListener("touchmove", handleTouchMove);
        draggable.current!.addEventListener("touchstart", handleTouchStart);
        draggable.current!.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            draggable.current!.removeEventListener("mousedown", handleMouseDown);
            draggable.current!.removeEventListener("mouseup", handleMouseUp)
        }
    }, [])

    

    return (
        <div className="absolute overscroll-none" style={{cursor: "grab", userSelect: "none"}} ref={draggable}>
            {children}
        </div>
       
    )
}