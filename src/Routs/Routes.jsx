import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import LogIn from "../User/LogIn";
import Register from "../User/Register";
import AllClassses from "../Pages/Classes/AllClassses";
import ClassDetailes from "../Pages/Classes/ClassDetailes";
import Dashboard from "../Layout/Dashboard";


const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
        
          path:'/login',
          element:<LogIn></LogIn>,
      
      },
      {
        
          path:'/register',
          element:<Register></Register>,
      
      },
      {
        
        path:'/allclasses',
        element:<AllClassses></AllClassses>,
    
    },
      {
        
        path:'/class/:id',
        element:<ClassDetailes></ClassDetailes>,
    
    },
      ]
    },
    {
      path: "/dashboard",
      element:<Dashboard></Dashboard>,
      children:[]
    }
  ]);

  export default router;