import { useContext } from "react";
import { AuthContext } from "../App";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {

    const {logged} = useContext(AuthContext);

    return (
        logged ? <Outlet /> : <Navigate to="/signin"/>
    )
}