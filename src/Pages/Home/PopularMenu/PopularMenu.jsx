import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpnner';

const PopularMenu = () => {
  const { user } = useAuth();
  const { data: classes = [], isLoading, isError } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      try {
        const response = await fetch('canvas-server-pi.vercel.app/allclasses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching classes:', error);
        throw new Error('Failed to fetch classes');
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error fetching classes</div>;

  const acceptedClasses = classes.filter((classData) => classData.status === 'Accepted');

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl text-center my-8">Popular Course</div>
      <div className="carousel">
        {acceptedClasses.map((classData) => (
          <div key={classData._id} className="carousel-item">
            <div className="w-96 bg-white shadow-lg ring-1 ring-slate-400 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 mx-7">
              <figure className="px-10 pt-10">
                <img src={classData.image} alt={classData.title} className="rounded-lg object-cover h-48 w-full" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-semibold text-gray-800">{classData.title}</h2>
                <p className="text-lg text-gray-600 mt-2">Price: ${classData.price}</p>
                <p className="text-gray-600 mt-2">{classData.shortDescription}</p>
                <p className="text-gray-600">Posted By:</p>
                <div className="flex items-center justify-center gap-2">
                  <img src={classData.photo} alt={classData.postedBy} className="w-10 h-10 rounded-full object-cover" />
                  <p className="text-gray-500"> {classData.postedBy}</p>
                </div>
                <p className="text-gray-500 mt-2">Total Enrollment: {classData.totalEnrollment}</p>
                {user ? (
                  <Link to={`/class/${classData._id}`} className="mt-6">
                    <div className="card-actions">
                      <button className="btn bg-amber-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-400 transition duration-300">
                        Enroll Now
                      </button>
                    </div>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="btn bg-[#043BD4] text-white">Enroll Now</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMenu;
