import { useContext } from "react"
import { BlockEditorContext } from "../../pages/BlockEditor"
import { BuildBlock } from "../../hooks/compiler";

export const ConditionalBlock = ({id, condition, run} : {id: string, condition: string, run: string}) => {

    const blocks = useContext(BlockEditorContext);

    if(!condition) console.log("Empty")

    return (
        <div className="w-40 bg-red-500">
            <div className="h-20">
                {BuildBlock(condition, blocks)}
            </div>
            <div>{BuildBlock(run, blocks)}</div>
        </div>
    )
}