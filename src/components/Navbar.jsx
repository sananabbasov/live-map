import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation in React Router

const Navbar = () => {
  return (
    <div className="container m-auto flex items-center gap-x-6 overflow-hidden bg-white px-6 py-2.5 sm:px-3.5">
      {/* Logo on the left */}
      <div>
        <img
          src="/path-to-your-logo.png" // Replace with your logo image path
          alt="Logo"
          className="h-10 w-10" // Adjust the size as needed
        />
      </div>

      {/* Navigation links on the right */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 ml-auto">
        <Link to="/" className="text-gray-900 font-semibold">
          Home
        </Link>
        <Link to="/about" className="text-gray-900 font-semibold">
          About
        </Link>
        <Link to="/news" className="text-gray-900 font-semibold">
          News
        </Link>
        <Link to="/contact" className="text-gray-900 font-semibold">
          Contact
        </Link>
        <Link to="/live" className="text-gray-900 font-semibold">
          Live Map
        </Link>
        <Link to="/quiz" className="text-gray-900 font-semibold">
          Quiz
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
