import { useContext } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { blockType, useBlockBuilder } from "../../hooks/editor";
import { DetachButton } from "../DetachButton";

export const ConditionalBlock = ({block}: {block: blockType}) => {

    const {blocks, setBlocks} = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);

    return (
        <>
            <div className="min-w-40 h-fit bg-zinc-900 relative p-4
            rounded-lg flex flex-col justify-center items-center">
                <h1 className="text-white text-xl mb-2">Condition</h1>
                <DetachButton parent={block} port={0} position="right"/>

                <div className="flex flex-col justify-center items-center
                bg-zinc-800 rounded-md p-2 my-2 relative">
                    <DetachButton parent={block} port={1} position="top"/>
                    <BuildBlock parentId={block.id} port={1}/>
                </div>
                
                <div className="flex flex-col justify-center items-center
                bg-zinc-800 rounded-md p-2 my-2 relative">
                    <DetachButton parent={block} port={2} position="top"/>
                    <BuildBlock parentId={block.id} port={2}/>
                </div>
                
            </div>
            <BuildBlock parentId={block.id} port={0}/>
        </>
    )
}