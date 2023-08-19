import React from "react";
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
    const [cookies] = useCookies(['user']);
    const token = cookies.AuthToken
    if (!token) {
        return <Navigate to="/" replace />
    }
    else {
        return children;
    }
}


export default ProtectedRoute;
