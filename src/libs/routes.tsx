//Import React Router hooks
import { Routes, Route } from "react-router-dom"

//Import page components
import { HomePage, AboutPage, AlgorithmPage, NotFoundPage, SignInPage, SignUpPage } from "../libs/exports"
import { SignOutPage } from "../pages/SignOutPage"

let ROUTES = [
    { path: "", element: <HomePage/> },
    { path: "signin", element: <SignInPage/> },
    { path: "signup", element: <SignUpPage/> },
    { path: "signout", element: <SignOutPage/> },
    { path: "about", element: <AboutPage/>},
    { path: "algorithm/:id", element: <AlgorithmPage/>},
    { path: "*", element: <NotFoundPage/> } 
]

export const RouterContainer = () => (
    <div className="min-h-[calc(100dvh-250px)]">
        <Routes>
        {ROUTES.map((ROUTE) => <Route {...ROUTE} key={ROUTE.path}/>)}
        </Routes>
    </div>
)