import { BuildBlock } from "../BuildBlock";
import { DetachButton } from "../DetachButton";
import { blockType } from "../../../types";

export const SetBlock = ({block}: {block: blockType}) => {

    
    return (

        <>
            <div className="min-w-60 w-fit h-fit bg-teal-700 relative p-2
            rounded-lg flex flex-col justify-center items-center text-white
            border-2 border-teal-900">
                <DetachButton parent={block} port={0} position="right"/>
                <h1 className="text-lg font-semibold mb-2">Set</h1>

                <div className="flex gap-3 justify-center items-center">

                    <div className="flex justify-center items-center
                    bg-teal-600 rounded-md relative p-2">
                        <DetachButton parent={block} port={1} position="top"/>
                        <BuildBlock parentId={block.id} port={1}/>
                    </div>

                    <div>
                        <span className="text-lg font-semibold">=</span>
                    </div>

                    <div className="flex justify-center items-center
                    bg-teal-600 rounded-md relative p-2">
                        <DetachButton parent={block} port={2} position="top"/>
                        <BuildBlock parentId={block.id} port={2}/>
                    </div>    

                </div>
                     
            </div>
            <BuildBlock parentId={block.id} port={0}/>
        </>
    )
}