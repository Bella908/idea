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
            <div className="bg-[#2D2F31]  h-[400px]">
              <div className="flex  pt-44">

                <h4 className="font-Briem text-white text-7xl pt-20 pl-56 pb-11">{classDetailes.title}</h4>
                <img className="h-[300px] w-[400px] ml-20 bg-cover" src={classDetailes.image} alt="" />
              </div>

            </div>
            <div>
                <h4 className="font-Briem text-black text-4xl mt-20 pl-56 pb-5">{classDetailes.title}</h4>
                <h4 className="font-Briem text-black text-2xl  pl-56 ">{classDetailes.shortDescription}</h4>
                <h4 className="font-Briem text-black text-xl  pl-56 ">{classDetailes.postedBy}</h4>
                <h4 className="font-Briem text-red-600 text-xl  pl-56 ">{classDetailes.price}</h4>
                <Link>
            <div className="card-actions">
              <button className="btn btn-outline rounded-lg ml-56  ">Pay Now</button>
            </div>
          </Link>

            </div>
        </div>
    );
};

export default ClassDetailes;