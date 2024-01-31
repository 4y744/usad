import { useSignOut } from "../../hooks/auth"
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../../contexts";

export const SignOutPage = () => {
    const [SignOut, loading] = useSignOut("/");

    const handleSignOut = () => {
        SignOut();
    }

    const {username, email, logged} = useContext(AuthContext);

    return (
        <div className="flex justify-center items-center w-full my-16">
            <div className="flex justify-start items-start flex-col gap-3 
            rounded-md p-6 shadow-md text-white bg-zinc-900 sm:w-96 w-80">

                <h1 className="text-2xl font-bold">Sign Out</h1>
                <span>Are you sure you want to sign out of your account?</span>

                {logged ?
                    <>
                        {/* <span className="">Currently signed in as 
                            <span className="font-bold text-green-600 ml-2">{username}</span>
                        </span> */}

                        <div className="bg-zinc-800 w-full p-2 rounded-md">
                            <h1 className="font-semibold mb-1">Current user information</h1>
                            <div className="w-full text-sm">
                                <span>Username:</span>
                                <span className="text-green-600 font-bold ml-1">{username}</span>
                            </div>
                            <div className="w-full text-sm">
                                <span>Email:</span>
                                <span className="text-green-600 font-bold ml-1">{email}</span>
                            </div>
                        </div>

                        <button className={`bg-green-700 outline-offset-2 outline-2 
                        outline-green-600 w-full h-12 rounded-md flex justify-center items-center 
                        ${loading ? "opacity-50" : "opacity-100 hover:bg-green-600 active:outline"}`} 
                        onClick={handleSignOut} disabled={loading}>
                            {loading ? <LoadingSpinner /> : <>Sign out</>}
                        </button>
                    </> :
                    
                    <>
                        <span className="text-red-600 font-bold my-2">You are already signed out.</span>
                    </>
                
                }

                

            </div>
        </div>
    )
}