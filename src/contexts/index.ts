import { MutableRefObject, createContext } from "react";
import { algorithmType, authType, blockEditorContextType } from "../types";

export const AuthContext = createContext<authType>({} as authType);

export const MasterBlockContext = createContext<string>("");

export const AlgorithmContext = createContext<algorithmType>({} as algorithmType)

export const AlgorithmsContext = createContext<algorithmType[]>([] as algorithmType[])

export const BlockEditorContext = createContext<blockEditorContextType>({} as blockEditorContextType);

export const InputContext = createContext<MutableRefObject<string[]>>({} as MutableRefObject<string[]>);