import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Pages/Footer';

const RootLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
       <Outlet></Outlet>
       
        <Footer></Footer>

    </div>
  );
};

export default RootLayouts;
