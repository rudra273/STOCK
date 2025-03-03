"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWithToken } from '../utils/api'; // Adjust the import path based on your file structure

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

// Function to handle logout
const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
  window.location.reload();
};

const durl = process.env.NEXT_PUBLIC_API_URL;

const NavBar = () => {
  const [authStatus, setAuthStatus] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setAuthStatus(isAuthenticated());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => setAuthStatus(isAuthenticated());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (authStatus) {
        try {
          const profileData = await fetchWithToken(`${durl}/users/profile/`);
          console.log('Profile data fetched:', profileData);
          setUsername(profileData.username);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfile();
  }, [authStatus]);

  return (
    <nav className="bg-background-dark dark:bg-background-light p-4 fixed w-full z-10"> {/* z-10 to ensure it's on top */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-text-primary dark:text-text-primary-dark text-lg font-bold">
          StockDashboard
        </div>
        <div className="flex space-x-4 items-center"> {/* Aligned items-center for vertical centering */}
          <Link href="/" legacyBehavior>
            <a className="text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:accent">
              Home
            </a>
          </Link>
          <Link href="/dashboard" legacyBehavior>
            <a className="text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:accent">
              Dashboard
            </a>
          </Link>
          {authStatus && (
            <Link href="/portfolio" legacyBehavior>
              <a className="text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:accent">
                Portfolio
              </a>
            </Link>
          )}
          {!authStatus ? (
            <>
              <Link href="/login" legacyBehavior>
                <a className="text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:accent">
                  Login
                </a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:accent">
                  Register
                </a>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4"> {/* Added a div to group username and logout button */}
              <span className="text-text-secondary dark:text-text-secondary-dark">
                Hello, {username}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark px-3 py-1 rounded hover:bg-warning dark:hover:bg-warning"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
