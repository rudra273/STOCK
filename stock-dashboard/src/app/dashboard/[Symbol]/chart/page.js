"use client";

import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import NavBar from '../../../../components/NavBar';
import Footer from '../../../../components/Footer';
import { fetchWithToken } from '../../../../utils/api';

const getToken = () => {
  return localStorage.getItem('access_token');
};

const fetchHistoricalStockData = async (symbol, period) => {
  const lurl = 'http://localhost:8002';
  const durl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const data = await fetchWithToken(`${durl}/api/historical-stock-data/?symbol=${symbol}&period=${period}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw error;
  }
};

const calculatePercentageGain = (data) => {
  if (data.length < 2) return 0;
  const startPrice = data[0].Close;
  const endPrice = data[data.length - 1].Close;
  return ((endPrice - startPrice) / startPrice) * 100;
};

const ChartPage = ({ params }) => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('1mo');
  const [percentageGain, setPercentageGain] = useState(0);
  const [chartType, setChartType] = useState('line');

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
        backgroundColor: '#2563EB', // Updated to primary light
        borderColor: '#2563EB',     // Updated to primary light
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
        backgroundColor: '#3B82F6', // Updated to primary dark
        borderColor: '#3B82F6',     // Updated to primary dark
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
          color: '#111827', // text-primary light
          // Note: Chart.js doesn't support Tailwind dark: classes directly, so we'll handle dark mode via CSS variables or media queries if needed
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
          color: '#4B5563', // text-secondary light
          font: {
            size: 14,
          }
        }
      },
      y: {
        grid: {
          borderColor: '#E5E7EB', // border light
          borderWidth: 1,
          drawBorder: false,
        },
        ticks: {
          color: '#4B5563', // text-secondary light
          font: {
            size: 14,
          }
        }
      },
    },
  };

  return (
    <div className="bg-[#F5F8FA] dark:bg-[#111827] min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
        <div className="relative w-full max-w-4xl mb-6">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-6 text-center mt-10">
            <h1 className="text-4xl font-bold text-[#111827] dark:text-[#F9FAFB] mb-6">
              Stock Chart for {params.Symbol}
            </h1>
            <div className="flex justify-center space-x-4">
              <div className="mb-4">
                <label htmlFor="period" className="mr-2 text-lg text-[#4B5563] dark:text-[#D1D5DB]">Select Period:</label>
                <select
                  id="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="bg-[#FFFFFF] dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded p-2 text-sm text-[#111827] dark:text-[#F9FAFB]"
                >
                  <option value="1w" className="bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]">1 Week</option>
                  <option value="1mo" className="bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]">1 Month</option>
                  <option value="3mo" className="bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]">3 Months</option>
                  <option value="6mo" className="bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]">6 Months</option>
                  <option value="1y" className="bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]">1 Year</option>
                </select>
              </div>
              <div className="m-1 mx-4">
                <button
                  onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}
                  className="bg-[#0EA5E9] dark:bg-[#38BDF8] text-white py-1 px-2 rounded-md shadow-md hover:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition duration-300 text-sm"
                >
                  {chartType === 'line' ? 'Bar Chart' : 'Line Chart'}
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-[#111827] dark:text-[#F9FAFB]">Change:</h2>
              <p className={`text-2xl mx-2 ${percentageGain >= 0 ? 'text-[#10B981] dark:text-[#34D399]' : 'text-[#EF4444] dark:text-[#F87171]'}`}>
                {percentageGain.toFixed(2)}%
              </p>
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