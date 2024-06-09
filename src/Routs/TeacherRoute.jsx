import React from 'react';
import useRole from '../Hooks/useRole';
import { Navigate, useRouteLoaderData } from 'react-router-dom';
import LoadingSpinner from '../Pages/Shared/LoadingSpnner';

const TeacherRoute = ({children}) => {
    const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />
  if (role === 'teacher') return children
  return <Navigate to='/dashboard' />
};

export default TeacherRoute;