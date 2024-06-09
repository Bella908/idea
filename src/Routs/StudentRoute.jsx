import React from 'react';

const StudentRoute = () => {
    const [role, isLoading] = useRouteLoaderData()

    if (isLoading) return <LoadingSpinner />
    if (role === 'student') return children
    return <Navigate to='/dashboard' />
};

export default StudentRoute;