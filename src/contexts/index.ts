import { dashboardInfoType } from './../types/index';
import { Dispatch, MutableRefObject, SetStateAction, createContext } from "react";
import { algorithmDocType, authType, blockEditorContextType } from "../types";

export const AuthContext = createContext<authType>({} as authType);

export const MasterBlockContext = createContext<string>("");

export const AlgorithmContext = createContext<algorithmDocType>({} as algorithmDocType)

export const AlgorithmsContext = createContext<{algorithms: algorithmDocType[], SetAlgorithms: (algs: algorithmDocType[]) => void}>(
    {} as {algorithms: algorithmDocType[], SetAlgorithms: (algs: algorithmDocType[]) => void}
)

export const DashboardInfoContext = createContext<{info: dashboardInfoType, setInfo: Dispatch<SetStateAction<dashboardInfoType>>}>(
    {} as {info: dashboardInfoType, setInfo: Dispatch<SetStateAction<dashboardInfoType>>}
);

export const BlockEditorContext = createContext<blockEditorContextType>({} as blockEditorContextType);

export const InputContext = createContext<MutableRefObject<Array<{variable: string, content: string}>>>({} as MutableRefObject<Array<{variable: string, content: string}>>);