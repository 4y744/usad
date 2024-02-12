import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthContext } from "../../contexts"

//Import page components
import { HomePage } from "../../pages/static/HomePage";
import { SignInPage } from "../../pages/auth/SignInPage";
import { SignOutPage } from "../../pages/auth/SignOutPage";
import { SignUpPage } from "../../pages/auth/SignUpPage";
import { AboutPage } from "../../pages/static/AboutPage";
import { AlgorithmPage } from "../../pages/dynamic/AlgorithmPage";
import { NotFoundPage } from "../../pages/static/NotFoundPage";
import { LoadingPage } from "../../pages/static/LoadingPage";
import { UserPage } from "../../pages/dynamic/UserPage";
import { BlockEditor } from "../AlgorithmEditor/BlockEditor";
import { DashboardPage } from "../../pages/protected/DashboardPage";
import { ProtectedRoute } from "../Router/ProtectedRoute";
import { CreatePage } from "../../pages/protected/CreatePage";
import { SettingsPage } from "../../pages/dynamic/SettingsPage";
import { BrowsePage } from "../../pages/dynamic/BrowsePage";
import { SearchPage } from "../../pages/dynamic/SearchPage";

export const MainContent = () => {

    const {loading} = useContext(AuthContext);

    return (
        <div className="min-h-[80vh]">  
                {loading ? <LoadingPage/> : 
                    <Routes>

                        {/* Generic routes */}
                        <Route
                        path="" 
                        element={<HomePage/>} />

                        <Route 
                        path="signin" 
                        element={<SignInPage/>} />

                        <Route 
                        path="signup" 
                        
                        element={<SignUpPage/>} />
                        <Route 
                        path="signout" 
                        element={<SignOutPage/>} />

                        <Route 
                        path="user/:username" 
                        element={<UserPage/>} />

                        <Route 
                        path="about" 
                        element={<AboutPage/>} />

                        <Route 
                        path="browse" 
                        element={<BrowsePage/>} />

                        <Route 
                        path="search/:query" 
                        element={<SearchPage/>} />

                        <Route 
                        path="algorithm/:id" 
                        element={<AlgorithmPage/>} />

                        {/* Protected routes */}
                        <Route path="/" element={<ProtectedRoute/>}>
                            <Route 
                            path="settings" 
                            element={<SettingsPage/>}>

                                {/* <Route 
                                path="s1" 
                                element={<h1>s1</h1>}/>

                                <Route 
                                path="s2" 
                                element={<h1>s2</h1>}/> */}

                            </Route>

                            <Route 
                            path="dashboard" 
                            element={<DashboardPage/>} />

                            <Route 
                            path="create" 
                            element={<CreatePage/>}/>

                        </Route>
                        
                        {/* 404 page */}
                        <Route 
                        path="*" 
                        element={<NotFoundPage/>} />

                    </Routes>
                }
        </div>
    )
}