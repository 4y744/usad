import { useContext } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { blockType, useBlockBuilder } from "../../hooks/editor";
import { DetachButton } from "../DetachButton";

export const ConditionalBlock = ({block}: {block: blockType}) => {

    const {blocks, setBlocks} = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);

    return (
        <>
            <div className="w-fit h-fit bg-zinc-900 relative p-4
            rounded-lg flex flex-col justify-center items-center">
                <h1 className="text-white text-xl mb-2">Condition</h1>
                <DetachButton id={block.id} port={0} position="right"/>
                <div className="flex flex-col justify-center items-center
                bg-zinc-800 rounded-md mb-2 pb-2 w-full">
                    <DetachButton id={block.id} port={1} position="flex"/>
                    {BuildBlock(block.id, 1)}
                </div>
                <div className="flex flex-col justify-center items-center p-2
                bg-zinc-800 rounded-md my-2 pb-2 w-full">
                    <DetachButton id={block.id} port={2} position="flex"/>
                    {BuildBlock(block.id, 2)}
                </div>
                
            </div>
            {BuildBlock(block.id, 0)}
        </>
    )
}