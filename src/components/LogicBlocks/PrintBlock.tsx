import { useContext } from "react";
import { blockType, useBlockBuilder } from "../../hooks/editor"
import { BlockEditorContext } from "../../pages/BlockEditor";

export const PrintBlock = ({block}: {block: blockType}) => {

    const [blocks, setBlocks] = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);

    return (
        <>
            <div className="w-40 h-40 bg-red-500">Print</div>
            {BuildBlock(block.ports[0], {id: block.id, port: 0})}
        </>
    )
}