import { blockType } from "../../../types"


export const ExitBlock = ({block}: {block: blockType}) => {
    

    return (
        <div className="w-32 h-12 bg-red-700
        rounded-lg flex justify-center items-center
        border-2 border-red-900">
            <h1 className="text-white text-lg font-semibold">Exit</h1>
        </div>
    )
}