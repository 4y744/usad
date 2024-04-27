import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthContext } from "../../App"

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
import { DashboardPage } from "../../pages/protected/DashboardPage";
import { ProtectedRoute } from "../ProtectedRoute";
import { CreatePage } from "../../pages/protected/CreatePage";
import { BrowsePage } from "../../pages/dynamic/BrowsePage";
import { SearchPage } from "../../pages/dynamic/SearchPage";
import { TermsOfUsePage } from "../../pages/static/TermsOfUsePage";
import { ForkPage } from "../../pages/protected/ForkPage";
import { EditPage } from "../../pages/protected/EditPage";

export const Content = () => {

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
                        path="terms-of-use" 
                        element={<TermsOfUsePage/>} />

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
                            path="dashboard" 
                            element={<DashboardPage/>} />

                            <Route 
                            path="create" 
                            element={<CreatePage/>}/>

                            <Route 
                            path="fork/:id" 
                            element={<ForkPage/>}/>

                            <Route 
                            path="edit/:id" 
                            element={<EditPage/>}/>

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