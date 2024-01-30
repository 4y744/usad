//Import React Router hooks
import { BrowserRouter } from "react-router-dom";

//Import components
import { Navbar } from "./components/Layout/Navbar";
import { Sidebar } from "./components/Layout/Sidebar";
import { Footer } from "./components/Layout/Footer";
import { MainContent } from "./components/Layout/MainContent";

//Import i18n hooks
import './locale/config';

//Auth hooks
import { useUser } from "./hooks/auth";

//Import utils
import { ScrollToTop } from "./components/ScrollToTop";

//Import contexts
import { AuthContext } from "./contexts";

export const App = () => {

    const user = useUser();

    return (
    <AuthContext.Provider value={{...user}}>
        <BrowserRouter>
            <Navbar/>
            <Sidebar/>
            <ScrollToTop/> 
            <div className={`${user.logged ? "md:ml-14 md:mb-0 mb-14" : ""}`}>
                <MainContent/>
                <Footer/>
            </div>

        </BrowserRouter>
    </AuthContext.Provider>
    )
}