import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FcApproval } from "react-icons/fc";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Shared/LoadingSpnner";
import { useState } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

const TeacherReq = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: teacherReq = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['teacherReq'],
    queryFn: async () => {
      const response = await fetch('https://canvas-server-pi.vercel.app/teachOn');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, userStatus }) => {
      const { data } = await axios.patch(`https://canvas-server-pi.vercel.app/teachOn/${id}`, { status: userStatus });
      return data;
    },
    onSuccess: async (data, variables) => {
      if (variables.userStatus === 'Accepted') {
        // Update the user's role to teacher if the status is Accepted
        await axios.patch(`https://canvas-server-pi.vercel.app/users/update/${selectedUser?.email}`, { role: 'teacher' });
      }

      queryClient.invalidateQueries(['teacherReq']);
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
  if (isError) return <div>Error fetching classes: {error.message}</div>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teacherReq.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.photo} alt="User Avatar" />
                    </div>
                  </div>
                </td>
                <td>{user.full_name}</td>
                <td>{user.experience}</td>
                <td>{user.title}</td>
                <td>{user.category}</td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  {user?.status ? (
                    <p className={`${user.status === 'Accepted' ? 'text-green-500' : user.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'} whitespace-no-wrap`}>
                      {user.status}
                    </p>
                  ) : (
                    <p className='text-yellow-500 whitespace-no-wrap'>
                      Pending
                    </p>
                  )}
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

export default TeacherReq;
