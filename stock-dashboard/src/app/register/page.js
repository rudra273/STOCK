"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

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
    
    return null;
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

    const lurl = 'http://localhost:8002';
    const durl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${durl}/users/register/`, {
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
      <div className="flex items-center justify-center min-h-screen bg-[#F5F8FA] dark:bg-[#111827]">
        <div className="w-full max-w-md bg-[#FFFFFF] dark:bg-[#1F2937] shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-4 text-[#111827] dark:text-[#F9FAFB]">Register</h1>
          {error && <p className="text-[#EF4444] dark:text-[#F87171] text-center mb-4">{error}</p>}
          {passwordError && <p className="text-[#EF4444] dark:text-[#F87171] text-center mb-4">{passwordError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-[#4B5563] dark:text-[#D1D5DB] text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border border-[#E5E7EB] dark:border-[#374151] text-sm py-1 px-2 bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB] focus:ring-[#2563EB] focus:border-[#2563EB] dark:focus:ring-[#3B82F6] dark:focus:border-[#3B82F6] transition duration-150 ease-in-out"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#4B5563] dark:text-[#D1D5DB] text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border border-[#E5E7EB] dark:border-[#374151] text-sm py-1 px-2 bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB] focus:ring-[#2563EB] focus:border-[#2563EB] dark:focus:ring-[#3B82F6] dark:focus:border-[#3B82F6] transition duration-150 ease-in-out"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-[#4B5563] dark:text-[#D1D5DB] text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-[#E5E7EB] dark:border-[#374151] text-sm py-1 px-2 bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB] focus:ring-[#2563EB] focus:border-[#2563EB] dark:focus:ring-[#3B82F6] dark:focus:border-[#3B82F6] transition duration-150 ease-in-out"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#0EA5E9] dark:bg-[#38BDF8] text-white py-2 px-4 shadow-md hover:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-[#4B5563] dark:text-[#D1D5DB]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#0EA5E9] dark:text-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
