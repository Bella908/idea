import React from 'react';
import useRole from '../Hooks/useRole';
import { useRouteLoaderData } from 'react-router-dom';

const TeacherRoute = () => {
    const [role, isLoading] = useRouteLoaderData()

  if (isLoading) return <LoadingSpinner />
  if (role === 'teacher') return children
  return <Navigate to='/dashboard' />
};

export default TeacherRoute;