import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react"

//Refers to Firestore users collection
export type userType = {
    uid: string,
    username: string,
    created: number,
    pfp: string
}

//Refers to Firebase Auth
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

//Refers to Firestore doc
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

//Refers to not hydrated Firestore doc
export type algorithmDraftType = {
    title: string;
    description: string;
    input_type: string;
    inputs: Array<{variable: string, label: string}>;
    function: string;
    visibility: "public" | "private";
}

//Block editor
//Refers to LogicBlock components
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

//Refers to context for use in the block editor
export type blockEditorContextType = {
    blocks: blockType[], 
    setBlocks: Dispatch<SetStateAction<blockType[]>>,
    selectedBlock: MutableRefObject<string>,
    blockEditorRef: RefObject<HTMLDivElement>, scale: RefObject<number>
}


//Create page

//Refers to types of inputs of algorithm
export type inputType = {
    id: number,
    variable: string,
    label: string
}

//Refers to input submitted by a user
export type submittedInputType = {
    variable: string,
    content: string
}

//Dashboard
export type dashboardInfoType = {
    algorithmCount: number
}