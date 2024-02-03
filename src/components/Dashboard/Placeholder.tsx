import { LoadingSpinner } from "../LoadingSpinner";

export const Placeholder = () => (
    <div className='w-full md:md:my-16 my-8 text-white
        flex justify-center items-center'>

        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5
        md:w-5/6 w-[95%] min-h-fit">

            <div className="bg-zinc-900 shadow-md rounded-md
            row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-2
            row-end-2 p-8 min-h-80
            flex flex-col gap-5">
                <div className="bg-zinc-800 shadow-md rounded-md w-full h-1/3
                grid place-items-center">
                    <LoadingSpinner/>
                </div>
                <div className="bg-zinc-800 shadow-md rounded-md w-full h-2/3
                grid place-items-center">
                    <LoadingSpinner/>
                </div>
            </div>

            <div className="bg-zinc-900 shadow-md rounded-md h-fit
            lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-5
            row-start-2 row-end-5
            flex flex-col gap-5
            p-8">
                    
                <div className="bg-zinc-800 shadow-md rounded-md
                w-full p-2 h-12 gap-2
                grid place-items-center">
                    <LoadingSpinner/>
                </div>

                
                <div className="bg-zinc-800 shadow-md rounded-md
                w-full h-[60vh] overflow-y-auto
                grid place-items-center">
                    <LoadingSpinner/>
                </div>
                    
            </div>

        </div>

    </div>
)