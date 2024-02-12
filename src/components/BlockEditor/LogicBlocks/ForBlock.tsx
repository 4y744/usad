import { BuildBlock } from "../BuildBlock";
import { blockType } from "../../../types";
import { DetachButton } from "../DetachButton";

export const ForBlock = ({block}: {block: blockType}) => {

    return (
        <>
            <div className="min-w-40 h-fit bg-orange-700 relative p-2
            rounded-lg flex flex-col justify-center items-center
            border-2 border-orange-900">
                <h1 className="text-white text-lg font-semibold px-2">For loop</h1>
                <DetachButton parent={block} port={0} position="right"/>

                <div className="flex items-center rounded-md w-full my-2">

                    <div className="bg-orange-600 rounded-md px-2 mr-2 w-16 h-16
                    min-w-12 flex justify-center items-center">
                        <h1 className="text-white text-lg font-semibold">For</h1>
                    </div>
                    
                    <div className="relative bg-orange-600 rounded-md p-2 w-full
                    flex justify-center">
                        <DetachButton parent={block} port={1} position="top"/>
                        <BuildBlock parentId={block.id} port={1}/>
                    </div>

                </div>
                
                <div className="flex items-center rounded-md w-full my-2">

                    <div className="bg-orange-600 rounded-md px-2 mr-2 w-16 h-16
                    min-w-12 flex justify-center items-center">
                        <h1 className="text-white text-lg text-center font-semibold">Do</h1>
                    </div>

                    <div className="relative bg-orange-600 rounded-md p-2 w-full
                    flex justify-center">
                        <DetachButton parent={block} port={2} position="top"/>
                        <BuildBlock parentId={block.id} port={2}/>
                    </div>
                    
                </div>
                
            </div>
            <BuildBlock parentId={block.id} port={0}/>
        </>
    )
}