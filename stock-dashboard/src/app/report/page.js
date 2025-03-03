// src/app/report/page.js

"use client";

import React, { useEffect, useState } from 'react';
import ReportDashboard from '../../components/ReportDashboard';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { fetchWithToken } from '../../utils/api';

async function fetchStockData() {
  const lurl = 'http://localhost:8002';
  const durl = process.env.NEXT_PUBLIC_API_URL;

  // const data = await fetchWithToken(`${durl}/api/test/`);

  try {
    const data = await fetchWithToken(`${durl}/api/test/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw error;
  }
}



const ReportPage = () => {
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
    <div className="bg-[#FFFFFF] dark:bg-[#222831] min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-[#FFFFFF] dark:bg-[#706C61]">
          <h1 className="dark:bg-[#706C61] text-4xl font-bold mb-6 text-[#333333] dark:text-[#00ADB5]">Stock Report</h1>
          <ReportDashboard stocks={stocks} />
        </main>
      </div>
      <Footer />
    </div>
  );
  

};

export default ReportPage; 
