import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import LogIn from "../User/LogIn";
import Register from "../User/Register";
import AllClassses from "../Pages/Classes/AllClassses";
import ClassDetailes from "../Pages/Classes/ClassDetailes";
import Dashboard from "../Layout/Dashboard";
import AddClass from "../Pages/Dashboard/Teacher/AddClass";
import MyClass from "../Pages/Dashboard/Teacher/MyClass";
import SeeDetails from "../Pages/Dashboard/Teacher/MyClass/SeeDetails";
import TeachOn from "../Pages/TeachOn/TeachOn";
import Profile from "../Pages/Dashboard/Common/Profile";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [

      {
        path: '/',
        element: <Home></Home>
      },
      {

        path: '/login',
        element: <LogIn></LogIn>,

      },
      {

        path: '/register',
        element: <Register></Register>,

      },
      {

        path: '/allclasses',
        element: <AllClassses></AllClassses>,

      },
      {

        path: '/class/:id',
        element: <ClassDetailes></ClassDetailes>,

      },
      {

        path: '/teach',
        element: <TeachOn></TeachOn>,

      },
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
      
        path: "addClass",
        element: <AddClass></AddClass>
      },
      {
       
        path: "myClass",
        element:<MyClass></MyClass>
      },
      {

        path: 'myclass/:id',
        element: <SeeDetails></SeeDetails>,

      },
     
      {

        path: 'users',
        element: <ManageUser></ManageUser>,

      },
     
      {

        path: 'profile',
        element: <Profile></Profile>,

      }
     
     
    ]
  }
]);

export default router;