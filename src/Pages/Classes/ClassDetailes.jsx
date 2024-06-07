import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpnner";
import { useQuery } from "@tanstack/react-query";


const ClassDetailes = () => {

    const {id} =useParams()


    const { data: classDetailes = {}, isLoading, isError } = useQuery({
        queryKey: ['classDetails' ,id],
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

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error fetching classes</div>;


    
    return (
        <div>
        <div className="bg-[#2D2F31] h-[400px] flex items-center justify-center">
          <div className="flex items-center space-x-20 px-10">
            <h4 className="font-Briem text-white text-7xl">{classDetailes.title}</h4>
            <img
              className="h-[300px] w-[400px] object-cover rounded-lg shadow-lg mt-40 "
              src={classDetailes.image}
              alt={classDetailes.title}
            />
          </div>
        </div>
        <div className="px-10 py-20 bg-white">
          <div className="max-w-4xl mx-auto space-y-5">
            <h4 className="font-Briem text-black text-4xl">{classDetailes.title}</h4>
            <p className="font-Briem text-gray-700 text-2xl">{classDetailes.shortDescription}</p>
            <p className="font-Briem text-gray-600 text-xl">Posted by: {classDetailes.postedBy}</p>
            <p className="font-Briem text-red-600 text-xl">Price: ${classDetailes.price}</p>
            <Link to={`/pay/${classDetailes._id}`}>
              <div className="card-actions">
                <button className="btn btn-outline rounded-lg px-6 py-2 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition duration-300">
                  Pay Now
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default ClassDetailes;