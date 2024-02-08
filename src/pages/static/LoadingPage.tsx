import { Loading } from "../../components/Loading/Loading";

export const LoadingPage = () => (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    flex justify-center items-center flex-col bg-zinc-900 p-2 rounded-md">
        <h1 className="text-white text-lg mb-1">Loading...</h1>
        <Loading/>
    </div>
)