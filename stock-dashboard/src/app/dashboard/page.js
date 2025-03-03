"use client";

import React, { useEffect, useState } from 'react';
import StockDashboard from '../../components/StockDashboard';
import ReportDashboard from '../../components/ReportDashboard';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { fetchWithToken } from '../../utils/api';

// Define the URLs as constants
const lurl = 'http://localhost:8002';
const durl = process.env.NEXT_PUBLIC_API_URL;

// Function to fetch stock data with authorization header
const fetchStockData = async () => {
  try {
    const data = await fetchWithToken(`${durl}/api/test/`);
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw error;
  }
};

const DashboardPage = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStockData = async () => {
      try {
        setLoading(true);
        const data = await fetchStockData();
        setStocks(data);
      } catch (error) {
        setError('Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    getStockData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F8FA] dark:bg-[#111827]">
        <div className="p-6 bg-white dark:bg-[#1F2937] rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Error</h2>
          <p className="text-[#111827] dark:text-[#F9FAFB]">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F8FA] dark:bg-[#111827]">
        <div className="p-6">
          <p className="text-[#111827] dark:text-[#F9FAFB] text-lg">Loading stock data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8FA] dark:bg-[#111827]">
      <NavBar />
      <div className="flex-grow w-full pt-16 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main stock dashboard - 70% width on large screens */}
            <div className="w-full lg:w-[70%] bg-white dark:bg-[#1F2937] rounded-lg shadow-md">
              <StockDashboard stocks={stocks} />
            </div>
            
            {/* Side reports - 30% width on large screens */}
            <div className="w-full lg:w-[30%] sticky top-20">
              <ReportDashboard stocks={stocks} />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardPage;