import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();


import {

  RouterProvider,
} from "react-router-dom";

import './index.css'
import router from './Routs/Routes.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
