
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
      <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF]">
        <div className="w-full max-w-md bg-[#FFFFFF] shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-4 text-[#333333]">Register</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {passwordError && <p className="text-red-500 text-center mb-4">{passwordError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-[#333333] text-sm font-medium mb-1">Username</label>
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
              <label htmlFor="email" className="block text-[#333333] text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border border-[#333333] text-sm py-1 px-2 text-[#333333] focus:ring-[#333333] focus:border-[#333333] transition duration-150 ease-in-out"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-[#333333] text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-[#333333] text-sm py-1 px-2 text-[#333333] focus:ring-[#333333] focus:border-[#333333] transition duration-150 ease-in-out"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#333333] text-white py-2 px-4 shadow-md hover:bg-[#1a1a1a] transition duration-200">
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-[#333333]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#333333] hover:text-[#1a1a1a] font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
  

}

