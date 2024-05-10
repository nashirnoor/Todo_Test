import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
    const isAuthenticated = localStorage.getItem('access_token') ? true : false;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
