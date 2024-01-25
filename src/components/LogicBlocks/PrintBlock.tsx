import { useContext } from "react";
import { blockType, useBlockBuilder } from "../../hooks/editor"
import { BlockEditorContext } from "../../pages/BlockEditor";
import { DetachButton } from "../DetachButton";

export const PrintBlock = ({block}: {block: blockType}) => {

    const {blocks, setBlocks} = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);

    return (
        <>
            <div className="w-fit h-fit bg-zinc-900 relative p-4
            rounded-lg flex flex-col justify-center items-center">
                 <h1 className="text-white text-xl">Print</h1>
                 {BuildBlock(block.id, 1)}
                 <DetachButton id={block.id} port={0} position="right"/>
            </div>
            {BuildBlock(block.id, 0)}
        </>
    )
}