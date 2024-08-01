// src/components/NavBar.js

// import Link from 'next/link';

// const NavBar = () => {
//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-lg font-bold">StockApp</div>
//         <div className="flex space-x-4">
//           <Link href="/" legacyBehavior>
//             <a className="text-white hover:text-gray-400">Home</a>
//           </Link>
//           <Link href="/dashboard" legacyBehavior>
//             <a className="text-white hover:text-gray-400">Dashboard</a>
//           </Link>
//           <Link href="/report" legacyBehavior>
//             <a className="text-white hover:text-gray-400">Report</a>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
// import Link from 'next/link';

// const NavBar = () => {
//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-lg font-bold">StockApp</div>
//         <div className="flex space-x-4">
//           <Link href="/" legacyBehavior>
//             <a className="text-white hover:text-gray-400">Home</a>
//           </Link>
//           <Link href="/dashboard" legacyBehavior>
//             <a className="text-white hover:text-gray-400">Dashboard</a>
//           </Link>
//           <Link href="/report" legacyBehavior>
//             <a className="text-white hover:text-gray-400">Report</a>
//           </Link>
//           <Link href="/login" legacyBehavior>
//             <a className="text-white hover:text-gray-400">Login</a>
//           </Link>
//           <Link href="/register" legacyBehavior>
//             <a className="text-white hover:text-gray-400">Register</a>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">StockApp</div>
        <div className="flex space-x-4">
          <Link href="/" legacyBehavior>
            <a className="text-white hover:text-gray-400">Home</a>
          </Link>
          <Link href="/dashboard" legacyBehavior>
            <a className="text-white hover:text-gray-400">Dashboard</a>
          </Link>
          <Link href="/report" legacyBehavior>
            <a className="text-white hover:text-gray-400">Report</a>
          </Link>
          {!authStatus ? (
            <>
              <Link href="/login" legacyBehavior>
                <a className="text-white hover:text-gray-400">Login</a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="text-white hover:text-gray-400">Register</a>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-400 bg-red-600 px-2 py-0 rounded"
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
