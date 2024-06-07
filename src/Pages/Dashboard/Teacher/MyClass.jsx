import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const MyClass = () => {
  const { user } = useAuth();

  const { data: classes = [], isLoading, isError, error } = useQuery({
    queryKey: ['myclass', user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/myclass/${user?.email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!user?.email, // Ensure the query runs only if user.email is available
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <p>Total classes: {classes.length}</p>
      {classes.map((classItem) => (
        <p key={classItem._id}>{classItem.title}</p>
      ))}
    </div>
  );
};

export default MyClass;
