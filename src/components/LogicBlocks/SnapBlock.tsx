import { useContext, useEffect, useRef } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { MasterBlockContext } from "../../hooks/editor";

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

        //Dependency array needs selectedBlock, because event listeners do not automatically refresh the state.
        //Every time the selected block changes, useEffect is run and all event listeners are unmounted and replaced with new ones.
        //useState is used, because useRef doesn't work for some reason.
    }, [selectedBlock])
    
    return (
        <div ref={snapRef} className="bg-green-700 w-40 h-24 py-2 rounded-lg
        flex justify-center items-center">
            <h1 className="text-white text-sm text-center px-2 py-1">Drag a block here...</h1>
        </div>
    )
}