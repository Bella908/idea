import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpnner';
import ClassCard from './ClassCard';

const AllClasses = () => {
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

    // Filter accepted classes
    const acceptedClasses = classes.filter((classData) => classData.status === 'Accepted');

    return (
        <div>
            {/* Hero section */}
            <div className="hero h-[800px]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Classes</h1>
                       
                    </div>
                </div>
            </div>
            {/* Classes Cards */}
            <div>
                {acceptedClasses && acceptedClasses.length > 0 ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 justify-center'>
                        {acceptedClasses.map((classData) => <ClassCard key={classData._id} classData={classData} />)}
                    </div>
                ) : (
                    <div>
                        <h3 className='text-center text-3xl font-bold m-52'>No accepted classes available</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllClasses;
