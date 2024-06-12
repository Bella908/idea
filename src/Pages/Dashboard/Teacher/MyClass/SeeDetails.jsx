import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpnner';
import Heading from '../../../Shared/Heading';
import ReactDatePicker from 'react-datepicker';
import { FaPlus } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for the date picker
import Swal from 'sweetalert2'; // Import SweetAlert

const SeeDetails = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const { data: classDetails = {}, isLoading, isError } = useQuery({
        queryKey: ['classDetails', id],
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


    const { data: assign = {}} = useQuery({
        queryKey: ['classDetails', id],
        queryFn: async () => {
            try {
                const response = await fetch(`http://localhost:5000/assignment/${id}`);
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

    const totalAssignments = assign.length;





    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error fetching classes</div>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    // hamdel assigment
    const handleSubmit = async (e) => {
        e.preventDefault();
        const assignmentData = {
            ...formData,
            startDate: startDate.toISOString(), // Convert date to ISO string format
            classId: id, // Link the assignment to the specific class
        };

        try {
            const response = await fetch(`http://localhost:5000/assignment/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignmentData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Assignment added:', result);
            setIsOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Assignment Created',
                text: 'Your assignment has been created successfully!',
            });
        } catch (error) {
            console.error('Error adding assignment:', error);
        }
    };

 

    return (
        <div className="container mx-auto p-4">
            <div className="text-3xl text-center mb-8">
                Details about <span className="text-[#3D52A0] font-bold">{classDetails.title}</span>
            </div>
            {/* state */}
            <div>
                <Heading center={true} title="Classprogress section" />
                <div className="flex justify-center my-11 "> {/* Flexbox container for centering */}
                    <div className="stats shadow">
                        <div className="stat place-items-center">
                            <div className="stat-title">Total enrollment</div>
                            <div className="stat-value">31K</div>
                            
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Total assignment</div>
                            <div className="stat-value text-secondary">{totalAssignments}</div>
                            
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Per dayassignment submited</div>
                            <div className="stat-value">1,200</div>
                           
                        </div>
                    </div>
                </div>
            </div>

{/* class assigment */}


            <div>
                <Heading center={true} title="Class assignment" />
            </div>
            <button className="btn bg-blue-100 text-blue-500" onClick={() => setIsOpen(true)}>
                <FaPlus /> Create
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
                                    Assignment
                                </h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="items-center justify-between w-full mt-5 gap-x-2">
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">Assignment Title</p>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    />
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">Assignment Description</p>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="flex-1 block h-10 mt-2 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    />
                                    <div className="mt-4 ml-3">
                                        <h3>Assignment Deadline</h3>
                                        <ReactDatePicker
                                            className="border p-2 rounded-md"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            showTimeSelect={false}
                                        />
                                    </div>
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
                                        Add Assignment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeeDetails;
