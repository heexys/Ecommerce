import React from 'react';
import useAuth from '../custom-hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const CheckoutRoute = () => {
    const { currentUser } = useAuth();

        return !currentUser ? <Navigate to="/login" />: <Outlet />;
}
export default CheckoutRoute;
