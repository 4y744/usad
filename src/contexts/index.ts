import { createContext } from "react";
import { blockEditorContextType } from "../types";

export const AuthContext = createContext({username: "", email: "", logged: false, loading: true});

export const MasterBlockContext = createContext<string>("");

export const BlockEditorContext = createContext<blockEditorContextType>
(
    {blocks: [], 
    setBlocks: () => {}, 
    selectedBlock: {current: ""}, 
    blockEditorRef: {current: null}, 
    scale: {current: 100}}
);