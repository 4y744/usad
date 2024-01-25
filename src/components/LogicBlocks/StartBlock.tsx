import { useContext } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { blockType, useBlockBuilder } from "../../hooks/editor";

export const StartBlock = ({block}: {block: blockType}) => {

    const {blocks, setBlocks} = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);
    

    const detachBlock = (id: string, port: number) => {
        setBlocks(blocks
            .map((block) => {
                if(block.id == blocks.find((block) => block.id == id)!.ports[port])
                {
                    block.attached = false;
                }
                return block;
            })
            .map((block) => {
                if(block.id == id)
                {
                    block.ports.splice(port, 1);
                }
                return block;
        }))
        
    }

    return (
        <>
            <div className="w-40 h-40 bg-cyan-500">
                <h1>Start</h1>
                <button onClick={() => detachBlock("start", 0)}>DETACH</button>
            </div>
            {BuildBlock(block.id, 0)}
        </>
    )
}