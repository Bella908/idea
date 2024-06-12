import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../../Shared/LoadingSpnner';
import { FcApproval } from 'react-icons/fc';
import { MdOutlineDelete } from 'react-icons/md';
import { GiProgression } from 'react-icons/gi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddedClassAdmin = () => {
    const queryClient = useQueryClient();
    const [selectedUser, setSelectedUser] = useState(null);

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




    const mutation = useMutation({
        mutationFn: async ({ id, userStatus }) => {
          const { data } = await axios.patch(`canvas-server-pi.vercel.app/allclasses/${id}`, { status: userStatus });
          return data;
        },
        onSuccess: (data) => {
          toast.success('Accepted!');
          queryClient.invalidateQueries(['teacherReq']); // This will trigger a refetch
        },
        onError: (err) => {
          toast.error(err.message);
          queryClient.invalidateQueries(['teacherReq']);
        },
      });
    
      const handleApprove = async (user) => {
        const userRole = {
          id: user._id,
          userStatus: 'Accepted',
        };
    
        setSelectedUser(user);
    
        try {
          await mutation.mutateAsync(userRole);
        } catch (err) {
          toast.error(err.message);
        }
      };
    
      const handleReject = async (user) => {
        const userRole = {
          id: user._id,
          userStatus: 'Rejected',
        };
    
        setSelectedUser(user);
    
        try {
          await mutation.mutateAsync(userRole);
        } catch (err) {
          toast.error(err.message);
        }
      };
    
    

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error fetching classes</div>;



    return (
        <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Email</th>
                <th>Shortdescription</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-square w-12 h-12">
                        <img src={user.image} alt="User Avatar" />
                      </div>
                    </div>
                  </td>
                  <td>{user.title}</td>
                  <td>{user.email}</td>
                  <td>{user.shortDescription}</td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  
                  </td>
                  <td>
              <div className="flex gap-3">
                <button
                  className='btn bg-green-100'
                  onClick={() => handleApprove(user)}
                  disabled={user.status === 'Accepted' || user.status === 'Rejected'}
                >
                  <FcApproval />
                </button>
                <button
                  className='btn text-red-700 bg-red-100'
                  onClick={() => handleReject(user)}
                  disabled={user.status === 'Accepted' || user.status === 'Rejected'}
                >
                  <MdOutlineDelete />
                </button>
          <div>
          {user.status !== 'Accepted' ? (
                     <button
                     className='btn text-blue-700 bg-blue-100'
                     disabled={user.status !== 'Accepted'}
                   >
                     <GiProgression />
                   </button>
                    ) : (
                      <Link to={`${user._id}`} className="mt-6">
                        <button
                     className='btn text-blue-700 bg-blue-100'
                     disabled={user.status !== 'Accepted'}
                   >
                     <GiProgression />
                   </button>
                      </Link>
                    )}
          </div>
               
              </div>
            </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AddedClassAdmin;