//Import React hooks
import { useState } from "react"

//Import React Router hooks
import { Link } from "react-router-dom"

//Import auth hooks
import { useSignIn } from "../../hooks/auth";

//Import components
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { PageWrapper } from "../../components/Layout/PageWrapper";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const SignInPage = () => {
    
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [buttonPressed, setButtonPressed] = useState(false);

    const [SignIn, loading, error] = useSignIn("/");

    const {t} = useTranslation();

    const handleSignIn = () => {

        setButtonPressed(true);

        SignIn(credentials);

    }
  
    return (
        <PageWrapper
        center={true}>

            <div className="flex justify-start items-start flex-col gap-3 
            rounded-md p-6 shadow-md text-white bg-zinc-900 sm:w-96 w-80">

                <h1 className="text-2xl font-bold">
                    {t("signin")}
                </h1>

                <span>
                    {t("sign-into-your-account")}
                </span>

                <InputField type="email" 
                placeholder={t("email")} 
                setState={(value) => setCredentials({...credentials, email: value})} 
                fieldError={!credentials.email && buttonPressed}/>

                <InputField type="password" 
                placeholder={t("password")} 
                setState={(value) => setCredentials({...credentials, password: value})} 
                fieldError={!credentials.password && buttonPressed}/>

                <span className="text-red-600 font-bold text-sm h-4">
                    {t(error)}
                </span>

                {/* <Link to="" className="text-sm font-semibold text-green-700 hover:underline">
                    Forgot my password
                </Link> */}

                <button className={`bg-green-700 outline-offset-2 outline-2 outline-green-600 w-full h-12 rounded-md
                flex justify-center items-center ${loading ? "opacity-50" : "opacity-100 hover:bg-green-600 active:outline"}`}
                onClick={handleSignIn} disabled={loading}>
                    {loading ? <LoadingSpinner /> : t("signin")}
                </button>

                <Link to="/signup" className="text-sm text-center w-full font-semibold text-green-700 hover:underline">
                    {t("dont-have-an-account")}
                </Link>
                
            </div>

        </PageWrapper>
    )

}

const InputField = (props: {type: string, placeholder: string, setState: (value: string) => void, fieldError: boolean}) => (
    <div className="flex flex-col w-full">
        <input className={`rounded-md bg-zinc-800 h-12 px-3 focus:outline outline-offset-2 outline-2
        outline-green-600 ${props.fieldError ? "outline outline-red-600" : "outline-green-600"}`}
        type={props.type} placeholder={props.placeholder} onChange={(event) => props.setState(event.target.value)}/>
    </div>
);