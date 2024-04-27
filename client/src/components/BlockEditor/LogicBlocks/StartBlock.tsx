import { BuildBlock } from "../BuildBlock";
import { BlockType } from "../../../types";
import { DetachButton } from "../DetachButton";
import { useTranslation } from "react-i18next";

export const StartBlock = ({block}: {block: BlockType}) => {

    const {t} = useTranslation();

    return (
        <>
            <div className="w-32 h-12 bg-green-700 relative
            rounded-lg flex justify-center items-center
            border-green-900 border-2">
                <h1 className="text-white text-lg font-semibold">{t("start")}</h1>
                <DetachButton parent={block} port={0} position="right"/>
            </div>
            <BuildBlock parentId={block.id} port={0}/>
        </>
    )
};