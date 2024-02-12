import { ChangeEvent, useContext } from "react";
import { BuildBlock } from "../BuildBlock";
import { DetachButton } from "../DetachButton";
import { blockType } from "../../../types";
import { BlockEditorContext } from "../../../contexts";

export const MathBlock = ({block}: {block: blockType}) => {

    const {setBlocks} = useContext(BlockEditorContext);

    const handleChange = (event : ChangeEvent<HTMLSelectElement>) => {
        setBlocks(prev => prev.map((b) => {
            if(b.id == block.id) b.metadata!.values[0] = event.target.value;
            return b;
        }))
    }
    
    return (

        <>
            <div className="min-w-60 w-fit h-fit bg-red-800 relative p-2
                rounded-lg flex flex-col justify-center items-center text-white
                border-2 border-red-900">
                <h1 className="text-lg font-semibold mb-2">Math</h1>

                <div className="flex gap-3 justify-center items-center">
                    <div className="flex justify-center items-center
                    bg-red-700 rounded-md relative p-2">
                        <DetachButton parent={block} port={0} position="top"/>
                        <BuildBlock parentId={block.id} port={0}/>
                    </div>

                    <select className="bg-red-700 text-xl w-12 h-12 text-center 
                    rounded-lg hover:bg-red-600" id="operators"
                    onChange={handleChange} defaultValue={block.metadata?.values[0]}>
                        <option value="+">
                            {"+"}
                        </option>
                        <option value="-">
                            {"-"}
                        </option>
                        <option value="*">
                            {"×"}
                        </option>
                        <option value="/">
                            {"÷"}
                        </option>
                        <option value="**">
                            {"^"}
                        </option>
                    </select>
                        
                    <div className="flex justify-center items-center
                    bg-red-700 rounded-md relative p-2">
                        <DetachButton parent={block} port={1} position="top"/>
                        <BuildBlock parentId={block.id} port={1}/>
                    </div>    
                </div>
                     
            </div>
        </>
    )
}