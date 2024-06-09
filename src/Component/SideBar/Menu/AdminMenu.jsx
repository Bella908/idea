import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { VscRequestChanges } from 'react-icons/vsc';
import Menu from './Menu';

const AdminMenu = () => {
    return (
        <div>
             <>
      <Menu icon={VscRequestChanges } label='Teacher Request' address='teachOn' />
      <Menu icon={FaRegUserCircle } label='Users' address='users' />
      <Menu icon={ SiGoogleclassroom } label=' All classes' address='allClass' />
     
    </>
        </div>
    );
};

export default AdminMenu;