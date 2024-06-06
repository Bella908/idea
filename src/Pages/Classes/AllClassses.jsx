import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpnner';
import ClassCard from './ClassCard';

const AllClasses = () => {
    const { data: classes = [], isLoading, isError } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            try {
                const response = await fetch('http://localhost:5000/allclasses');
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

    return (
        <div>
            {/* Hero section */}
            <div className="hero h-[800px]" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Classes</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            {/* Classes Cards */}
            <div>
                {classes && classes.length > 0 ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 justify-center'>
                        {classes.map(c => <ClassCard key={c._id} classData={c} />)}
                    </div>
                ) : (
                    <div>
                        <h3>Nothing to display</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllClasses;
