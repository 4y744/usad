export const InfoEditor = () => {
    
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
                focus:outline outline-2 outline-green-600 outline-offset-2"/>
            </div>

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-2 p-4">
                <h1 className="text-lg font-semibold">Description</h1>
                <textarea maxLength={1024} spellCheck={false}
                placeholder="Enter your description..."
                className="bg-zinc-800 rounded-md shadow-md resize-none
                focus:outline outline-2 outline-green-600 outline-offset-2
                p-2 h-60 text-sm"/>
            </div>
            
        </div>
    )
}