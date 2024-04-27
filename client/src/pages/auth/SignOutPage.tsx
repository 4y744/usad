//Import custom hooks
import { useSignOut } from "../../hooks/auth"

//Import components
import { LoadingSpinner } from "../../components/LoadingSpinner";

//Import React hooks
import { useContext } from "react";

//Import contexts
import { AuthContext } from "../../App";

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const SignOutPage = () => {
    
    const [SignOut, loading] = useSignOut("/");

    const handleSignOut = () => {
        SignOut();
    }

    const {username, email, logged} = useContext(AuthContext);

    const {t} = useTranslation();

    return (

        <PageWrapper
        center={true}>

            <div className="flex justify-start items-start flex-col gap-3 
            rounded-md p-6 shadow-md text-white bg-zinc-900 sm:w-96 w-80">

                <h1 className="text-2xl font-bold">{t("signout")}</h1>
                <span>{t("want-to-sign-out")}</span>

                {logged ?
                    <>
                        {/* <span className="">Currently signed in as 
                            <span className="font-bold text-green-600 ml-2">{username}</span>
                        </span> */}

                        <div className="bg-zinc-800 w-full p-2 rounded-md">
                            <h1 className="font-semibold mb-1">{t("current-user-info")}</h1>
                            <div className="w-full text-sm">
                                <span>{t("username")}:</span>
                                <span className="text-green-600 font-bold ml-1">{username}</span>
                            </div>
                            <div className="w-full text-sm">
                                <span>{t("email")}:</span>
                                <span className="text-green-600 font-bold ml-1">{email}</span>
                            </div>
                        </div>

                        <button className={`bg-green-700 outline-offset-2 outline-2 
                        outline-green-600 w-full h-12 rounded-md flex justify-center items-center 
                        ${loading ? "opacity-50" : "opacity-100 hover:bg-green-600 active:outline"}`} 
                        onClick={handleSignOut} disabled={loading}>
                            {loading ? <LoadingSpinner /> : t("signout")}
                        </button>
                    </> :
                    
                    <>
                        <span className="text-red-600 font-bold my-2">{t("already-signed-out")}</span>
                    </>
                
                }

                

            </div>

        </PageWrapper>
    )
}