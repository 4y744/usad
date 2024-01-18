import { Draggable } from "../components/Draggable"

export const BlockEditor = () => {
    return (
        <div className="relative
        w-full h-[3000px]">
            <Draggable>
                <h1 className="w-40 h-40 bg-white">HELLO</h1>
            </Draggable>        
        </div>
    )
}