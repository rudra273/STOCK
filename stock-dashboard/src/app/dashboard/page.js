
"use client"; 

import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import StockDashboard from '../../components/StockDashboard';
import NavBar from '../../components/NavBar';
import { fetchWithAuth } from '../../utils/api';
import Footer from '../../components/Footer';


// async function fetchStockData() {
//   try {
//     const response = await fetch('http://127.0.0.1:8000/api/stock-data-db/');
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log('Fetched stock data:', data); 
//     return data;
//   } catch (error) {
//     console.error('Error fetching stock data:', error.message); 
//     throw error;
//   }
// }



// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('access_token');
};

// Function to fetch stock data with authorization header
async function fetchStockData() {
  const token = getToken();

  const lurl = 'http://localhost:8002'
  const durl = process.env.NEXT_PUBLIC_API_URL
  
// const url = 
  try {
    const response = await fetch(`${lurl}/api/stock-data-db/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      window.location.href = '/login'
      // Handle unauthorized error, e.g., refresh token or redirect to login
      console.error('Unauthorized access - handle token refresh or login');
      
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched stock data:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error.message); 
    throw error;
  }
}




const DashboardPage = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStockData = async () => {
      try {
        const data = await fetchStockData();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stock data:', error.message); 
        setError('Failed to fetch stock data');
      }
    };

    getStockData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-[#FFFFFF] dark:bg-[#706C61]">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold mb-6 text-[#333333] dark:text-[#E1F4F3] font-sans">
            Dashboard
          </h1>
          <StockDashboard stocks={stocks} />
        </main>
      </div>
      <Footer />
    </div>
  );
  
  
};

export default DashboardPage; 

