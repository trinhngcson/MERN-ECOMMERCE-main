import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';


const ProtectedRoute = ({
    load,
    isAuth,
    children,
    adminRoute,
    isAdmin,
    redirect = "/login",
    redirectAdmin = "/profile"
    })=> {
    if(!isAuth){
        return <Navigate to = {redirect} />
    }
    if (adminRoute && !isAdmin){
        return <Navigate to = {redirectAdmin} />
    }
    return children ? children: <Loader />;
};

export default ProtectedRoute