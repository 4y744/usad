import { algorithmDocType } from "../types";

export const AlgorithmSorter = {
    byReversePostDate: (algorithms: algorithmDocType[]) => algorithms.sort((a, b) => b.created! - a.created!),
    byPostDate: (algorithms : algorithmDocType[]) => algorithms.sort((a, b) => a.created! - b.created!),
    byAlphabeticalOrder:  (algorithms: algorithmDocType[]) => algorithms.sort((a, b) => a.title! > b.title! ? 1 : -1),
    byReverseAlphabeticalOrder:  (algorithms: algorithmDocType[]) => algorithms.sort((a, b) => a.title! < b.title! ? 1 : -1)
}