import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpnner';
import Heading from '../../../Shared/Heading';

const SeeDetails = () => {
    const {id} =useParams()


    const { data: classDetailes = {}, isLoading, isError } = useQuery({
        queryKey: ['classDetails' ,id],
        queryFn: async () => {
            try {
                const response = await fetch(`http://localhost:5000/class/${id}`);
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
        <div className="container mx-auto p-4">
        <div className="text-3xl text-center mb-8">
          Details about <span className="text-[#3D52A0] font-bold">{classDetailes.title}</span>
        </div>
        <div>

            {/* classprogess section */}
            <div>
            <Heading
            center={true}
            title='Classprogress section'
           
          />
            
            </div>
        </div>

        <div>
        <div>
            <Heading
            center={true}
            title='Class assignment'
           
          />
            
            </div>
        </div>
       
      </div>
      
    );
};

export default SeeDetails;