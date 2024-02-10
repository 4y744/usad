import { MutableRefObject, useEffect } from "react"
import { algorithmDraftType } from "../../types"

export const InfoEditor = ({draftRef} : {draftRef: MutableRefObject<algorithmDraftType>}) => {

    useEffect(() => {
        draftRef.current.visibility = "public";
    }, [])
    
    return (
        <div className="bg-zinc-800 rounded-md shadow-md
        flex flex-col gap-5 p-4">

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-2 p-4">
                <h1 className="text-lg font-semibold">Title</h1>
                <input type="text" maxLength={64} 
                spellCheck={false} placeholder="Enter your title..."
                className="bg-zinc-800 rounded-md shadow-md
                p-2
                focus:outline outline-2 outline-green-600 outline-offset-2"
                onChange={(event) => draftRef.current.title = event.target.value}/>
            </div>

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-2 p-4">
                <h1 className="text-lg font-semibold">Description</h1>
                <textarea maxLength={1024} spellCheck={false}
                placeholder="Enter your description..."
                className="bg-zinc-800 rounded-md shadow-md resize-none
                focus:outline outline-2 outline-green-600 outline-offset-2
                p-2 h-60 text-sm"
                onChange={(event) => draftRef.current.description = event.target.value}/>
            </div>

            <div className="bg-zinc-900 rounded-md shadow-md
            flex items-center px-4 py-4">
                <h2>Visibility</h2>
                
                <select className="bg-zinc-800 rounded-md shadow-md
                active:outline ouline-2 outline-green-600
                hover:bg-zinc-700 px-4 py-2 ml-auto"
                defaultValue={"public"}
                onChange={(event) => draftRef.current.visibility = event.target.value as "public" | "private"}>

                    <option value="public">
                        Public
                    </option>
                    <option value="private">
                        Private
                    </option>

                </select>
            </div>
            
        </div>
    )
}