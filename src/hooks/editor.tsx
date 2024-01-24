import { StartBlock } from "../components/LogicBlocks/StartBlock.tsx"
import { ExitBlock } from "../components/LogicBlocks/ExitBlock.tsx"
import { PrintBlock } from "../components/LogicBlocks/PrintBlock.tsx"
import { ConditionalBlock } from "../components/LogicBlocks/ConditionalBlock.tsx"
import { ComparisonBlock } from "../components/LogicBlocks/ComparisonBlock.tsx.tsx"
import { DoBlock } from "../components/LogicBlocks/DoBlock.tsx"
import { SnapPoint } from "../components/LogicBlocks/SnapPoint.tsx"
import { Draggable } from "../components/Draggable.tsx"

type block_interface = {
    [key: string]: {
        type: string,
        metadata?: {
            number?: string,
            comparator?: string,
        }
        ports: {
            next?: string,
            condition?: string,
            run?: string,
            first?: string,
            second?: string
        }
    }
}


const BuildScript = (blockId: string, blocks: any): string => {
        
    const block = blocks[blockId];
    
    if(block == null) return ""

    switch(block.type){
        case "start":
            return (
                BuildScript(block.ports.next, blocks)
            )
        case "exit":
            return (
                ""
            )    
        case "print":
            return (
                `console.log("Hello World!");\n${BuildScript(block.ports.next, blocks)}`
            )
        case "condition":
            return (
                `if(${BuildScript(block.ports.condition, blocks)}){\n${BuildScript(block.ports.run, blocks)}\n}\n${BuildScript(block.ports.next, blocks)}`
            )            
        case "comparison":
            return (
                `${BuildScript(block.ports.first, blocks)} ${block.metadata.comparator} ${BuildScript(block.ports.second, blocks)}`
            )
        case "do":
            return (
                ``
            )    
        case "number":
            return (
                `${block.metadata.number}`
            )
        default:
            return ``
    }
}

export type blockType = {
    id: string,
    parent: string,
    type: string,
    attached: boolean,
    metadata?: {
        values: string[]
    },
    ports: string[]
}

export const useBlockBuilder = (blocks: blockType[]) => {

    const BuildBlock = (blockId: string, parent: {id: string, port: number}): any => {
        
        const block = blocks.find((block) => block.id == blockId);
        
        if(block == null) return (
            <SnapPoint parent={parent}/>
        )
    
        switch(block.type){
            case "start": return <StartBlock block={block}/> 
            case "exit": return <ExitBlock block={block}/> 
            case "print": return <PrintBlock block={block}/>
            case "condition": return <ConditionalBlock block={block}/>  
            case "comparison": return <ComparisonBlock block={block}/>
            case "do": return <DoBlock block={block}/>   
            default: return <SnapPoint parent={parent}/>
        }
    }

    const BlockBuilder = () => {
        const clusters = blocks.filter((block) => block.attached == false);
        return clusters.map((block) => (
            <Draggable key={block.id}>
                <div className="flex">
                    {BuildBlock(block.id, {id: "", port: 0})}
                </div>
            </Draggable>
        ))
    }

    return {BlockBuilder, BuildBlock};

}

export const useCompiler = () => {

    

    // const CompileToBlocks = (blocks: block_interface) => {
    //     return BuildBlock("start", blocks);
    // }

    // const CompileToJavaScript = (blocks: block_interface) => {
    //     return BuildScript("start", blocks);
    // }

    // return {CompileToJavaScript, CompileToBlocks}
}