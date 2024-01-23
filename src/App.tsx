//Import React Router hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Import components
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";

//Import page components
import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";
import { SignOutPage } from "./pages/SignOutPage";
import { SignUpPage } from "./pages/SignUpPage";
import { AboutPage } from "./pages/AboutPage";
import { AlgorithmPage } from "./pages/AlgorithmPage";
import { NotFoundPage } from "./pages/NotFoundPage";

//Import i18n hooks
import './locale/config';
import { useUser } from "./hooks/auth";
import { createContext } from "react";
import { LoadingPage } from "./pages/LoadingPage";
import { UserPage } from "./pages/UserPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { BlockEditor } from "./pages/BlockEditor";

let ROUTES = [
    { path: "", element: <HomePage/> },
    { path: "signin", element: <SignInPage/> },
    { path: "signup", element: <SignUpPage/> },
    { path: "signout", element: <SignOutPage/> },
    { path: "about", element: <AboutPage/>},
    { path: "algorithm/:id", element: <AlgorithmPage/>},
    { path: "*", element: <NotFoundPage/> } 
]

export const AuthContext = createContext({username: "", email: "", logged: false, loading: true});

export const App = () => {

    const user = useUser();

    return (
    <AuthContext.Provider value={{...user}}>
        <BrowserRouter>
            <Navbar/>
            <Sidebar/>
            <ScrollToTop/>
            {/* Content wrapper */}
            <div className={`${user.logged ? "md:ml-14 md:mb-0 mb-14" : ""}`}>
            {/* Sets margin for side bar on mobile */}

                {/* Main content */}
                <div className="min-h-[80dvh] md:pt-14 pt-16">
                    
                {/* Loads either the loading page or the routes */}
                {user.loading ? <LoadingPage/> : 
                    <Routes>
                        <Route path="" element={<HomePage/>} />
                        <Route path="signin" element={<SignInPage/>} />
                        <Route path="signup" element={<SignUpPage/>} />
                        <Route path="signout" element={<SignOutPage/>} />
                        <Route path="editor" element={<BlockEditor/>}/>
                        <Route path="user/:username" element={<UserPage/>} />
                        <Route path="about" element={<AboutPage/>} />
                        <Route path="algorithm/:id" element={<AlgorithmPage/>} />
                        <Route path="*" element={<NotFoundPage/>} />
                    </Routes>
                }
                </div>

                <Footer/>
            </div>
        </BrowserRouter>
    </AuthContext.Provider>
    )
}

/*
TODO: ADD TO NAVBAR
          <Register/>
          <Login />
          <div>Logged in user: {currentUser?.email}</div>
          <button onClick={async () => {await signOut(auth)}}>Sign out</button>
*/