import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const TeachOn = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  
  const initialFormData = {
    full_name: '',
    email: '',
    title: '',
    experience: '',
    category: '',
    photo: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
      
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

  const handelRequest = async () => {
    try {
      const currentUser = {
        email: user?.email,
        role: 'guest',
        status: 'Requested',
      };
      const { data } = await axios.put('http://localhost:5000/user', currentUser);
      console.log(data);
      
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const mutation = useMutation({
    mutationFn: (formData) => {
      return fetch('http://localhost:5000/teachOn', {
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
      queryClient.invalidateQueries(['teacher']);
      Swal.fire({
        icon: 'success',
        title: 'Submitted',
        text: 'The review has been sent successfully!',
      });
      setFormData(initialFormData); // Reset form data
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
    console.log(handelRequest()); // Call handelRequest here
    mutation.mutate(formData);
  };

  if (!user) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="min-h-screen p-6 bg-[#7091E6] flex items-center justify-center pt-36">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-3xl text-white">
            Teach On <span className="text-yellow-300">Idea</span>
          </h2>
          <p className="text-white mb-6">Fill up this form to teach on idea.</p>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
                <div className="avatar">
                  <div className="w-20 rounded-full mt-6">
                    {user && <img src={user.photoURL} alt="User avatar" />}
                  </div>
                </div>
              </div>
              <form onSubmit={handleAddClass} className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="experience">Experience</label>
                    <select
                      name="experience"
                      id="experience"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="mid-level">Mid-Level</option>
                      <option value="experienced">Experienced</option>
                    </select>
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      id="category"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="webdevelopment">Web Development</option>
                      <option value="digitalmarketing">Digital Marketing</option>
                      <option value="datascience">Data Science</option>
                      <option value="graphicdesign">Graphic Design</option>
                      <option value="contentwriting">Content Writing</option>
                    </select>
                  </div>
                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit for review
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachOn;
