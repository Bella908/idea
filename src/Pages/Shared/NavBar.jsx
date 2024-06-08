import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useContext } from 'react';




const Navbar = () => {

    const {user , logOut} = useContext(AuthContext);
    const handleSignOut = () =>{
        logOut()
        .then()
        .catch()
          }
    
    const navItem =
        <>
            <li className='hover:text-[#FF8BD2]  transition-colors duration-300 font-Briem'><Link to='/'>Home</Link></li>
            <li className='hover:text-[#FF8BD2]  transition-colors duration-300 font-Briem'><Link to='/allclasses'>All Classes</Link></li>
            <li className='hover:text-[#FF8BD2]  transition-colors duration-300 font-Briem'><Link to='/teach'>Teach on IDEA</Link></li>
        </>
    return (
        <div>
            <div className="navbar bg-transparent fixed top-0 left-0 right-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <div>


                        <img className='h-48 w-44' src={logo} alt="" />

                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" text-white  gap-7 menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">
                <div className="navbar-end gap-5">
    
        </div>
                    
                {
      user? <>
          <span></span>
      

      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-12 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li className='p-4'>{user?.displayName}</li>
        <Link to='/dashboard'><li><a>Dashboard</a></li></Link>
        <li><a onClick={handleSignOut}>Logout</a></li>
      </ul>
    </div>
      </>
      :
      <div className="navbar-end gap-5">
    <Link to="/logIn">
    <a className="btn bg-[#1e54d3] text-white border-none">Log-In</a>
    </Link>
    
        </div>
  

    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;