import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react"

export type userType = {
    uid: string,
    username: string,
    created: number,
    pfp: string,
    loading: boolean,
    error: boolean
}

export type authType = {
    uid: string,
    username: string, 
    email: string, 
    created: number,
    logged: boolean, 
    pfp: string,
    loading: boolean
}

export type Vector2 = {
    x: number,
    y: number
}

export type algorithmDocType = {
    id: string,
    title: string;
    description: string;
    author: string;
    created: number;
    input_type: string;
    inputs: Array<{variable: string, label: string}>;
    function: string;
    visibility: "public" | "private";
}

export type algorithmDraftType = {
    title: string;
    description: string;
    author: string;
    created: number;
    input_type: string;
    inputs: Array<{variable: string, label: string}>;
    function: string;
    visibility: "public" | "private";
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

//Create page

export type inputType = {
    id: number,
    variable: string,
    label: string
}