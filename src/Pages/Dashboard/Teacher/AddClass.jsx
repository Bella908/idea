import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useAuth from '../../../Hooks/useAuth';

const AddClass = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    title: '',
    postedBy: '',
    email: '',
    price: '',
    shortDescription: '',
    image: '',
    photo: ''
  });

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        postedBy: user.displayName || '',
        email: user.email || '',
        photo: user.photoURL || '',

      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 
  const mutation = useMutation({
    mutationFn: (formData) => {
      return fetch('http://localhost:5000/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['classes']);
      Swal.fire({
        icon: 'success',
        title: 'Class Added',
        text: 'The class has been added successfully!',
      });
      navigate('/dashboard/myClass'); // Navigate to another page
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    },
  });

  const handleAddClass = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen p-6 bg-[#ADBBDA] flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-white">Add a Class</h2>
          <p className="text-gray-500 mb-6">Fill-up this form to add a class</p>
          <form onSubmit={handleAddClass}>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Details about the class</p>
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
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="postedBy"
                        id="name"
                        readOnly
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.postedBy}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.email}
                        readOnly
                        placeholder="email@domain.com"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="image">Image</label>
                      <input
                        type="text"
                        name="image"
                        id="image"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.image}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="description">shortDescription</label>
                      <input
                        type="text"
                        name="shortDescription"
                        id="description"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formData.shortDescription}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          disabled={mutation.isLoading}
                        >
                          {mutation.isLoading ? 'Adding...' : 'Add Class'}
                        </button>
                      </div>
                      {mutation.isError && (
                        <div className="text-red-500 mt-2">
                          {mutation.error.message}
                        </div>
                      )}
                      {mutation.isSuccess && (
                        <div className="text-green-500 mt-2">
                          Class added successfully!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
