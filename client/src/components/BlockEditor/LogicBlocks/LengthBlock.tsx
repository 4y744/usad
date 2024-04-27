import { BuildBlock } from "../BuildBlock";
import { BlockType } from "../../../types";
import { DetachButton } from "../DetachButton";
import { RemoveButton } from "../RemoveButton";
import { useTranslation } from "react-i18next";

export const LengthBlock = ({block}: {block: BlockType}) => {

    const {t} = useTranslation();

    return (
        <>
            <div className="min-w-52 w-fit h-fit bg-yellow-700 relative p-2
            rounded-lg flex flex-col justify-center items-center
            border-2 border-yellow-900">
                 <h1 className="text-white text-lg font-semibold">{t("length")}</h1>
                 <RemoveButton blockId={block.id}/>
                 <div className="bg-yellow-600 rounded-md p-2 my-2 w-full
                 flex justify-center items-center relative">
                    <DetachButton parent={block} port={1} position="top"/>
                    <BuildBlock parentId={block.id} port={1}/>
                 </div>
            </div>
        </>
    )
}