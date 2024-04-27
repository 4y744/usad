import { BuildBlock } from "../BuildBlock";
import { BlockType } from "../../../types";
import { DetachButton } from "../DetachButton";
import { RemoveButton } from "../RemoveButton";
import { useTranslation } from "react-i18next";

export const ConditionalBlock = ({block}: {block: BlockType}) => {

    const {t} = useTranslation();

    return (
        <>
            <div className="min-w-40 h-fit bg-cyan-700 relative p-2
            rounded-lg flex flex-col justify-center items-center
            border-2 border-cyan-900">
                <h1 className="text-white text-lg font-semibold px-2">{t("condition")}</h1>
                <DetachButton parent={block} port={0} position="right"/>
                <RemoveButton blockId={block.id}/>

                <div className="flex items-center rounded-md w-full my-2">

                    <div className="bg-cyan-600 rounded-md px-2 mr-2 w-16 h-16
                    min-w-16 flex justify-center items-center">
                        <h1 className="text-white text-lg font-semibold">{t("if")}</h1>
                    </div>
                    
                    <div className="relative bg-cyan-600 rounded-md p-2 w-full
                    flex justify-center">
                        <DetachButton parent={block} port={1} position="top"/>
                        <BuildBlock parentId={block.id} port={1}/>
                    </div>

                </div>
                
                <div className="flex items-center rounded-md w-full my-2">

                    <div className="bg-cyan-600 rounded-md px-2 mr-2 w-16 h-16
                    min-w-16 flex justify-center items-center">
                        <h1 className="text-white text-lg text-center font-semibold">{t("then")}</h1>
                    </div>

                    <div className="relative bg-cyan-600 rounded-md p-2 w-full
                    flex justify-center">
                        <DetachButton parent={block} port={2} position="top"/>
                        <BuildBlock parentId={block.id} port={2}/>
                    </div>
                    
                </div>

                <div className="flex items-center rounded-md w-full my-2">

                    <div className="bg-cyan-600 rounded-md px-2 mr-2 w-16 h-16
                    min-w-16 flex justify-center items-center">
                        <h1 className="text-white text-lg text-center font-semibold">{t("else")}</h1>
                    </div>

                    <div className="relative bg-cyan-600 rounded-md p-2 w-full
                    flex justify-center">
                        <DetachButton parent={block} port={3} position="top"/>
                        <BuildBlock parentId={block.id} port={3}/>
                    </div>
                    
                </div>
                
            </div>
            <BuildBlock parentId={block.id} port={0}/>
        </>
    )
}