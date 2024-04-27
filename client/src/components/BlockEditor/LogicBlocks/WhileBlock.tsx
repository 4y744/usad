import { BuildBlock } from "../BuildBlock";
import { BlockType } from "../../../types";
import { DetachButton } from "../DetachButton";
import { RemoveButton } from "../RemoveButton";
import { useTranslation } from "react-i18next";

export const WhileBlock = ({block}: {block: BlockType}) => {

    const {t} = useTranslation();

    return (
        <>
            <div className="min-w-40 h-fit bg-indigo-700 relative p-2
            rounded-lg flex flex-col justify-center items-center
            border-2 border-indigo-900">
                <h1 className="text-white text-lg font-semibold px-2">{t("while-loop")}</h1>
                <RemoveButton blockId={block.id}/>
                <DetachButton parent={block} port={0} position="right"/>

                <div className="flex items-center rounded-md w-full my-2">

                    <div className="bg-indigo-600 rounded-md px-2 mr-2 w-24 h-16
                    flex justify-center items-center">
                        <h1 className="text-white text-lg font-semibold">{t("while")}</h1>
                    </div>
                    
                    <div className="relative bg-indigo-600 rounded-md p-2 w-full
                    flex justify-center">
                        <DetachButton parent={block} port={1} position="top"/>
                        <BuildBlock parentId={block.id} port={1}/>
                    </div>

                </div>
                
                <div className="flex items-center rounded-md w-full my-2">

                    <div className="bg-indigo-600 rounded-md px-2 mr-2 w-24 h-16
                    flex justify-center items-center">
                        <h1 className="text-white text-lg text-center font-semibold">{t("do")}</h1>
                    </div>

                    <div className="relative bg-indigo-600 rounded-md p-2 w-full
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