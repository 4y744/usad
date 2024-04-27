import { useTranslation } from "react-i18next"
import { BlockType } from "../../../types"
import { RemoveButton } from "../RemoveButton"


export const ExitBlock = ({block}: {block: BlockType}) => {
    
    const {t} = useTranslation();

    return (
        <div className="w-32 h-12 bg-red-700
        rounded-lg flex justify-center items-center
        border-2 border-red-900 relative">
            <h1 className="text-white text-lg font-semibold">{t("exit")}</h1>
            <RemoveButton blockId={block.id}/>
        </div>
    )
}