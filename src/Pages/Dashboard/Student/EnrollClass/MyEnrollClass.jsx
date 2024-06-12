import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpnner';
import useAuth from '../../../../Hooks/useAuth';


const MyEnrollClass = () => {
    const { user } = useAuth();
    const { data: enrolledClasses = [], isLoading, isError } = useQuery({
        queryKey: ['enrolledClasses'],
        queryFn: async () => {
            try {
                const response = await fetch('canvas-server-pi.vercel.app/enrollClass');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            } catch (error) {
                console.error('Error fetching enrolled classes:', error);
                throw new Error('Failed to fetch enrolled classes');
            }
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error fetching enrolled classes</div>;

    // Filter enrolled classes based on user email
    const filteredClasses = enrolledClasses.filter(classItem => classItem.email === user.email);

    return (
        <div className="px-10 py-20 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold mb-10">Enrolled Classes</h2>
                {filteredClasses.length === 0 ? (
                    <p className="text-xl text-center text-gray-500">You have not enrolled in any classes yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredClasses.map((classItem) => (
                            <div key={classItem._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img
                                    className="h-48 w-full object-cover"
                                    src={classItem.image || 'https://via.placeholder.com/400'}
                                    alt={classItem.title}
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
                                    <p className="text-gray-700 mb-4">Posted by: {classItem.postedBy}</p>
                                    <Link to={`${classItem.classId}`}>
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                            Continue
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEnrollClass;
