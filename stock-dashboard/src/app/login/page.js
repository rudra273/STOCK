// "use client"; // This directive makes the file a client component

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const res = await fetch('http://127.0.0.1:8000/users/login/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (res.ok) {
//       const { access } = await res.json();
//       localStorage.setItem('access_token', access); // Store token in localStorage
//       router.push('/dashboard');
//     } else {
//       const data = await res.json();
//       setError(data.detail || 'An error occurred');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl mb-4">Login</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

"use client"; // This directive makes the file a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../components/NavBar';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const lurl = 'http://localhost:8002'
    const durl = process.env.NEXT_PUBLIC_API_URL

    const res = await fetch(`${lurl}/users/login/`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const { access } = await res.json();
      localStorage.setItem('access_token', access); // Store token in localStorage
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.detail || 'An error occurred');
    }
  };


  return (
    <div><NavBar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Stock Dashboard</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full border-gray-600 rounded-md shadow text-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow text-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Not an user?{' '} 
          <Link href="/register" className="text-blue-500 hover:text-blue-700 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}
