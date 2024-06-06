import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2'

import { updateProfile } from "firebase/auth";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Helmet } from 'react-helmet';
const Register = () => {
 const {createUser , setUser } = useContext(AuthContext)
 const [registerError , setRegisterError ] = useState('');
 const[success , setSuccess] = useState('');


  const handleRegister = e =>{
    e.preventDefault();
   console.log(e.currentTarget);
   const form = new FormData(e.currentTarget);
   const password = form.get('password');
   const email = form.get('email');
   const photoURL = form.get('photoURL');
   const name = form.get('name');

   setRegisterError('');
   setSuccess('');


   if (password.length < 6) {
    setRegisterError('**Password should be 6 characters');
    return;
  }
  if (!/(?=.*[a-z])(?=.*[A-Z]).+/.test(password)) {
    setRegisterError('**Password must have an Uppercase letter and a Lowercase letter');
    return;
  }
  





createUser(email,password,photoURL)
.then(result =>{
  updateProfile(result.user,{
    displayName : name,
    
    
  })
  .then(() =>console.log(updated))
  .catch((error) =>{
    console.log(error)
  })
  if(result.user){
    Swal.fire({
        title: 'Success!',
        text: 'User created successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })

}
})
.catch((error)=>{
  console.log(error)
  let errorMessage = error.message;
  if (error.code === 'auth/email-already-in-use') {
    errorMessage = 'Email address is already in use.';
  } else if (error.code === 'auth/weak-password') {
    errorMessage = 'The password is too weak.';
  } else if (error.code === 'auth/invalid-email') {
    errorMessage = 'Invalid email address.';
  }
  Swal.fire({
    title: 'Error!',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'OK'
  });
})

  }
    return (
        <div >
           <Helmet>
            <title>Idea | Register</title>
            </Helmet>
          <form onSubmit={handleRegister}> 
            <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1508614999368-9260051292e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
      <div className="max-w-screen-xl flex justify-center flex-1">
       
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12   mt-28">
          <div className=" flex flex-col items-center ">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900 font-Briem">
                Sign-Up
              </h1>
              
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">

                {/* name */}
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name" name='name'
                />

                {/* email */}
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email " name='email'
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="url"
                  placeholder="Photo URL" name='photoURL'
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password" name='password'
                />
                {
        registerError && <p className="text-red-400">{registerError}</p>
      }
                <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                 <Link to="/logIn">
                 
                    <span className="text-blue-900 font-semibold">Sign in</span>
                 </Link>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
    
      {
        success && <p className="text-green-400">{success}</p>
      }
        </div>
    );
};

export default Register;

