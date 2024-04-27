import { StartBlock } from "./LogicBlocks/StartBlock.tsx"
import { ExitBlock } from "./LogicBlocks/ExitBlock.tsx"
import { PrintBlock } from "./LogicBlocks/PrintBlock.tsx"
import { ConditionalBlock } from "./LogicBlocks/ConditionalBlock.tsx"
import { ComparisonBlock } from "./LogicBlocks/ComparisonBlock.tsx"
import { SnapBlock } from "./LogicBlocks/SnapBlock.tsx"
import { NumberBlock } from "./LogicBlocks/NumberBlock.tsx"
import { BlockEditorContext } from "../BlockEditor/BlockEditor.tsx"

import { useContext } from "react"
import { ForBlock } from "./LogicBlocks/ForBlock.tsx"
import { WhileBlock } from "./LogicBlocks/WhileBlock.tsx"
import { VariableBlock } from "./LogicBlocks/VariableBlock.tsx"
import { SetBlock } from "./LogicBlocks/SetBlock.tsx"
import { ParseBlock } from "./LogicBlocks/ParseBlock.tsx"
import { MathBlock } from "./LogicBlocks/MathBlock.tsx"
import { StringBlock } from "./LogicBlocks/StringBlock.tsx"
import { LengthBlock } from "./LogicBlocks/LengthBlock.tsx"


export const BuildBlock = ({parentId, port, isMaster} : {parentId: string, port: number, isMaster?: boolean}) => {
    

    const {blocks} = useContext (BlockEditorContext);

    const parentBlock = blocks.find((parent) => parent.id == parentId);

    //If it's the master block of the cluster, then the parentId is just its own id.
    const block = blocks.find((block) => block.id == (isMaster ? parentId : parentBlock?.ports[port]));

    switch(block?.type){
        case "start": return (
            <StartBlock 
            block={block}/> 
        )
        case "exit": return (
            <ExitBlock 
            block={block}/> 
        )
        case "print": return (
            <PrintBlock 
            block={block}/>
        )
        case "condition": return (
            <ConditionalBlock 
            block={block}/> 
        ) 
        case "for": return (
            <ForBlock 
            block={block}/>
        )
        case "while": return (
            <WhileBlock
            block={block}/>
        )
        case "comparison": return (
            <ComparisonBlock 
            block={block}/>
        )
        case "number": return (
            <NumberBlock 
            block={block}/> 
        )
        case "string": return (
            <StringBlock 
            block={block}/> 
        )
        case "variable": return (
            <VariableBlock
            block={block}/> 
        )
        case "set": return (
            <SetBlock
            block={block}/> 
        )
        case "parse": return (
            <ParseBlock
            block={block}/> 
        )
        case "length": return (
            <LengthBlock
            block={block}/> 
        )
        case "math": return (
            <MathBlock
            block={block}/> 
        )
        default: return (
            <SnapBlock parent={{id: parentId, port}}/>
        )
    }
}