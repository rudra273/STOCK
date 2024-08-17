// "use client";

// import React, { useEffect, useState } from 'react';
// import PortfolioDashboard from '../../components/PortfolioDashboard';
// import NavBar from '../../components/NavBar';
// import Footer from '../../components/Footer';
// import { fetchWithToken } from '../../utils/api';

// const durl = process.env.NEXT_PUBLIC_API_URL;

// const fetchPortfolioData = async () => {
//   try {
//     const data = await fetchWithToken(`${durl}/api/portfolio/get/`);
//     return data;
//   } catch (error) {
//     console.error('Error fetching portfolio data:', error.message);
//     throw error;
//   }
// };

// const PortfolioPage = () => {
//   const [portfolio, setPortfolio] = useState([]);
//   const [error, setError] = useState(null);

//   const getPortfolioData = async () => {
//     try {
//       const data = await fetchPortfolioData();
//       console.log('Fetched portfolio data:', data); 
//       setPortfolio(data);
//     } catch (error) {
//       setError('Failed to fetch portfolio data');
//     }
//   };

//   useEffect(() => {
//     getPortfolioData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <NavBar />
//       <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-[#FFFFFF] dark:bg-[#706C61]">
//         <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//           <PortfolioDashboard portfolio={portfolio} refreshPortfolio={getPortfolioData} />
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PortfolioPage;

"use client";

import React, { useEffect, useState } from 'react';
import PortfolioDashboard from '../../components/PortfolioDashboard';
import PortfolioPerformance from '../../components/PortfolioPerformance'; // Import the new component
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
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-[#FFFFFF] dark:bg-[#706C61]">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <PortfolioDashboard portfolio={portfolio} refreshPortfolio={getPortfolioData} />
          <button 
            className="mt-5 px-4 py-2 bg-[#E1F4F3] text-[#333333] rounded"
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
