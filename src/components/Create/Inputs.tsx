export const Inputs = () => {
    const inputs = ["FF", "ff2", "ff3"]

    return (
        <div className="rounded-md shadow-md
            flex flex-col gap-2">
            <div className="bg-zinc-800 rounded-md shadow-md p-2 
            flex">
                <h1 className="text-lg font-semibold">Inputs</h1>
                <button className="bg-zinc-900 rounded-md shadow-md
                hover:bg-green-600
                active:outline outline-2 outline-green-600 outline-offset-2
                h-8 aspect-square mx-2">
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <div>

            </div>
        </div>
    )
}