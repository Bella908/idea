import React from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/SideBar/Sidebar';

const Dashboard = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className='flex-1 md:ml-64'>
        <div className='p-5'>
            <Outlet></Outlet>
        </div>
      </div>
        </div>
    );
};

export default Dashboard;