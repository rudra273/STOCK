"use client";

import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../utils/api';

const Alert = ({ portfolio }) => {
  const [alertType, setAlertType] = useState('price');
  const [stockSymbol, setStockSymbol] = useState('');
  const [threshold, setThreshold] = useState('');
  const [percentage, setPercentage] = useState('');
  const [availableStocks, setAvailableStocks] = useState([]);

  useEffect(() => {
    if (portfolio.length > 0) {
      setAvailableStocks(portfolio.map(stock => ({ symbol: stock.Symbol, name: stock.CompanyName })));
    }
  }, [portfolio]);

  const handleAlertTypeChange = (e) => {
    setAlertType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Alert set:', { stockSymbol, alertType, threshold, percentage });
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] p-4 rounded-lg shadow-md border border-[#E5E7EB] dark:border-[#374151]">
      <h3 className="text-lg font-bold text-[#111827] dark:text-[#F9FAFB] mb-4">Set Alert</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#4B5563] dark:text-[#D1D5DB]">Select Stock:</label>
          <select
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            className="mt-1 block w-full p-2 border border-[#E5E7EB] dark:border-[#374151] rounded-md shadow-sm focus:ring-[#2563EB] focus:border-[#2563EB] dark:focus:ring-[#3B82F6] dark:focus:border-[#3B82F6] sm:text-sm bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]"
            required
          >
            <option value="" disabled>Select a stock</option>
            {availableStocks.map((stock) => (
              <option 
                key={stock.symbol} 
                value={stock.symbol} 
                className="bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]"
              >
                {stock.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#4B5563] dark:text-[#D1D5DB]">Alert Type:</label>
          <select
            value={alertType}
            onChange={handleAlertTypeChange}
            className="mt-1 block w-full p-2 border border-[#E5E7EB] dark:border-[#374151] rounded-md shadow-sm focus:ring-[#2563EB] focus:border-[#2563EB] dark:focus:ring-[#3B82F6] dark:focus:border-[#3B82F6] sm:text-sm bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]"
          >
            <option value="price" className="bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]">Price</option>
            <option value="percentage" className="bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]">Percentage</option>
          </select>
        </div>

        {alertType === 'price' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#4B5563] dark:text-[#D1D5DB]">Threshold Price:</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="mt-1 block w-full p-2 border border-[#E5E7EB] dark:border-[#374151] rounded-md shadow-sm focus:ring-[#2563EB] focus:border-[#2563EB] dark:focus:ring-[#3B82F6] dark:focus:border-[#3B82F6] sm:text-sm bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]"
              required
            />
          </div>
        )}

        {alertType === 'percentage' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#4B5563] dark:text-[#D1D5DB]">Threshold Percentage:</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="mt-1 block w-full p-2 border border-[#E5E7EB] dark:border-[#374151] rounded-md shadow-sm focus:ring-[#2563EB] focus:border-[#2563EB] dark:focus:ring-[#3B82F6] dark:focus:border-[#3B82F6] sm:text-sm bg-[#F5F8FA] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#0EA5E9] dark:bg-[#38BDF8] text-white py-2 rounded-md hover:bg-[#2563EB] dark:hover:bg-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6] transition duration-200"
        >
          Set Alert
        </button>
      </form>
    </div>
  );
};

export default Alert;