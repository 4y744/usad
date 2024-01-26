import { StartBlock } from "../components/LogicBlocks/StartBlock.tsx"
import { ExitBlock } from "../components/LogicBlocks/ExitBlock.tsx"
import { PrintBlock } from "../components/LogicBlocks/PrintBlock.tsx"
import { ConditionalBlock } from "../components/LogicBlocks/ConditionalBlock.tsx"
import { ComparisonBlock } from "../components/LogicBlocks/ComparisonBlock.tsx"
import { DoBlock } from "../components/LogicBlocks/DoBlock.tsx"
import { SnapBlock } from "../components/LogicBlocks/SnapBlock.tsx"
import { Draggable } from "../components/Draggable.tsx"
import { createContext } from "react"
import { NumberBlock } from "../components/LogicBlocks/NumberBlock.tsx"

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
    type: string,
    attached: boolean,
    position: {
        x: number,
        y: number
    },
    metadata?: {
        values: string[]
    },
    ports: string[]
}

export const MasterBlockContext = createContext<string>("");

export const useBlockBuilder = (blocks: blockType[]) => {
    

    const BuildBlock = ({parentId, port, isMaster} : {parentId: string, port: number, isMaster?: boolean}) => {

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
            case "do": return <DoBlock block={block}/>   
            case "number": return <NumberBlock block={block}/> 
            default: return <SnapBlock parent={{id: parentId, port}}/>
        }
    }

    const BlockBuilder = () => {
        const clusters = blocks.filter((block) => block.attached == false);
        return clusters.map((block) => (
            <MasterBlockContext.Provider key={block.id} value={block.id}>
                <Draggable masterId={block.id} startPos={{x: block.position.x, y: block.position.y}}>
                    <div className="flex">
                        <BuildBlock parentId={block.id} port={0} isMaster={true}/>
                    </div>
                </Draggable>
            </MasterBlockContext.Provider>
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