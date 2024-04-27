export type UserType = {
    uid: string,
    username: string,
    created: number
}

export type AuthType = {
    uid: string,
    username: string, 
    email: string, 
    created: number,
    pfp: string
    logged: boolean, 
    loading: boolean
}

export type ToastType = {
    title: string,
    text: string,
    type: "success" | "error" | "info"
}

export type PopupType = {
    title: string,
    text: string,
    type: "confirm" | "delete",
    callback?: () => void
}

export type Vector2 = {
    x: number,
    y: number
}

export type AlgorithmSortType = (
    "alphabetical-order" |
    "reverse-alphabetical-order" |
    "post-date" |
    "reverse-post-date" |
    "visibility" |
    "reverse-visibility" |
    "language" |
    "reverse-language"|
    "score" |
    "reverse-score"|
    "comments" |
    "reverse-comments"|
    "forks" |
    "reverse-forks"
)

export type CommentSortType = (
    "post-date" |
    "reverse-post-date" 
)

export type AlgorithmType = {
    id: string,
    author: string,
    created: number,
    title: string,
    description: string,
    language: string,
    visibility: "public" | "private",
    editor: "code" | "block",
    code: string,
    input_type: "single" | "multiple";
    inputs: Array<{variable: string, label: string}>,
    fork_of: string,
    score: number,
    comments: number,
    forks: number
}

export type CommentType = {
    id: string,
    postId: string,
    text: string,
    author: string,
    created: number
}

export type VoteType = {
    author: string,
    type: "upvote" | "downvote" | null;
}

export type BlockType = {
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
