import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react"

export type userType = {
    username: string, 
    email: string, 
    logged: boolean, 
    loading: boolean
}

export type Vector2 = {
    x: number,
    y: number
}

export type algorithmType = {
    title?: string;
    description?: string;
    author?: string;
    input_type?: string;
    inputs?: Array<string>;
    function?: string;
    loading: boolean;
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

export type blockEditorContextType = {
    blocks: blockType[], 
    setBlocks: Dispatch<SetStateAction<blockType[]>>,
    selectedBlock: MutableRefObject<string>,
    blockEditorRef: RefObject<HTMLDivElement>, scale: RefObject<number>
}