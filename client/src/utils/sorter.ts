//Import types
import { AlgorithmType, CommentType } from '../types'

/** 
 * Stores sorting functions for algorithms.
 */
export const AlgorithmSorter = {
    
    "post-date": (a: AlgorithmType, b: AlgorithmType) => {
        return b.created - a.created;
    },
    "reverse-post-date": (a: AlgorithmType, b: AlgorithmType) => {
        return a.created - b.created;
    },
    "alphabetical-order": (a: AlgorithmType, b: AlgorithmType) => {
        return a.title > b.title ? 1 : -1;
    },
    "reverse-alphabetical-order": (a: AlgorithmType, b: AlgorithmType) => {
        return a.title < b.title ? 1 : -1;
    },
    "visibility": (a: AlgorithmType, b: AlgorithmType) => {
        return a.visibility > b.visibility ? 1 : -1;
    },
    "reverse-visibility": (a: AlgorithmType, b: AlgorithmType) => {
        return a.visibility < b.visibility ? 1 : -1;
    },
    "language": (a: AlgorithmType, b: AlgorithmType) => {
        return a.language > b.language ? 1 : -1;
    },
    "reverse-language": (a: AlgorithmType, b: AlgorithmType) => {
        return a.language < b.language ? 1 : -1;
    },
    "score": (a: AlgorithmType, b: AlgorithmType) => {
        return b.score - a.score;
    },
    "reverse-score": (a: AlgorithmType, b: AlgorithmType) => {
        return a.score - b.score;
    },
    "comments": (a: AlgorithmType, b: AlgorithmType) => {
        return b.comments - a.comments;
    },
    "reverse-comments": (a: AlgorithmType, b: AlgorithmType) => {
        return a.comments - b.comments;
    },
    "forks": (a: AlgorithmType, b: AlgorithmType) => {
        return b.forks - a.forks;
    },
    "reverse-forks": (a: AlgorithmType, b: AlgorithmType) => {
        return a.forks - b.forks;
    }
}


/** 
 * Stores sorting functions for comments.
 */
export const CommentSorter = {
    
    "post-date": (a: CommentType, b: CommentType) => {
        return a.created - b.created;
    },
    "reverse-post-date": (a: CommentType, b: CommentType) => {
        return b.created - a.created;
    }
}
