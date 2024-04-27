//Import React hooks and misc.
import { createContext, useEffect } from "react";

//Import React Router hooks
import { BrowserRouter } from "react-router-dom";

//Import components
import { Navbar } from "./components/Layout/Navbar";
import { Sidebar } from "./components/Layout/Sidebar";
import { Footer } from "./components/Layout/Footer";
import { Content } from "./components/Layout/Content";

//Import i18n hooks and misc.
import './locale/config';

//Auth hooks
import { useAuth } from "./hooks/auth";

//Import utils
import { ScrollToTop } from "./components/ScrollToTop";

//Importt i18n hooks
import { useTranslation } from "react-i18next";

//Import components
import { Toast } from "./components/Toast";
import { Popup } from "./components/Popup";

//Import types
import { AuthType } from "./types";

//Import contexts
export const AuthContext = createContext<AuthType>({} as AuthType);

export const App = () => {

    const auth = useAuth();

    const {i18n} = useTranslation();

    useEffect(() => {

        const lang = localStorage.getItem("language");
        i18n.changeLanguage(lang || "en");

    }, [])

    return (
        <AuthContext.Provider value={{...auth}}>

            <BrowserRouter>

                    {/* Layout */}
                    <Navbar/>

                    <Sidebar/>

                    <div className={`${auth.logged ? "md:ml-14 md:mb-0 mb-14" : ""}
                    mt-14 bg-zinc-800`}>

                        <Content/>

                        <Footer/>

                    </div>

                    {/* Misc */}
                    <ScrollToTop/> 
                    
                    <Toast/>

                    <Popup/>

            </BrowserRouter>

        </AuthContext.Provider>
    )
}