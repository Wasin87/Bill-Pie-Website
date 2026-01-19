import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayouts from './components/Layouts/RootLayouts.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { ToastContainer } from "react-toastify";
import LoadingSpinner from './components/Pages/LoadingSpinner.jsx';

// Lazy load components for better performance
const Home = lazy(() => import('./components/Home/Home.jsx'));
const Register = lazy(() => import('./components/Register/Register.jsx'));
const AllBills = lazy(() => import('./components/All Bills/AllBills.jsx'));
const MyPayBill = lazy(() => import('./components/MYPayBill/MyPayBill.jsx'));
const Login = lazy(() => import('./components/Pages/Login.jsx'));
const Profile = lazy(() => import('./components/Pages/Profile.jsx'));
const Details = lazy(() => import('./components/Pages/Details.jsx'));
const ErrorPage = lazy(() => import('./components/Pages/ErrorPage.jsx'));
const About = lazy(() => import('./components/Pages/About.jsx'));
const Dashboard = lazy(() => import('./components/Pages/Dashboard.jsx'));
const Term = lazy(() => import('./components/Pages/Term.jsx'));
const Help = lazy(() => import('./components/Pages/Help.jsx'));
const FAQ = lazy(() => import('./components/Pages/FAQ.jsx'));
const Customer = lazy(() => import('./components/Pages/Customer.jsx'));
const Privacy = lazy(() => import('./components/Pages/Privacy.jsx'));
const Security = lazy(() => import('./components/Pages/Security.jsx'));
const Cookies = lazy(() => import('./components/Pages/Cookies.jsx'));
const Utilities = lazy(() => import('./components/Pages/Utilities.jsx'));
const Features = lazy(() => import('./components/Pages/Features.jsx'));

// Create Suspense wrapper component
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: (
      <SuspenseWrapper>
        <ErrorPage />
      </SuspenseWrapper>
    ),
    children: [
      { 
        index: true, 
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "allBills", 
        element: (
          <SuspenseWrapper>
            <AllBills />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "register", 
        element: (
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "login", 
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "utilities", 
        element: (
          <SuspenseWrapper>
            <Utilities />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "features", 
        element: (
          <SuspenseWrapper>
            <Features />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "myPayBil", 
        element: (
          <SuspenseWrapper>
            <MyPayBill />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "profile", 
        element: (
          <SuspenseWrapper>
            <Profile />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "details", 
        element: (
          <SuspenseWrapper>
            <Details />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "about", 
        element: (
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "dashboard", 
        element: (
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "terms", 
        element: (
          <SuspenseWrapper>
            <Term />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "help", 
        element: (
          <SuspenseWrapper>
            <Help />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "faq", 
        element: (
          <SuspenseWrapper>
            <FAQ />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "customer-support", 
        element: (
          <SuspenseWrapper>
            <Customer />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "privacy", 
        element: (
          <SuspenseWrapper>
            <Privacy />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "security", 
        element: (
          <SuspenseWrapper>
            <Security />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "cookies", 
        element: (
          <SuspenseWrapper>
            <Cookies />
          </SuspenseWrapper>
        ) 
      },
      { 
        path: "*", 
        element: (
          <SuspenseWrapper>
            <ErrorPage />
          </SuspenseWrapper>
        ) 
      }
    ]
  }
]);

// Create RootLayouts wrapper with Suspense for initial load
const AppWithSuspense = () => (
  <AuthProvider>
    <RouterProvider
      router={router}
      fallbackElement={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <LoadingSpinner />
        </div>
      }
    />
    <ToastContainer />
  </AuthProvider>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense 
      fallback={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <LoadingSpinner />
        </div>
      }
    >
      <AppWithSuspense />
    </Suspense>
  </StrictMode>
);