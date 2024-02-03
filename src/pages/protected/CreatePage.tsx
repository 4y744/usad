import { Inputs } from "../../components/Create/Inputs"

export const CreatePage = () => {

    return (
        <div className='w-full md:md:my-16 my-8 text-white
        flex justify-center items-center gap-5'>
            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-5
            p-8">
                <div className="rounded-md shadow-md
                flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">Title</h1>
                    <input type="text" maxLength={64} 
                    spellCheck={false} placeholder="Enter your title..."
                    className="bg-zinc-800 rounded-md shadow-md
                    p-2
                    focus:outline outline-2 outline-green-600 outline-offset-2"/>
                </div>
                <div className="rounded-md shadow-md
                flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">Description</h1>
                    <textarea maxLength={512} spellCheck={false}
                    placeholder="Enter your description..."
                    className="bg-zinc-800 rounded-md shadow-md resize-none
                    focus:outline outline-2 outline-green-600 outline-offset-2
                    p-2 w-96 h-60 text-sm"/>
                </div>
            </div>
            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-5
            p-8">
                <Inputs/>
            </div>
        </div>
    )
}