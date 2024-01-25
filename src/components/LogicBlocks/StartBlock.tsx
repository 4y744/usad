import { useContext } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { blockType, useBlockBuilder } from "../../hooks/editor";
import { DetachButton } from "../DetachButton";

export const StartBlock = ({block}: {block: blockType}) => {

    const {blocks} = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);
    
    return (
        <>
            <div className="w-40 h-24 bg-zinc-900 relative
            rounded-lg flex justify-center items-center">
                <h1 className="text-white text-lg">Start</h1>
                <DetachButton id={block.id} port={0} position="right"/>
            </div>
            {BuildBlock(block.id, 0)}
        </>
    )
}