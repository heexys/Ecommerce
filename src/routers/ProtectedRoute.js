import React from 'react';
import useAuth from '../custom-hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import useGetData from '../custom-hooks/useGetData';

const ProtectedRoute = () => {
    const { data: usersData, loading } = useGetData('users');
    const { currentUser } = useAuth();

    if (loading || !usersData) {
        return <p>Loading...</p>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const user = usersData.find(user => user.id === currentUser.uid);

    if (String(user.admin) === String(true)) {
        return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
