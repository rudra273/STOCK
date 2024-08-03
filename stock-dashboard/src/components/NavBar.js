
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
    <nav className="bg-[#393E46] dark:bg-[#222831] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-[#00ADB5] dark:text-[#00ADB5] text-lg font-bold">
          StockDashboard
        </div>
        <div className="flex space-x-4">
          <Link href="/" legacyBehavior>
            <a className="text-[#EEEEEE] dark:text-[#EEEEEE] hover:text-[#00ADB5] dark:hover:text-[#00ADB5]">
              Home
            </a>
          </Link>
          <Link href="/dashboard" legacyBehavior>
            <a className="text-[#EEEEEE] dark:text-[#EEEEEE] hover:text-[#00ADB5] dark:hover:text-[#00ADB5]">
              Dashboard
            </a>
          </Link>
          <Link href="/report" legacyBehavior>
            <a className="text-[#EEEEEE] dark:text-[#EEEEEE] hover:text-[#00ADB5] dark:hover:text-[#00ADB5]">
              Report
            </a>
          </Link>
          {!authStatus ? (
            <>
              <Link href="/login" legacyBehavior>
                <a className="text-[#EEEEEE] dark:text-[#EEEEEE] hover:text-[#00ADB5] dark:hover:text-[#00ADB5]">
                  Login
                </a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="text-[#EEEEEE] dark:text-[#EEEEEE] hover:text-[#00ADB5] dark:hover:text-[#00ADB5]">
                  Register
                </a>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-[#EEEEEE] dark:text-[#EEEEEE] bg-[#00ADB5] dark:bg-[#00ADB5] px-3 py-0 rounded hover:bg-[#007A7E] dark:hover:bg-[#007A7E]"
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
