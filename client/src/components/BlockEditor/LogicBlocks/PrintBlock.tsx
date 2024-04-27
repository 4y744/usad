import { BuildBlock } from "../BuildBlock";
import { BlockType } from "../../../types";
import { DetachButton } from "../DetachButton";
import { RemoveButton } from "../RemoveButton";
import { useTranslation } from "react-i18next";

export const PrintBlock = ({block}: {block: BlockType}) => {

    const {t} = useTranslation();

    return (
        <>
            <div className="w-fit h-fit bg-emerald-700 relative p-2
            rounded-lg flex flex-col justify-center items-center
            border-2 border-emerald-900">
                <RemoveButton blockId={block.id}/>

                 <h1 className="text-white text-lg font-semibold">{t("print")}</h1>
                 <DetachButton parent={block} port={0} position="right"/>

                 <div className="bg-emerald-600 rounded-md p-2 my-2 min-w-32
                 flex justify-center items-center relative">
                    <DetachButton parent={block} port={1} position="top"/>
                    <BuildBlock parentId={block.id} port={1}/>
                 </div>
            </div>
            <BuildBlock parentId={block.id} port={0}/>
        </>
    )
}