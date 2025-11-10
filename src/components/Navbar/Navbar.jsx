import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import logo from '../../assets/logo.png';

const Navbar = () => {

     const {user, signOutUser } = use(AuthContext);

     const handleSignOut = () => {
        signOutUser()
          .then()
          .catch()
     }

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allProducts">Bills</NavLink></li>
        
        {
            user && <>
             
             <li><NavLink to="/myBids">My Pay Bills</NavLink></li>
            </>
        }
        
    </>

    return (
<div className="navbar bg-base-100 shadow-sm px-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
           {links }
      </ul>
    </div>
    <div className='flex'>
        <img  className='w-12 h-12 border border-b-amber-800 rounded-4xl bg-amber-100 p-1' src={logo} alt="" />
        <a className="btn btn-ghost text-xl">Bill <span className='text-fuchsia-600'>Pie</span></a>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
         {links }
    </ul>
  </div>
  <div className="navbar-end">
    {
        user ? 
      <a onClick={handleSignOut} className="btn bg-amber-500">Sign Out</a> :
       <div className='flex gap-3'>
        <Link to="/login" className='btn bg-amber-200'>Login</Link>
       <Link to="/register" className='btn bg-amber-200'>Register</Link>
       </div>
    }
  </div>
</div>
    );
};

export default Navbar;