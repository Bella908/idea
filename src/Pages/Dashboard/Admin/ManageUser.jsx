import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../../Shared/LoadingSpnner';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';

const ManageUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user: loggedInUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async (userRole) => {
      const { data } = await axios.patch(`canvas-server-pi.vercel.app/users/update/${selectedUser?.email}`, userRole);
      return data;
    },
    onSuccess: (data) => {
      toast.success('User role updated successfully!');
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const handleMakeAdmin = async (user) => {
    if (loggedInUser.email === user.email) {
      toast.error('Action Not Allowed');
      return;
    }

    const userRole = {
      role: 'admin',
      status: 'Verified',
    };

    setSelectedUser(user);

    try {
      await mutation.mutateAsync(userRole);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { data: users = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('canvas-server-pi.vercel.app/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error fetching users: {error.message}</div>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email address</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.photoURL} alt="User Avatar" />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                
                <td>
                  <button className='btn bg-[#7091E6] text-yellow-200' onClick={() => handleMakeAdmin(user)}>
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
