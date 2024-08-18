
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { removeStockFromPortfolio } from '../utils/api';

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'INR':
      return '₹';
    case 'GBp':
      return '£';
    default:
      return '$';
  }
};

const PortfolioDashboard = ({ portfolio, refreshPortfolio }) => {
  const router = useRouter();

  const handleRowClick = (symbol) => {
    router.push(`/dashboard/${symbol}/chart`);
  };

  const handleRemoveClick = async (symbol, e) => {
    e.stopPropagation();
    try {
      await removeStockFromPortfolio(symbol);
      await refreshPortfolio();
      console.log(`Stock ${symbol} removed from portfolio.`);
    } catch (error) {
      console.error('Failed to remove stock from portfolio:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-2">
      {portfolio.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-[#E1F4F3] text-[#333333]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Market Cap</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Open</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Change %</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Market State</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#FFFFFF] text-[#333333] divide-y divide-[#E1F4F3]">
            {portfolio.map((stock) => (
              <tr
                key={stock.Symbol}
                onClick={() => handleRowClick(stock.Symbol)}
                className="cursor-pointer hover:bg-[#E1F4F3] hover:text-[#333333] transition-colors duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{stock.CompanyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getCurrencySymbol(stock.Currency)}{stock.MarketCap.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getCurrencySymbol(stock.Currency)}{stock.Open.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {getCurrencySymbol(stock.Currency)}{stock.CurrentPrice.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${stock.PercentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.PercentageChange.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{stock.MarketState}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer" onClick={(e) => handleRemoveClick(stock.Symbol, e)}>
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-[#333333]">No data available</p>
      )}
    </div>
  );
};

export default PortfolioDashboard;

