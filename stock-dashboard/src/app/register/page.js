
// "use client"; // This directive makes the file a client component

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import NavBar from '../../components/NavBar';

// export default function RegisterPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const lurl = 'http://localhost:8002'
//     const durl = process.env.NEXT_PUBLIC_API_URL
  

//     const res = await fetch(`${lurl}/users/register/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password, email }),
//     });

//     if (res.ok) {
//       router.push('/login');
//     } else {
//       const data = await res.json();
//       setError(data.detail || 'An error occurred');
//     }
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#222831]">
//         <div className="w-full max-w-md bg-white dark:bg-[#393E46] shadow-md rounded-sm p-6">
//           <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-[#EEEEEE]">Register</h1>
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-gray-700 dark:text-[#EEEEEE] text-sm font-medium mb-1">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="block w-full border dark:text-[#393E46] border-gray-300 dark:border-[#00ADB5] rounded-sm text-sm py-2 px-3 text-gray-900 dark:text-[#EEEEEE] focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:focus:ring-[#00ADB5] dark:focus:border-[#00ADB5] transition duration-150 ease-in-out"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700 dark:text-[#EEEEEE] text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="block w-full border dark:text-[#393E46] border-gray-300 dark:border-[#00ADB5] rounded-sm text-sm py-2 px-3 text-gray-900 dark:text-[#EEEEEE] focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:focus:ring-[#00ADB5] dark:focus:border-[#00ADB5] transition duration-150 ease-in-out"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-gray-700 dark:text-[#EEEEEE] text-sm font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="block w-full border dark:text-[#393E46] border-gray-300 dark:border-[#00ADB5] rounded-sm text-sm py-2 px-3 text-gray-900 dark:text-[#EEEEEE] focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:focus:ring-[#00ADB5] dark:focus:border-[#00ADB5] transition duration-150 ease-in-out"
//                 required
//               />
//             </div>
//             <button type="submit" className="w-full bg-[#00ADB5] dark:bg-[#00ADB5] text-white py-2 px-4 rounded-sm shadow-sm hover:bg-[#007A7E] dark:hover:bg-[#007A7E] transition duration-200">
//               Register
//             </button>
//           </form>
//           <p className="text-center mt-4 text-gray-700 dark:text-[#EEEEEE]">
//             Already have an account?{' '}
//             <Link href="/login" className="text-[#00ADB5] dark:text-[#00ADB5] hover:text-[#007A7E] dark:hover:text-[#007A7E] font-medium">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
  
  
// }

"use client"; // This directive makes the file a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../components/NavBar';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const router = useRouter();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);

    if (password.length < minLength) return 'Password must be at least 8 characters long.';
    if (!hasUpperCase) return 'Password must contain at least one uppercase letter.';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter.';
    if (!hasDigit) return 'Password must contain at least one number.';
    if (!hasSpecialChar) return 'Password must contain at least one special character.';
    if (!hasNoSpaces) return 'Password should not contain spaces.';
    
    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPasswordError(null);

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    const lurl = 'http://localhost:8002'
    const durl = process.env.NEXT_PUBLIC_API_URL

    const res = await fetch(`${lurl}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.detail || 'An error occurred');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#222831]">
        <div className="w-full max-w-md bg-white dark:bg-[#393E46] shadow-md rounded-sm p-6">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-[#EEEEEE]">Register</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {passwordError && <p className="text-red-500 text-center mb-4">{passwordError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 dark:text-[#EEEEEE] text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border dark:text-[#393E46] border-gray-300 dark:border-[#00ADB5] rounded-sm text-sm py-2 px-3 text-gray-900 dark:text-[#EEEEEE] focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:focus:ring-[#00ADB5] dark:focus:border-[#00ADB5] transition duration-150 ease-in-out"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-[#EEEEEE] text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border dark:text-[#393E46] border-gray-300 dark:border-[#00ADB5] rounded-sm text-sm py-2 px-3 text-gray-900 dark:text-[#EEEEEE] focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:focus:ring-[#00ADB5] dark:focus:border-[#00ADB5] transition duration-150 ease-in-out"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 dark:text-[#EEEEEE] text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border dark:text-[#393E46] border-gray-300 dark:border-[#00ADB5] rounded-sm text-sm py-2 px-3 text-gray-900 dark:text-[#EEEEEE] focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:focus:ring-[#00ADB5] dark:focus:border-[#00ADB5] transition duration-150 ease-in-out"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#00ADB5] dark:bg-[#00ADB5] text-white py-2 px-4 rounded-sm shadow-sm hover:bg-[#007A7E] dark:hover:bg-[#007A7E] transition duration-200">
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-gray-700 dark:text-[#EEEEEE]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#00ADB5] dark:text-[#00ADB5] hover:text-[#007A7E] dark:hover:text-[#007A7E] font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
