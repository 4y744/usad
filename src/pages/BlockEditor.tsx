import { createContext, useEffect, useRef, useState } from "react"

import { Draggable } from "../components/Draggable"
import { useCompiler } from "../hooks/compiler.tsx"

type block_interface = {
    [key: string]: {
        type: string,
        metadata?: {
            number?: string,
            comparator?: string
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

export const BlockEditorContext = createContext<block_interface>({});

export const BlockEditor = () => {

    const [blocks, setBlocks] = useState<block_interface>({});
    const {CompileToBlocks, CompileToJavaScript} = useCompiler();

    useEffect(() => {
        
        setBlocks({
            "start": {
                type: "start",
                ports: {
                    next: "1"
                }
            },
            "1": {
                type: "condition",
                ports: {
                    next: "2",
                    condition: "3",
                    run: "4"
                }
            },
            "2": {
                type: "print",
                ports: {
                    next: "exit"
                }
            },
            "3": {
                type: "comparison",
                metadata: {
                    comparator: ">"
                },
                ports: {
                    first: "6",
                    second: "7"
                }
            },
            "4": {
                type: "run",
                ports: {}
            },
            "5": {
                type: "number",
                metadata: {
                    number: "5"
                },
                ports: {}
            },
            "6": {
                type: "number",
                metadata: {
                    number: "1"
                },
                ports: {}
            },
            "7": {
                type: "number",
                metadata: {
                    number: "2"
                },
                ports: {}
            },
            "exit": {
                type: "exit",
                ports: {
                }
            }
        });
        
    }, [])

    
    return (
        <BlockEditorContext.Provider value={blocks}>
            <div className="relative
            w-full h-[3000px] overflow-x-hidden">

                <Draggable>
                    <div className="flex">
                        {CompileToBlocks(blocks)}
                    </div>
                </Draggable>
            </div>
        </BlockEditorContext.Provider>
    )
}