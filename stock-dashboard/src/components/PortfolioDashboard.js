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
    <div className="flex flex-col items-center w-full px-4 py-2 bg-[#F5F8FA] dark:bg-[#111827]">
      {portfolio.length > 0 ? (
        <table className="min-w-full divide-y divide-[#E5E7EB] dark:divide-[#374151] rounded-lg overflow-hidden shadow-md">
          <thead className="bg-[#FFFFFF] dark:bg-[#1F2937] text-[#111827] dark:text-[#F9FAFB]">
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
          <tbody className="bg-[#F5F8FA] dark:bg-[#111827] divide-y divide-[#E5E7EB] dark:divide-[#374151] text-[#111827] dark:text-[#F9FAFB]">
            {portfolio.map((stock) => (
              <tr
                key={stock.Symbol}
                onClick={() => handleRowClick(stock.Symbol)}
                className="cursor-pointer hover:bg-[#FFFFFF] dark:hover:bg-[#1F2937] transition-colors duration-300"
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
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${stock.PercentageChange >= 0 ? 'text-[#10B981] dark:text-[#34D399]' : 'text-[#EF4444] dark:text-[#F87171]'}`}>
                  {stock.PercentageChange.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{stock.MarketState}</td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-[#0EA5E9] dark:text-[#38BDF8] cursor-pointer hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors duration-200" 
                  onClick={(e) => handleRemoveClick(stock.Symbol, e)}
                >
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-[#111827] dark:text-[#F9FAFB]">No data available</p>
      )}
    </div>
  );
};

export default PortfolioDashboard;