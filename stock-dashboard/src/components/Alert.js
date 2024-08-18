"use client";

import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../utils/api'; // Adjust the import path as needed

const Alert = ({ portfolio }) => {
  const [alertType, setAlertType] = useState('price');
  const [stockSymbol, setStockSymbol] = useState('');
  const [threshold, setThreshold] = useState('');
  const [percentage, setPercentage] = useState('');
  const [availableStocks, setAvailableStocks] = useState([]);

  useEffect(() => {
    // Set available stocks from the portfolio
    if (portfolio.length > 0) {
      setAvailableStocks(portfolio.map(stock => ({ symbol: stock.Symbol, name: stock.CompanyName })));
    }
  }, [portfolio]);

  const handleAlertTypeChange = (e) => {
    setAlertType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy API call or functionality here
    console.log('Alert set:', { stockSymbol, alertType, threshold, percentage });
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Set Alert</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Stock:</label>
          <select
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>Select a stock</option>
            {availableStocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Alert Type:</label>
          <select
            value={alertType}
            onChange={handleAlertTypeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="price">Price</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>

        {alertType === 'price' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Threshold Price:</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        {alertType === 'percentage' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Threshold Percentage:</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#E1F4F3] text-[#333333] py-2 rounded-md hover:bg-[#B0D0CE]  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Set Alert
        </button>
      </form>
    </div>
  );
};

export default Alert;
