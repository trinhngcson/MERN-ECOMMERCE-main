import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';


const ProtectedRoutes = ({
    load,
    isAuth,
    redirectPath = "/login",
    children
    })=> {
    if (load !== true){
        return isAuth ? children : <Navigate to= {redirectPath} />;    
    }
    return <Loader />;
};

export default ProtectedRoutes