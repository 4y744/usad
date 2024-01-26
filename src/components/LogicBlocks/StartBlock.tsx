import { useContext } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { blockType, useBlockBuilder } from "../../hooks/editor";
import { DetachButton } from "../DetachButton";

export const StartBlock = ({block}: {block: blockType}) => {

    const {blocks} = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);
    
    return (
        <>
            <div className="w-32 h-12 bg-green-700 relative
            rounded-lg flex justify-center items-center
            border-green-900 border-2">
                <h1 className="text-white text-lg font-semibold">Start</h1>
                <DetachButton parent={block} port={0} position="right"/>
            </div>
            <BuildBlock parentId={block.id} port={0}/>
        </>
    )
}