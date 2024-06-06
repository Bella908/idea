import React from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/SideBar/Sidebar';

const Dashboard = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;