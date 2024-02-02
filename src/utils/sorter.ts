import { algorithmType } from "../types";

export const AlgorithmSorter = {
    byReversePostDate: (algorithms: algorithmType[]) => algorithms.sort((a, b) => b.created! - a.created!),
    byPostDate: (algorithms : algorithmType[]) => algorithms.sort((a, b) => a.created! - b.created!),
    byAlphabeticalOrder:  (algorithms: algorithmType[]) => algorithms.sort((a, b) => a.title! > b.title! ? 1 : -1),
    byReverseAlphabeticalOrder:  (algorithms: algorithmType[]) => algorithms.sort((a, b) => a.title! < b.title! ? 1 : -1)
}