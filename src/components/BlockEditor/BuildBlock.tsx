import { StartBlock } from "./LogicBlocks/StartBlock.tsx"
import { ExitBlock } from "./LogicBlocks/ExitBlock.tsx"
import { PrintBlock } from "./LogicBlocks/PrintBlock.tsx"
import { ConditionalBlock } from "./LogicBlocks/ConditionalBlock.tsx"
import { ComparisonBlock } from "./LogicBlocks/ComparisonBlock.tsx.tsx"
import { SnapBlock } from "./LogicBlocks/SnapBlock.tsx"
import { NumberBlock } from "./LogicBlocks/NumberBlock.tsx"
import { BlockEditorContext } from "../../contexts/index.ts"

import { useContext } from "react"


export const BuildBlock = ({parentId, port, isMaster,} : {parentId: string, port: number, isMaster?: boolean}) => {
    

    const {blocks} = useContext (BlockEditorContext);

    const parentBlock = blocks.find((parent) => parent.id == parentId);
    const block = blocks.find((block) => block.id == (isMaster ? parentId : parentBlock?.ports[port]));

    if(block == null) return (
        <SnapBlock parent={{id: parentId, port}}/>
    )

    switch(block.type){
        case "start": return <StartBlock block={block}/> 
        case "exit": return <ExitBlock block={block}/> 
        case "print": return <PrintBlock block={block}/>
        case "condition": return <ConditionalBlock block={block}/>  
        case "comparison": return <ComparisonBlock block={block}/>
        case "number": return <NumberBlock block={block}/> 
        default: return <SnapBlock parent={{id: parentId, port}}/>
    }
}