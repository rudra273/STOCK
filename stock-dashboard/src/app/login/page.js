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

    const res = await fetch(`${durl}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      // const { access } = await res.json();
      const { access, refresh } = await res.json();
      localStorage.setItem('access_token', access); // Store token in localStorage
      localStorage.setItem('refresh_token', refresh);
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.detail || 'Incorrect username or password');
    }
  };

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen"> {/* Updated background color */}
      <NavBar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-surface dark:bg-surface-dark shadow-md p-6 rounded-lg border border-border dark:border-border-dark"> {/* Updated card background and border */}
          <h1 className="text-2xl font-bold text-center mb-4 text-text-primary dark:text-text-primary-dark"> {/* Updated heading text color */}
            Welcome to Stock Dashboard
          </h1>
          {error && <p className="text-danger dark:text-danger-dark text-center mb-4">{error}</p>} {/* Updated error text color */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-text-secondary dark:text-text-secondary-dark text-sm font-medium mb-1" /* Updated label text color */
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border border-border dark:border-border-dark rounded-md text-sm py-2 px-3 text-gray-900 focus:ring-primary focus:border-primary transition duration-150 ease-in-out bg-background dark:bg-surface-dark"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-text-secondary dark:text-text-secondary-dark text-sm font-medium mb-1" /* Updated label text color */
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-border dark:border-border-dark rounded-md text-sm py-2 px-3 text-gray-900 focus:ring-primary focus:border-primary transition duration-150 ease-in-out bg-background dark:bg-surface-dark"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary dark:bg-primary-dark text-text-primary-light py-2 px-4 shadow-md hover:bg-primary-light dark:hover:bg-primary-light transition duration-200 rounded-md" /* Updated button styles */
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-text-secondary dark:text-text-secondary-dark"> {/* Updated paragraph text color */}
            Not a user?{' '}
            <Link
              href="/register"
              className="text-accent dark:text-accent-dark hover:text-accent-light dark:hover:text-accent-light font-medium transition-colors duration-200" /* Updated link styles */
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