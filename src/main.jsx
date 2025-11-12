import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayouts from './components/Layouts/RootLayouts.jsx';
import Home from './components/Home/Home.jsx';

import Register from './components/Register/Register.jsx';
import AuthProvider from './Context/AuthProvider.jsx';

import { ToastContainer } from "react-toastify";
import AllBills from './components/All Bills/AllBills.jsx';
import MyPayBill from './components/MYPayBill/MyPayBill.jsx';
import Login from './components/Pages/Login.jsx';
import Profile from './components/Pages/Profile.jsx';
import Details from './components/Pages/Details.jsx';
import ErrorPage from './components/Pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "allBills",
        Component: AllBills
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "myPayBil",
        Component: MyPayBill
      },
      {
        path: "profile",
        Component: Profile
      },
      {
        path: "details",
        Component: Details
      },
      {
        path: "*",
        element: <ErrorPage />  
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
