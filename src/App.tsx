//Import React Router hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Import components
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";

//Import page components
import { HomePage } from "./pages/static/HomePage";
import { SignInPage } from "./pages/auth/SignInPage";
import { SignOutPage } from "./pages/auth/SignOutPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { AboutPage } from "./pages/static/AboutPage";
import { AlgorithmPage } from "./pages/dynamic/AlgorithmPage";
import { NotFoundPage } from "./pages/static/NotFoundPage";
import { LoadingPage } from "./pages/static/LoadingPage";
import { UserPage } from "./pages/dynamic/UserPage";
import { BlockEditor } from "./pages/protected/BlockEditor";
import { DashboardPage } from "./pages/protected/DashboardPage";

//Import i18n hooks
import './locale/config';

//Auth hooks
import { useUser } from "./hooks/auth";

//Import utils
import { ScrollToTop } from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/router/ProtectedRoute";

//Import contexts
import { AuthContext } from "./contexts";
import { CreatePage } from "./pages/protected/CreatePage";
import { SettingsPage } from "./pages/dynamic/SettingsPage";




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
                <div className="min-h-[80vh] md:pt-14 pt-16">
                    
                {/* Loads either the loading page or the routes */}
                {user.loading ? <LoadingPage/> : 
                    <Routes>
                        {/* Generic routes */}
                        <Route path="" element={<HomePage/>} />
                        <Route path="signin" element={<SignInPage/>} />
                        <Route path="signup" element={<SignUpPage/>} />
                        <Route path="signout" element={<SignOutPage/>} />
                        <Route path="user/:username" element={<UserPage/>} />
                        <Route path="about" element={<AboutPage/>} />
                        <Route path="algorithm/:id" element={<AlgorithmPage/>} />

                        {/* Protected routes */}
                        <Route path="/" element={<ProtectedRoute/>}>
                            <Route path="settings" element={<SettingsPage/>}>
                                <Route path="s1" element={<h1>s1</h1>}/>
                                <Route path="s2" element={<h1>s2</h1>}/>
                            </Route>
                            <Route path="dashboard" element={<DashboardPage/>} />
                            <Route path="create" element={<CreatePage/>}/>
                            <Route path="editor" element={<BlockEditor/>}/>
                        </Route>
                        
                        {/* 404 page */}
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