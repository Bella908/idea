

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        shortDescription: '',
        image: '',
      
    });

    useEffect(() => {
        // Fetch the existing class details
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`canvas-server-pi.vercel.app/classes/${id}`);
                const data = await response.json();
                setFormData({
                    title: data.title,
                    price: data.price,
                    shortDescription: data.shortDescription,
                    image: data.image,
                   
                });
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };

        fetchClassDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`canvas-server-pi.vercel.app/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Class Updated',
                text: 'The class has been updated successfully!',
            });
            navigate('/dashboard/myClass'); // Redirect to another page
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
            console.error('Error updating class:', error);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-[#ADBBDA] flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <h2 className="font-semibold text-xl text-white">Update Class</h2>
                <p className="text-gray-500 mb-6">Edit the form to update the class details</p>
                <form onSubmit={handleUpdate}>
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Class Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="shortDescription">Description</label>
                                        <input
                                            type="text"
                                            name="shortDescription"
                                            id="shortDescription"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={formData.shortDescription}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="image">Image URL</label>
                                        <input
                                            type="url"
                                            name="image"
                                            id="image"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={formData.image}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-5 text-right">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Update Class
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;
