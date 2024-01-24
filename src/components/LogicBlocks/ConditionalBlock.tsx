import { useContext } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { blockType, useBlockBuilder } from "../../hooks/editor";

export const ConditionalBlock = ({block}: {block: blockType}) => {

    const [blocks, setBlocks] = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);

    return (
        <>
            <div className="w-40 bg-red-500">
                <h1>Condition</h1>
                {BuildBlock(block.ports[1], {id: block.id, port: 1})}
                {BuildBlock(block.ports[2], {id: block.id, port: 2})}
            </div>
            {BuildBlock(block.ports[0], {id: block.id, port: 0})}
        </>
    )
}