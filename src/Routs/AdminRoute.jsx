import React from 'react';

const AdminRoute = () => {
    const [role, isLoading] = useRouteLoaderData()

  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' />
};

export default AdminRoute;