import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { SiGoogleclassroom } from "react-icons/si";

import { AiOutlineBars } from 'react-icons/ai'
import { IoMdAddCircle } from "react-icons/io";
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo2.png'
import { Link } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import useRole from '../../Hooks/useRole';
import Menu from './Menu/Menu';
import TeacherMenu from './Menu/TeacherMenu';





const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role] = useRole()
  console.log(role)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }


  // role






  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src={logo}

              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className=' hidden md:flex   justify-center items-center'>
              <Link to='/'>
                <img className='h-48 w-44'
                  // className='hidden md:block'
                  src={logo}
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
             

             {/* teacher menu */}
             {role ==='teacher' &&   <TeacherMenu></TeacherMenu> }
             <TeacherMenu></TeacherMenu>


            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
