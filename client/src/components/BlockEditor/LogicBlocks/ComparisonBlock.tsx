import { ChangeEvent, useContext, useEffect } from "react";
import { BuildBlock } from "../BuildBlock";
import { DetachButton } from "../DetachButton";
import { BlockType } from "../../../types";
import { BlockEditorContext } from "../BlockEditor";
import { RemoveButton } from "../RemoveButton";
import { useTranslation } from "react-i18next";

export const ComparisonBlock = ({block}: {block: BlockType}) => {

    const {set} = useContext(BlockEditorContext);

    const handleChange = (event : ChangeEvent<HTMLSelectElement>) => {
        set(prev => prev.map((b) => {
            if(b.id == block.id) b.metadata!.values[0] = event.target.value;
            return b;
        }))
    }

    useEffect(() => {
        if(block.metadata?.values[0] == null){
            set(prev => prev.map((b) => {
                if(b.id == block.id) b.metadata!.values[0] = ">";
                return b;
            }))
        }
    }, [])

    const {t} = useTranslation();
    
    return (

        <>
            <div className="min-w-60 w-fit h-fit bg-green-800 relative p-2
                rounded-lg flex flex-col justify-center items-center text-white
                border-2 border-green-900">
                <h1 className="text-lg font-semibold mb-2">{t("comparison")}</h1>
                <RemoveButton blockId={block.id}/>

                <div className="flex gap-3 justify-center items-center">
                    <div className="flex justify-center items-center
                    bg-green-700 rounded-md relative p-2">
                        <DetachButton parent={block} port={0} position="top"/>
                        <BuildBlock parentId={block.id} port={0}/>
                    </div>

                    <select className="bg-green-700 text-xl w-12 h-12 text-center 
                    rounded-lg hover:bg-green-600" id="operators"
                    onChange={handleChange} defaultValue={block.metadata?.values[0]}>
                        <option value=">">
                            {">"}
                        </option>
                        <option value="<">
                            {"<"}
                        </option>
                        <option value="==">
                            {"="}
                        </option>
                        <option value=">=">
                            {"≥"}
                        </option>
                        <option value="<=">
                            {"≤"}
                        </option>
                        <option value="!=">
                            {"≠"}
                        </option>
                    </select>
                        
                    <div className="flex justify-center items-center
                    bg-green-700 rounded-md relative p-2">
                        <DetachButton parent={block} port={1} position="top"/>
                        <BuildBlock parentId={block.id} port={1}/>
                    </div>    
                </div>
                     
            </div>
        </>
    )
}