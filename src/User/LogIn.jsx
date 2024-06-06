import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import login from '../../src/assets/log-in.png'


const LogIn = () => {
    const{sighIn,googleLogin} = useContext(AuthContext)
    const handlelogIn= e =>{
        e.preventDefault();
       console.log(e.currentTarget);
       const form = new FormData(e.currentTarget);
       const password = form.get('password');
       const email = form.get('email');
      console.log(password , email)

      sighIn(email,password)
      .then(() => {
        e.target.reset()
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successful!',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        // If login fails, show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to login. Please check your credentials and try again.',
          confirmButtonText: 'OK'
        });
      });



    }
      const handleGoogleLogin =() =>{
        googleLogin()
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login successful!',
            confirmButtonText: 'OK'
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to login. Please check your credentials and try again.',
            confirmButtonText: 'OK'
          });
        });
    }


    return (
       <div>
         <Helmet>
            <title>Idea | Log-In</title>
            </Helmet>
     <form  onSubmit={handlelogIn}> 
            <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0 bg-cover   " style={{backgroundImage: 'url(https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
      <div className="max-w-screen-xl  flex justify-center flex-1">
       
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12  mt-24">
          <div className=" flex flex-col items-center">
            <div className="text-center w-64">
              <img src={login} alt="" />

            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">

               
                {/* email */}
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email " name='email'
                />
               
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password" name='password'
                />
             
                <button className="mt-5 tracking-wide font-semibold bg-[#4334ea] text-gray-100 w-full py-4 rounded-lg hover:bg-slate-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Log In</span>
                </button>
             
         
             
          <a
            href="#"
            className=" flex items-center justify-center mt-4 text-white bg-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <div className="flex px-5 justify-center w-full py-3" onClick={handleGoogleLogin} >
              <div className="min-w-[30px]">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <div className="flex w-full justify-center">
                <h1  className="whitespace-nowrap text-gray-600 font-bold">
                  Sign in with Google
                </h1>
              </div>
            </div>
            </a>
              <p className="mt-6 text-xs text-gray-600 text-center">
                  Do not have a account?{" "}
                 <Link to="/register">
                 
                    <span className="text-blue-900  font-semibold">Sign up</span>
                 </Link>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
        </div>
    );
};


export default LogIn;