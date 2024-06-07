import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';

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
      <div className='text-center text-2xl my-10'>
        <p>Total classes: {classes.length}</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center'>
        {classes.map((classItem) => (
          <div key={classItem.id} className='flex justify-center mt-10'>
            <div className="card w-[500px] bg-white shadow-lg ring-1 ring-slate-400 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <figure className="px-10 pt-10">
                <img src={classItem.image} alt={classItem.title} className="rounded-lg object-cover h-48 w-full" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-semibold text-gray-800">{classItem.title}</h2>
                <p className="text-lg text-gray-600 mt-2">Price: ${classItem.price}</p>
                <p className="text-gray-600 mt-2">{classItem.shortDescription}</p>
                <p className="text-gray-500 mt-4">Posted by: {classItem.postedBy}</p>
                <p className="text-gray-500 mt-2">Total Enrollment: {classItem.totalEnrollment}</p>
                <div className='flex gap-3 mt-4'>
                  <div>
                  <Link to={`/class/${classItem.id}`} className="mt-6">
                  <div className="card-actions">
                    <button className="btn bg-[#7091E6] text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-400 transition duration-300">
                    Update
                    </button>
                  </div>
                </Link>
                  </div>
                  <div>
                  <Link to={`/class/${classItem.id}`} className="mt-6">
                  <div className="card-actions">
                    <button className="btn bg-[#3D52A0] text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-400 transition duration-300">
                   See details
                    </button>
                  </div>
                </Link>
                  </div>
                  <div>
                  <Link to={`/class/${classItem.id}`} className="mt-6">
                  <div className="card-actions">
                    <button className="btn bg-red-800 text-white font-semibold py-2 px-4 rounded-lg  hover:bg-slate-400 transition duration-300">
                    Delete
                    </button>
                  </div>
                </Link>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
