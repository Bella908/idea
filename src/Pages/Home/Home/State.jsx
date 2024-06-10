import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const State = () => {



  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ['statData'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:5000/admin-stat')
      return data
    },
  })
  console.log(statData)




    return (
        <div>
            <div className="hero min-h-[500px] my-20" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content ">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl text-center text-neutral-content">Daily Users</h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
  
  <div className="stat">
    <div className="stat-title">Total Users</div>
    <div className="stat-value text-center">{statData.totalClasses}</div>
  </div>
  
  <div className="stat">
    <div className="stat-title">Total Classes</div>
    <div className="stat-value text-center">{statData.totalUsers}</div>
    
  </div>
  
  <div className="stat">
    <div className="stat-title">Total student enrollment</div>
    <div className="stat-value text-center">{statData.totalAddClass}</div>
    
  </div>
  
</div>
      
    </div>
  </div>
</div>
        </div>
    );
};

export default State;