import { BuildBlock } from "../../../hooks/editor"
import { blockType } from "../../../types";
import { DetachButton } from "../../DetachButton";

export const PrintBlock = ({block}: {block: blockType}) => {


    return (
        <>
            <div className="w-fit h-fit bg-zinc-900 relative p-4
            rounded-lg flex flex-col justify-center items-center">
                 <h1 className="text-white text-xl">Print</h1>
                 <BuildBlock parentId={block.id} port={1}/>
                 <DetachButton parent={block} port={0} position="right"/>
            </div>
            <BuildBlock parentId={block.id} port={0}/>
        </>
    )
}