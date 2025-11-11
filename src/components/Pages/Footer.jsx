import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal text-base-content p-10 bg-linear-to-r dark:from-gray-700 dark:to-amber-900 dark:text-gray-200 transition-colors duration-300">
      <aside>
        <img
          className="w-15 h-15 ml-4 border border-b-amber-800 rounded-4xl bg-amber-100 p-1 dark:bg-gray-700"
          src={logo}
          alt=""
        />
        <p className="font-bold">
          <a className="btn btn-ghost text-xl dark:text-white">
            Bill <span className="text-amber-800 dark:text-amber-400">Pie</span>
          </a>
          <br />
          Bill Management System
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
