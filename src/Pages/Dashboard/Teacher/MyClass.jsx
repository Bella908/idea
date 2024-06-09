import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdDelete, MdUpdate } from 'react-icons/md';
import { FcViewDetails } from 'react-icons/fc';
import { TbListDetails } from 'react-icons/tb';

const MyClass = () => {
  const { user } = useAuth();
  const [list, setlist] = useState([]);
  


  const { data: classes = [], isLoading, isError, error } = useQuery({
    queryKey: ['myclass', user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/myclass/${user?.email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!user?.email,
    onSuccess: (data) => setlist(data), // Ensure the query runs only if user.email is available
  });

  
  
  
 


  // delect function
  const handleDelete = async (id) => {
    // Display SweetAlert confirmation dialog
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            
            fetch(`http://localhost:5000/myclass/delete/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        
                      setlist(prevBookings => prevBookings.filter( classItem => classItem._id!== id));
                    
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
            
                    }
                });
        }
    });
    


};


if (isLoading) {
  return <div>Loading...</div>;
}

if (isError) {
  return <div>Error: {error.message}</div>;
}






  return (
    <div>
      <div className='text-center text-2xl my-10'>
        <p>Total classes: {classes.length}</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center'>
        {classes.map((classItem) => (
          <div key={classItem.id} className='flex justify-center mt-10'>
            <div className="card w-[500px] bg-white shadow-lg ring-1 ring-slate-400 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <figure className="px-10 pt-10">
                <img src={classItem.image} alt={classItem.title} className="rounded-lg object-cover h-48 w-full" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-semibold text-gray-800">{classItem.title}</h2>
                <p className="text-lg text-gray-600 mt-2">Price: ${classItem.price}</p>
                <p className="text-gray-600 mt-2">{classItem.shortDescription}</p>
               {/* posted by */}
               <p className="text-gray-600 ">Posted By:</p>

          <div className="flex items-center justify-center gap-2">
            <img src={classItem.photo} alt={classItem.postedBy} className="w-10 h-10 rounded-full object-cover" />
            <p className="text-gray-500"> {classItem.postedBy}</p>
          </div>
          {classItem?.status ? (
                    <p className={`${classItem.status === 'Accepted' ? 'text-green-500' : classItem.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'} whitespace-no-wrap`}>
                      {classItem.status}
                    </p>
                  ) : (
                    <p className='text-yellow-500 whitespace-no-wrap'>
                      Pending
                    </p>
                  )}
                <p className="text-gray-500 mt-2">Total Enrollment: {classItem.totalEnrollment}</p>
                <div className='flex gap-3 mt-4'>
                  <div>
                  <Link to={`/class/${classItem.id}`} className="mt-6">
                  <div className="card-actions">
                    <button className="btn bg-yellow-100 text-yellow-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-400 transition duration-300">
                    <MdUpdate />
                    </button>
                  </div>
                </Link>
                  </div>
                  <div>
                  <Link to={`${classItem._id}`} className="mt-6">
                  <div className="card-actions">
                    <button className="btn text-blue-800 bg-blue-100 font-semibold py-2 px-4 rounded-lg hover:bg-slate-400 transition duration-300">
                    <TbListDetails />
                    </button>
                  </div>
                </Link>
                  </div>
                  <div>
                    {/* delet */}
               
                  <div className="card-actions">
                   
                    <button onClick={() => handleDelete(classItem._id)} className="btn bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-lg  hover:bg-slate-400 transition duration-300"> <MdDelete/></button>
                  </div>
              
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
