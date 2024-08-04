"use client";

import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2'; // Import Line and Bar chart components from Chart.js
import Chart from 'chart.js/auto'; // Import Chart.js
import NavBar from '../../../../components/NavBar';
import Footer from '../../../../components/Footer';

const getToken = () => {
  return localStorage.getItem('access_token');
};

const fetchHistoricalStockData = async (symbol, period) => {
  const token = getToken();  // Function to get the token from localStorage

  const lurl = 'http://localhost:8002';
  const durl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${lurl}/api/historical-stock-data/?symbol=${symbol}&period=${period}`, {
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
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw error;
  }
};

const calculatePercentageGain = (data) => {
  if (data.length < 2) return 0;
  const startPrice = data[0].Close; // Price at the beginning of the period
  const endPrice = data[data.length - 1].Close; // Price at the end of the period
  return ((endPrice - startPrice) / startPrice) * 100;
};

const ChartPage = ({ params }) => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('1mo'); // Default period is 1 month
  const [percentageGain, setPercentageGain] = useState(0);
  const [chartType, setChartType] = useState('line'); // Default chart type is Line

  useEffect(() => {
    const getData = async () => {
      try {
        const historicalData = await fetchHistoricalStockData(params.Symbol, period);
        setData(historicalData);
        setPercentageGain(calculatePercentageGain(historicalData));
      } catch (error) {
        console.error('Error fetching historical stock data:', error.message);
      }
    };

    getData();
  }, [params.Symbol, period]);

  const chartData = {
    labels: data.map(item => new Date(item.Date).toLocaleDateString()),
    datasets: [
      {
        label: 'Close Price',
        data: data.map(item => item.Close),
        fill: false,
        backgroundColor: '#96B6C5', // Light Purple
        borderColor: '#96B6C5', // Light Purple
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.3,
      },
    ],
  };

  const barChartData = {
    labels: data.map(item => new Date(item.Date).toLocaleDateString()),
    datasets: [
      {
        label: 'Close Price',
        data: data.map(item => item.Close),
        backgroundColor: '#987D9A', // Light Purple
        borderColor: '#987D9A', // Light Purple
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
          },
          color: '#333333', // Dark Gray
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: $${tooltipItem.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333333', // Dark Gray
          font: {
            size: 14,
          }
        }
      },
      y: {
        grid: {
          borderColor: '#987D9A', // Light Purple
          borderWidth: 1,
          drawBorder: false,
        },
        ticks: {
          color: '#333333', // Dark Gray
          font: {
            size: 14,
          }
        }
      },
    },
  };

  const percentageColor = percentageGain >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#333333] min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
        <div className="relative w-full max-w-4xl mb-6">
          
          <main className="flex flex-col items-center justify-center w-full flex-1 px-6 text-center mt-10">
            <h1 className="text-4xl font-bold text-[#333333] dark:text-[#FFFFFF] mb-6">
              Stock Chart for {params.Symbol}
            </h1>
            <div className='flex'>
            <div className="mb-4">
              <label htmlFor="period" className="mr-2 text-lg text-[#333333] dark:text-[#FFFFFF]">Select Period:</label>
              <select
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-[#E1F4F3] border rounded p-2 text-sm text-[#333333] dark:text-[#FFFFFF] border-[#333333] dark:border-[#FFFFFF]"
              >
                <option value="1w">1 Week</option>
                <option value="1mo">1 Month</option>
                <option value="3mo">3 Months</option> 
                <option value="6mo">6 Months</option>
                <option value="1y">1 Year</option>
              </select>
            </div>  
            <div className='m-1 mx-4'>
              <button
                onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}
                className="top-4 left-4 bg-[#FFFFFF] dark:bg-[#706C61] text-[#333333] dark:text-[#FFFFFF] py-1 px-2 rounded-md shadow-lg hover:bg-[#E1F4F3] dark:hover:bg-[#333333] transition duration-300 text-sm"
              >
                {chartType === 'line' ? 'Bar Chart' : 'Line Chart'}
              </button>
            </div>  
            </div>

            <div className="mb-6 flex items-center">
              <h2 className="text-2xl font-semibold text-[#333333] dark:text-[#FFFFFF]">Change:</h2>
              <p className={`text-2xl mx-2 ${percentageColor}`}>{percentageGain.toFixed(2)}%</p>
            </div>
            {chartType === 'line' ? (
              <div className="w-full max-w-4xl">
                <Line data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="w-full max-w-4xl">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChartPage;
