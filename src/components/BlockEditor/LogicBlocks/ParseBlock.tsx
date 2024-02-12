import { BuildBlock } from "../BuildBlock";
import { blockType } from "../../../types";
import { DetachButton } from "../DetachButton";

export const ParseBlock = ({block}: {block: blockType}) => {


    return (
        <>
            <div className="w-fit h-fit bg-yellow-700 relative p-2
            rounded-lg flex flex-col justify-center items-center
            border-2 border-yellow-900">
                 <h1 className="text-white text-lg font-semibold">Parse number</h1>

                 <div className="bg-yellow-600 rounded-md p-2 my-2 min-w-32
                 flex justify-center items-center relative">
                    <DetachButton parent={block} port={1} position="top"/>
                    <BuildBlock parentId={block.id} port={1}/>
                 </div>
            </div>
        </>
    )
}