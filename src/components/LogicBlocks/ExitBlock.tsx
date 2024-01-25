import { blockType } from "../../hooks/editor"

export const ExitBlock = ({block}: {block: blockType}) => {
    
    return (

        <div className="w-40 h-24 bg-zinc-900 relative
        rounded-lg flex justify-center items-center">
            <h1 className="text-white text-lg">Exit</h1>
        </div>
    )
}