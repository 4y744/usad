import { StartBlock } from "../components/LogicBlocks/StartBlock"
import { ExitBlock } from "../components/LogicBlocks/ExitBlock"
import { PrintBlock } from "../components/LogicBlocks/PrintBlock"
import { ConditionalBlock } from "../components/LogicBlocks/ConditionalBlock"
import { ComparisonBlock } from "../components/LogicBlocks/ComparisonBlock.tsx"
import { RunBlock } from "../components/LogicBlocks/RunBlock.tsx"
import { SnapPoint } from "../components/LogicBlocks/SnapPoint.tsx"

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

export const BuildBlock = (blockId: string, blocks: any): any => {
        
    const block = blocks[blockId];
    
    if(block == null) return (
        <SnapPoint/>
    )

    switch(block.type){
        case "start":
            return (
                <>
                    <StartBlock id={blockId}/>       
                    {BuildBlock(block.ports.next, blocks)}
                </>
            )
        case "exit":
            return (
                <ExitBlock id={blockId}/>
            )    
        case "print":
            return (
                <>
                    <PrintBlock id={blockId}/>
                    {BuildBlock(block.ports.next, blocks)}
                </>
            )
        case "condition":
            return (
                <>
                    <ConditionalBlock id={blockId} condition={block.ports.condition} run={block.ports.run}/>
                    {BuildBlock(block.ports.next, blocks)}
                </>
            )   
        case "comparison":
            return (
                <ComparisonBlock id={blockId}/>
            )   
        case "run":
            return (
                <RunBlock id={blockId}/>
            )    
        default:
            return <></>
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
        case "run":
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

export const useCompiler = () => {

    

    const CompileToBlocks = (blocks: block_interface) => {
        return BuildBlock("start", blocks);
    }

    const CompileToJavaScript = (blocks: block_interface) => {
        return BuildScript("start", blocks);
    }

    return {CompileToJavaScript, CompileToBlocks}
}