//Import React hooks
import { useState } from "react";

//Import auth hooks
import { useSignUp } from "../../hooks/auth";

//Import components
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { PageWrapper } from "../../components/Layout/PageWrapper";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const SignUpPage = () => {

    const [credentials, setCredentials] = useState({username: "", email: "", password: "", confirmPassword: ""});
    
    const [buttonPressed, setButtonPressed] = useState(false);

    const {t} = useTranslation();

    const [SignUp, loading, error] = useSignUp("/");

    const handleSignUp = () => {

        setButtonPressed(true);

        SignUp(credentials);

    };

    return (

        <PageWrapper
        center={true}>

            <div className="flex justify-start items-start flex-col gap-3 
            rounded-md p-6 shadow-md text-white bg-zinc-900 sm:w-96 w-80">

                <h1 className="text-2xl font-bold">
                    {t("signup")}
                </h1>

                <span>
                    {t("create-an-account")}
                </span>

                <InputField type="text" 
                placeholder={t("username")}
                fieldError={!credentials.username && buttonPressed} 
                setState={(value) => setCredentials({...credentials, username: value})}/>

                <InputField type="text" 
                placeholder={t("email")} 
                fieldError={!credentials.email && buttonPressed} 
                setState={(value) => setCredentials({...credentials, email: value})}/>

                <InputField type="password" 
                placeholder={t("password")} 
                fieldError={!credentials.password && buttonPressed} 
                setState={(value) => setCredentials({...credentials, password: value})}/>

                <InputField type="password" 
                placeholder={t("confirm-password")} 
                fieldError={!credentials.confirmPassword && buttonPressed} 
                setState={(value) => setCredentials({...credentials, confirmPassword: value})}/>

                <span className="text-red-600 font-bold text-sm h-4">
                    {t(error)}
                </span>

                <button className={`flex justify-center items-center w-full h-12 rounded-md 
                bg-green-700 outline-offset-2 outline-2 outline-green-600
                ${loading ? "opacity-50" : "opacity-100 hover:bg-green-600 active:outline"}`} 
                onClick={handleSignUp} 
                disabled={loading}>
                    {loading ? <LoadingSpinner /> : t("signup")}
                </button>

            </div>
            
        </PageWrapper>

    )
}

const InputField = (props: {type: string, placeholder: string, setState: (value: string) => void, fieldError: boolean}) => {

    return (
    
        <div className="flex flex-col w-full">
        
            <input className={`rounded-md bg-zinc-800 h-12 px-3 focus:outline outline-offset-2 outline-2
            outline-green-600 ${props.fieldError ? "outline outline-red-600" : "outline-green-600"}`}
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={(event) => props.setState(event.target.value)}/>
        
        </div>
    )
}


