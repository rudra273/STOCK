"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';


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
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF]">
        <div className="w-full max-w-md bg-[#FFFFFF] shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-4 text-[#333333]">
            Welcome to Stock Dashboard
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-[#333333] text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border border-[#333333] text-sm py-1 px-2 text-[#333333] focus:ring-[#333333] focus:border-[#333333] transition duration-150 ease-in-out"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-[#333333] text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-[#333333] text-sm py-1 px-2 text-[#333333] focus:ring-[#333333] focus:border-[#333333] transition duration-150 ease-in-out"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#333333] text-white py-2 px-4 shadow-md hover:bg-[#1a1a1a] transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-[#333333]">
            Not a user?{' '}
            <Link
              href="/register"
              className="text-[#333333] hover:text-[#1a1a1a] font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
  
  
}
