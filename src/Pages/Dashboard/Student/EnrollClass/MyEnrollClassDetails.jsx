import React, { useState, useEffect } from 'react';
import { MdOutlineReviews } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import ReactStars from 'react-rating-stars-component';
import Heading from '../../../Shared/Heading';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpnner';
import useAuth from '../../../../Hooks/useAuth';
import { useParams } from 'react-router-dom';


const MyEnrollClassDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ description: '', rating: 0, userName: '', userImage: '' });
    const { user } = useAuth();
    const {classId} = useParams();
    console.log(classId)

    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                userName: user.displayName,
                userImage: user.photoURL,
            }));
        }
    }, [user]);

    const { data: assignment = [], isLoading: isLoadingAssignments, isError: isErrorAssignments } = useQuery({
        queryKey: ['assignment'],
        queryFn: async () => {
            try {
                const response = await fetch(`https://canvas-server-pi.vercel.app/assignment`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            } catch (error) {
                console.error('Error fetching assignments:', error);
                throw new Error('Failed to fetch assignments');
            }
        },
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const ratingChanged = (newRating) => {
        setFormData({ ...formData, rating: newRating });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://canvas-server-pi.vercel.app/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    classId: classId // Assuming classId is defined somewhere in your component or fetched from props
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Feedback submitted:', result);
            setIsOpen(false);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) {
            return 'Invalid Date';
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const filteredFeedback = assignment.filter(feed => feed.classId === classId);



    return (
        <div>
            <div>
                <Heading center={true} title={'Assignment section'}></Heading>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFeedback.map((assign) => (
                                <tr key={assign._id}>
                                    <td>{assign.title}</td>
                                    <td>{assign.description}</td>
                                    <td>{formatDate(assign.startDate)}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        <div className="flex gap-3">
                                            <button
                                                className='btn text-blue-700 bg-blue-100'
                                                onClick={() => handleReject(assign)}
                                            >
                                                <IoMdSend />Submit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <div className='text-center my-10 text-xl font-bold'>
                    Teaching Evaluation Report
                </div>
                <button className="btn bg-green-100 text-green-500" onClick={() => setIsOpen(true)}>
                    <MdOutlineReviews />TER
                </button>
                {isOpen && (
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                                <div className="mt-5 text-center">
                                    <h3 className="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                                        Teaching Evaluation Report
                                    </h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="items-center justify-between w-full mt-5 gap-x-2">
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">Description</p>
                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        />
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">Ratings</p>
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={24}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                            value={formData.rating}
                                            className="flex-1 block h-10 mt-2 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        />
                                    </div>
                                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEnrollClassDetails;
