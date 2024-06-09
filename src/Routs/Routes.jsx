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
import TeacherReq from "../Pages/Dashboard/Admin/TeacherReq";
import ProtectedRout from "./PrivatRoute/ProtectedRout";
import TeacherRoute from "./TeacherRoute";


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
        element:
        <ProtectedRout>
          <TeachOn></TeachOn>
          </ProtectedRout> ,

      },
    ]
  },
  {
    path: "/dashboard",
    element:   <ProtectedRout>
    <Dashboard></Dashboard>
    </ProtectedRout> ,
    children: [
      {
      
        path: "addClass",
        element:<ProtectedRout>
          <TeacherRoute>
        <AddClass></AddClass>

          </TeacherRoute>
        </ProtectedRout> 
      },
      {
       
        path: "myClass",
        element:
        <ProtectedRout>
          <TeacherRoute>

       <MyClass></MyClass>
          </TeacherRoute>
        </ProtectedRout>
      },
      {

        path: 'myclass/:id',
        element: <ProtectedRout>
       <SeeDetails></SeeDetails>,
        </ProtectedRout> 

      },
     
      {

        path: 'teachOn',
        element: <ProtectedRout>
       <TeacherReq></TeacherReq>
        </ProtectedRout> ,

      },
     
      {

        path: 'users',
        element: <ProtectedRout>
       <ManageUser></ManageUser>,
        </ProtectedRout> 

      },
     
      {

        path: 'profile',
        element:  <ProtectedRout>
       <Profile></Profile>
        </ProtectedRout>,

      }
     
     
    ]
  }
]);

export default router;