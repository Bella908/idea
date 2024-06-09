import React from 'react';
import useRole from '../Hooks/useRole';
import LoadingSpinner from '../Pages/Shared/LoadingSpnner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' />
};

export default AdminRoute;