
"use client"; 

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  // Adjust this logic based on your authentication mechanism
  return !!localStorage.getItem('access_token');
};

// Function to handle logout
const handleLogout = () => {
  // Remove token or perform any necessary logout actions
  localStorage.removeItem('access_token');
  window.location.href = '/login'; // Redirect to login page
};

const NavBar = () => {
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    setAuthStatus(isAuthenticated());
  }, []);

  useEffect(() => {
    // Update authentication status if token changes (e.g., after logout)
    const handleStorageChange = () => setAuthStatus(isAuthenticated());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <nav className="bg-[#333333] dark:bg-[#222831] p-4 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-[#E1F4F3] dark:text-[#E1F4F3] text-lg font-bold">
          StockDashboard
        </div>
        <div className="flex space-x-4">
          <Link href="/" legacyBehavior>
            <a className="text-[#FFFFFF] dark:text-[#FFFFFF] hover:text-[#E1F4F3] dark:hover:text-[#E1F4F3]">
              Home
            </a>
          </Link>
          <Link href="/dashboard" legacyBehavior>
            <a className="text-[#FFFFFF] dark:text-[#FFFFFF] hover:text-[#E1F4F3] dark:hover:text-[#E1F4F3]">
              Dashboard
            </a>
          </Link>
          <Link href="/report" legacyBehavior>
            <a className="text-[#FFFFFF] dark:text-[#FFFFFF] hover:text-[#E1F4F3] dark:hover:text-[#E1F4F3]">
              Report
            </a>
          </Link>
          {!authStatus ? (
            <>
              <Link href="/login" legacyBehavior>
                <a className="text-[#FFFFFF] dark:text-[#FFFFFF] hover:text-[#E1F4F3] dark:hover:text-[#E1F4F3]">
                  Login
                </a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="text-[#FFFFFF] dark:text-[#FFFFFF] hover:text-[#E1F4F3] dark:hover:text-[#E1F4F3]">
                  Register
                </a>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-[#333333] dark:text-[#FFFFFF] bg-[#E1F4F3] dark:bg-[#E1F4F3] px-3 py-0 rounded hover:bg-[#706C61] dark:hover:bg-[#706C61]"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
  

  
};

export default NavBar;
