"use client";

import React, { useEffect, useState } from 'react';
import PortfolioDashboard from '../../components/PortfolioDashboard';
import Alert  from '../../components/Alert';
import PortfolioPerformance from '../../components/PortfolioPerformance'; 
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { fetchWithToken } from '../../utils/api';

const durl = process.env.NEXT_PUBLIC_API_URL;

const fetchPortfolioData = async () => {
  try {
    const data = await fetchWithToken(`${durl}/api/portfolio/get/`);
    return data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error.message);
    throw error;
  }
};

const fetchPortfolioPerformanceData = async () => {
  try {
    const data = await fetchWithToken(`${durl}/api/portfolio/performance/`);
    return data;
  } catch (error) {
    console.error('Error fetching portfolio performance data:', error.message);
    throw error;
  }
};

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [showPerformance, setShowPerformance] = useState(false); // State to toggle performance view
  const [error, setError] = useState(null);

  const getPortfolioData = async () => {
    try {
      const data = await fetchPortfolioData();
      console.log('Fetched portfolio data:', data); 
      setPortfolio(data);
    } catch (error) {
      setError('Failed to fetch portfolio data');
    }
  };

  const getPortfolioPerformanceData = async () => {
    try {
      const data = await fetchPortfolioPerformanceData();
      console.log('Fetched portfolio performance data:', data);
      setPerformanceData(data);
    } catch (error) {
      setError('Failed to fetch portfolio performance data');
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  useEffect(() => {
    if (showPerformance) {
      getPortfolioPerformanceData();
    }
  }, [showPerformance]);

  if (error) {
    return <div>Error: {error}</div>;
  } 

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <NavBar />
      </div>

      <div className="flex flex-col min-h-screen bg-[#FFFFFF] dark:bg-[#706C61] pt-16">
        <div className="flex flex-row mt-0">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mx-4 mt-1">Your Portfolio</h2>
            <PortfolioDashboard portfolio={portfolio} refreshPortfolio={getPortfolioData} />
          </div>

          <div className="w-80 p-4">
            <Alert portfolio={portfolio} />
          </div>
        </div>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center mt-4">
          <button
            className="px-4 py-2 bg-[#E1F4F3] text-[#333333] rounded"
            onClick={() => setShowPerformance(!showPerformance)}
          >
            {showPerformance ? 'Hide Performance' : 'Show Performance'}
          </button>
          {showPerformance && <PortfolioPerformance data={performanceData} />}
        </main>
      </div>

      <Footer />
    </div>
  );


  return (
    <div>
      {/* Fixed header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <NavBar />
      </div>

      {/* Main content container */}
      <div className="flex flex-col min-h-screen bg-[#FFFFFF] dark:bg-[#706C61] pt-16">
        {/* PortfolioDashboard close to the NavBar */}
        <div className="mt-0">
          <PortfolioDashboard portfolio={portfolio} refreshPortfolio={getPortfolioData} />
        </div>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center mt-4">
          <button 
            className="px-4 py-2 bg-[#E1F4F3] text-[#333333] rounded"
            onClick={() => setShowPerformance(!showPerformance)}
          >
            {showPerformance ? 'Hide Performance' : 'Show Performance'}
          </button>
          {showPerformance && <PortfolioPerformance data={performanceData} />}
        </main>
      </div>

      <Footer />
    </div>
  );


  

};

export default PortfolioPage;


