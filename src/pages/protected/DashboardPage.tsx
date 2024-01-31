import { useContext } from "react"
import { useGetAlgorithms } from "../../hooks/firestore"
import { AuthContext } from "../../contexts"
import { Link } from "react-router-dom";

export const DashboardPage = () => {

    const {username} = useContext(AuthContext);
    const {algorithms, loading} = useGetAlgorithms({username: username})

    return (
        <div className='w-full my-16 text-white
        flex justify-center items-center'>

            <div className="grid grid-cols-4 gap-5
            w-5/6 min-h-[80vh]">

                <div className="bg-zinc-900 shadow-md rounded-md
                row-start-1 row-end-4 col-start-1 col-end-2
                p-8">

                </div>

                <div className="bg-zinc-900 shadow-md rounded-md
                row-start-1 row-end-4 col-start-2 col-end-5
                flex flex-col gap-5
                p-8">
                    
                    <div className="bg-zinc-800 shadow-md rounded-md
                    w-full p-2">
                        
                        <div className="bg-zinc-900 w-fit rounded-md shadow-md
                        flex">
                            <button
                            className="py-2 px-4 text-lg
                            hover:bg-green-600 rounded-l-md
                            active:outline outline-2 outline-green-600 outline-offset-2"
                            onClick={() => {}}>
                                <i className="fa-solid fa-list"></i>
                            </button>
                            <button
                            className="py-2 px-4 text-lg
                            hover:bg-green-600 rounded-r-md
                            active:outline outline-2 outline-green-600 outline-offset-2"
                            onClick={() => {}}>
                                <i className="fa-solid fa-border-all"></i>
                            </button>
                        </div>

                    </div>
                    
                    <div className="bg-zinc-800 shadow-md rounded-md
                    w-full p-4
                    flex flex-col gap-5">
                        {algorithms?.map((alg) => (
                            <div className="bg-zinc-900 rounded-md shadow-md
                            flex items-center
                            p-4">
                                <Link to={`/algorithm/${alg.id}`}>
                                    <h1 className="text-lg font-semibold
                                    hover:underline">{alg.title}</h1>
                                </Link>
                                <span className="bg-zinc-800 py-1 px-2 mx-2
                                rounded-md shadow-md text-sm">BG</span>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    )
}