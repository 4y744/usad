import { useSignOut } from "../hooks/auth"
import { LoadingSpinner } from "../components/LoadingSpinner";

export const SignOutPage = () => {
    const [SignOut, loading] = useSignOut("/");

    const handleSignOut = () => {
        SignOut();
    }

    return (
        <div className="flex justify-center items-center w-full my-36">
            <div className="flex justify-start items-start flex-col gap-3 rounded-md p-6 shadow-md text-white bg-zinc-900 sm:w-96 w-80">
                <button
                    className={`bg-green-700 outline-offset-2 outline-2 outline-green-600
                    w-full h-12 rounded-md flex justify-center items-center 
                    ${
                        loading
                            ? "opacity-50"
                            : "opacity-100 hover:bg-green-600 active:outline"
                    }`}
                    onClick={handleSignOut}
                    disabled={loading}
                >
                    {loading ? <LoadingSpinner /> : <>Sign out</>}
                </button>
            </div>
        </div>
    )
}