"use client"
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaUserCircle, FaAngleDown } from 'react-icons/fa';
import Image from 'next/image';
import logo from "../app/assets/logo.png";

const Navbar = () => {
  const [address, setAddress] = useState('Select Address');

  return (
    <div className="w-full shadow-md font-sans">
      <div className="max-w-7xl mx-auto flex items-center p-4 gap-4">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <div className="w-auto relative">
            <Image 
              src={logo} 
              alt="Logo" 
              width={100} 
              height={40} 
              priority
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* Location selector */}
        <div className="flex items-center cursor-pointer mr-4">
          <FaMapMarkerAlt className="text-gray-700 mr-1" />
          <div className="flex flex-col">
            <div className="text-xs text-gray-600">Select Location</div>
            <div className="flex items-center text-sm font-bold">
              {address} <FaAngleDown className="ml-1" />
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex items-center border border-gray-300 rounded-md py-2 px-4 bg-gray-100">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Doctors, Specialities, Conditions etc."
            className="w-full bg-transparent border-none outline-none text-sm"
          />
        </div>

        {/* Login button */}
        <div className="ml-4">
          <button className="flex items-center bg-white border-2 border-[#0087ba] rounded-full text-[#0087ba] px-5 py-2 font-bold hover:bg-blue-50 transition-all">
            Login <FaUserCircle className="ml-2" />
          </button>
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex justify-center border-t border-gray-200 py-3">
        <div className="px-4 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-[#0087ba]">Buy Medicines</div>
        <div className="px-4 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-[#0087ba]">Find Doctors</div>
        <div className="px-4 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-[#0087ba]">Lab Tests</div>
        <div className="px-4 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-[#0087ba]">Circle Membership</div>
        <div className="px-4 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-[#0087ba]">Health Records</div>
        <div className="px-4 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-[#0087ba]">Diabetes Reversal</div>
        <div className="px-4 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-[#0087ba] flex items-center">
          Buy Insurance <span className="bg-[#0087ba] text-white text-xs px-1.5 py-0.5 rounded ml-1">New</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
