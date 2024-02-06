import { MutableRefObject, createContext } from "react";
import { algorithmDocType, authType, blockEditorContextType } from "../types";

export const AuthContext = createContext<authType>({} as authType);

export const MasterBlockContext = createContext<string>("");

export const AlgorithmContext = createContext<algorithmDocType>({} as algorithmDocType)

export const AlgorithmsContext = createContext<algorithmDocType[]>([] as algorithmDocType[])

export const BlockEditorContext = createContext<blockEditorContextType>({} as blockEditorContextType);

export const InputContext = createContext<MutableRefObject<Array<{variable: string, content: string}>>>({} as MutableRefObject<Array<{variable: string, content: string}>>);