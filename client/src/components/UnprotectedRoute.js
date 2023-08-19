import React from "react";
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const UnprotectedRoute = ({ children }) => {
    const [cookies] = useCookies(['user']);
    const token = cookies.AuthToken
    if (token) {
        return <Navigate to="/explore" replace />
    }
    else {
        return children;
    }
}


export default UnprotectedRoute;
