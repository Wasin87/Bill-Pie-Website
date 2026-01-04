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
import About from './components/Pages/About.jsx';
import Dashboard from './components/Pages/Dashboard.jsx';
import Term from './components/Pages/Term.jsx';
import Help from './components/Pages/Help.jsx';
import FAQ from './components/Pages/FAQ.jsx';
import Customer from './components/Pages/Customer.jsx';
import Privacy from './components/Pages/Privacy.jsx';
import Security from './components/Pages/Security.jsx';
import Cookies from './components/Pages/Cookies.jsx';
import Utilities from './components/Pages/Utilities.jsx';
import Features from './components/Pages/Features.jsx';
 
 

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
        path: "utilities",
        Component: Utilities
      },
      {
        path: "features",
        Component: Features
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
        path: "about",
        Component: About
      },
      {
        path: "dashboard",
        Component: Dashboard
      },
      {
        path: "terms",
        Component: Term
      },
      {
        path: "help",
        Component: Help
      },
      {
        path: "faq",
        Component: FAQ
      },
      {
        path: "customer-support",
        Component: Customer
      },
      {
        path: "privacy",
        Component: Privacy
      },
      {
        path: "security",
        Component: Security
      },
      {
        path: "cookies",
        Component: Cookies
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
