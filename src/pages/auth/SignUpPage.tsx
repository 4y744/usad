//Import React hooks
import { useEffect, useState } from "react";

//Import React Router hooks
import { Link } from "react-router-dom";

//Import auth hooks
import { useSignUp } from "../../hooks/auth";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const SignUpPage = () => {

    const [credentials, setCredentials] = useState({username: "", email: "", password: "", confirmPassword: ""});
    const [buttonPressed, setButtonPressed] = useState(false);

    const [SignUp, loading, error] = useSignUp("/");

    const handleSignUp = () => {
        setButtonPressed(true);
        SignUp(credentials);
    };


    return (
        <div className="flex justify-center items-center w-full my-16">
            <div className="flex justify-start items-start flex-col gap-3 rounded-md p-6 shadow-md text-white bg-zinc-900 sm:w-96 w-80">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <span>Create an account to join and contribute.</span>

                <InputField type="text" placeholder="Username" fieldError={!credentials.username && buttonPressed} 
                setState={(value) => setCredentials({...credentials, username: value})}/>

                <InputField type="text" placeholder="Email" fieldError={!credentials.email && buttonPressed} 
                setState={(value) => setCredentials({...credentials, email: value})}/>

                <InputField type="password" placeholder="Password" fieldError={!credentials.password && buttonPressed} 
                setState={(value) => setCredentials({...credentials, password: value})}/>

                <InputField type="password" placeholder="Confirm password" fieldError={!credentials.confirmPassword && buttonPressed} 
                setState={(value) => setCredentials({...credentials, confirmPassword: value})}/>

                <span className="text-red-600 font-bold text-sm h-4">
                    {error}
                </span>

                <Link to="" className="text-sm font-semibold text-green-700 hover:underline">
                    Forgot my password
                </Link>

                <button className={`flex justify-center items-center w-full h-12 rounded-md 
                bg-green-700 outline-offset-2 outline-2 outline-green-600
                ${loading ? "opacity-50" : "opacity-100 hover:bg-green-600 active:outline"}`} 
                onClick={handleSignUp} disabled={loading}>
                    {loading ? <LoadingSpinner /> : <>Sign up</>}
                </button>
            </div>
        </div>
    );
};

const InputField = (props: {type: string, placeholder: string, setState: (value: string) => void, fieldError: boolean}) => (
    <div className="flex flex-col w-full">
        <input className={`rounded-md bg-zinc-800 h-12 px-3 focus:outline outline-offset-2 outline-2
        outline-green-600 ${props.fieldError ? "outline outline-red-600" : "outline-green-600"}`}
        type={props.type} placeholder={props.placeholder} onChange={(event) => props.setState(event.target.value)}/>
    </div>
);


