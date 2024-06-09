import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FcApproval } from "react-icons/fc";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Shared/LoadingSpnner";
import { useState } from "react";
import axios from "axios";

const TeacherReq = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: teacherReq = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['teacherReq'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/teachOn');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, userStatus }) => {
      const { data } = await axios.patch(`http://localhost:5000/teachOn/${id}`, { status: userStatus });
      return data;
    },
    onSuccess: (data) => {
      toast.success('User role updated successfully!');
      queryClient.invalidateQueries(['teacherReq']); // This will trigger a refetch
    },
    onError: (err) => {
      toast.error(err.message);
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
                    <p className={`${user.status === 'Accepted' ? 'text-green-500' : 'text-yellow-500'} whitespace-no-wrap`}>
                      {user.status}
                    </p>
                  ) : (
                    <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
                  )}
                </td>
                <td>
                  <div className="flex gap-3">
                    <button
                      className='btn bg-green-100'
                      onClick={() => handleApprove(user)}
                      disabled={user.status === 'Accepted'}
                    >
                      <FcApproval />
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
