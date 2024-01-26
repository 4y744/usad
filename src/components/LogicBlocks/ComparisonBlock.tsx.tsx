import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { blockType, useBlockBuilder } from "../../hooks/editor"
import { BlockEditorContext } from "../../pages/BlockEditor";
import { DetachButton } from "../DetachButton";

export const ComparisonBlock = ({block}: {block: blockType}) => {

    const {blocks, setBlocks} = useContext(BlockEditorContext);
    const {BuildBlock} = useBlockBuilder(blocks);

    const handleChange = (event : ChangeEvent<HTMLSelectElement>) => {
        setBlocks(blocks.map((b) => {
            if(b.id == block.id) b.metadata!.values[0] = event.target.value;
            return b;
        }))
    }
    
    return (

        <>
            <div className="w-72 h-fit bg-zinc-900 relative p-2
                rounded-lg flex flex-col justify-center items-center text-white">
                <h1 className="text-sm mb-2">Comparison</h1>

                <div className="flex gap-3 justify-center items-center">
                    <div className="flex justify-center items-center
                    bg-zinc-800 rounded-md relative p-2">
                        <DetachButton parent={block} port={0} position="top"/>
                        <BuildBlock parentId={block.id} port={0}/>
                    </div>

                    <select className="bg-zinc-800 text-xl w-12 h-12 text-center 
                    rounded-lg hover:bg-zinc-700" id="operators"
                    onChange={handleChange} defaultValue={block.metadata?.values[0]}>
                        <option value=">">
                            {">"}
                        </option>
                        <option value="<">
                            {"<"}
                        </option>
                        <option value="=">
                            {"="}
                        </option>
                    </select>
                        
                    <div className="flex justify-center items-center
                    bg-zinc-800 rounded-md relative p-2">
                        <DetachButton parent={block} port={1} position="top"/>
                        <BuildBlock parentId={block.id} port={1}/>
                    </div>    
                </div>
                     
            </div>
        </>
    )
}