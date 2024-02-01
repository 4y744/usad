import { MutableRefObject, createContext } from "react";
import { algorithmType, blockEditorContextType } from "../types";

export const AuthContext = createContext({username: "", email: "", logged: false, loading: true});

export const MasterBlockContext = createContext<string>("");

export const AlgorithmContext = createContext<algorithmType>({
    id: "",
    title: "",
    description: "",
    author: "",
    input_type: "",
    inputs: [""],
    function: "",
    loading: true
})

export const AlgorithmsContext = createContext<algorithmType[]>([
    {
        id: "",
        title: "",
        description: "",
        author: "",
        input_type: "",
        inputs: [""],
        function: "",
        loading: true
    }
])


export const BlockEditorContext = createContext<blockEditorContextType>
({
    blocks: [], 
    setBlocks: () => {}, 
    selectedBlock: {current: ""}, 
    blockEditorRef: {current: null}, 
    scale: {current: 100}
});

export const InputContext = createContext<MutableRefObject<string[]>>({current: []});