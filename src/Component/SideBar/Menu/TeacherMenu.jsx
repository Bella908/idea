import React from 'react';
import Menu from './Menu';
import { IoMdAddCircle } from 'react-icons/io';
import { SiGoogleclassroom } from 'react-icons/si';

const TeacherMenu = () => {
    return (
        <div>
             <>
      <Menu icon={IoMdAddCircle} label='Add class' address='addClass' />
      <Menu icon={SiGoogleclassroom} label='My class' address='myClass' />
      {/* <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Bookings'
        address='manage-bookings'
      /> */}
    </>
        </div>
    );
};

export default TeacherMenu;