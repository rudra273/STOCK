import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addStockToPortfolio, getPortfolio, removeStockFromPortfolio } from '../utils/api';

const StockDashboard = ({ stocks }) => {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState('ALL');
  const [favoritedStocks, setFavoritedStocks] = useState(new Set());

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolio = await getPortfolio();
        const portfolioSymbols = new Set(portfolio.map(stock => stock.Symbol));
        setFavoritedStocks(portfolioSymbols);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  const getColor = (percentage) => {
    return percentage >= 0 
      ? 'text-[#10B981] dark:text-[#34D399]'  // success colors
      : 'text-[#EF4444] dark:text-[#F87171]'; // danger colors
  };

  const handleRowClick = (symbol) => {
    router.push(`/dashboard/${symbol}/chart`);
  };

  const handleStarClick = async (symbol, e) => {
    e.stopPropagation();
    try {
      if (favoritedStocks.has(symbol)) {
        await removeStockFromPortfolio(symbol);
        setFavoritedStocks(prev => {
          const updatedFavorites = new Set(prev);
          updatedFavorites.delete(symbol);
          return updatedFavorites;
        });
      } else {
        await addStockToPortfolio(symbol);
        setFavoritedStocks(prev => {
          const updatedFavorites = new Set(prev);
          updatedFavorites.add(symbol);
          return updatedFavorites;
        });
      }
    } catch (error) {
      console.error('Failed to update portfolio:', error);
    }
  };

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

  const filteredStocks = selectedCurrency === 'ALL'
    ? stocks
    : stocks.filter(stock => stock.Currency === selectedCurrency);

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-xl font-bold mb-4 text-[#111827] dark:text-[#F9FAFB]">Stock Dashboard</h2>
      
      {/* Currency filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['ALL', 'USD', 'INR', 'GBp'].map(currency => (
          <button
            key={currency}
            onClick={() => setSelectedCurrency(currency)}
            className={`px-4 py-1 rounded-md transition duration-200 ${
              selectedCurrency === currency
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#FFFFFF] dark:bg-[#374151] text-[#111827] dark:text-[#F9FAFB] hover:bg-[#2563EB] hover:text-white'
            }`}
          >
            {currency}
          </button>
        ))}
      </div>

      {/* Responsive table container */}
      <div className="overflow-x-auto rounded-lg border border-[#E5E7EB] dark:border-[#374151]">
        <table className="min-w-full divide-y divide-[#E5E7EB] dark:divide-[#374151]">
          <thead className="bg-[#F9FAFB] dark:bg-[#1F2937]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#111827] dark:text-[#F9FAFB] uppercase tracking-wider">Fav</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#111827] dark:text-[#F9FAFB] uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#111827] dark:text-[#F9FAFB] uppercase tracking-wider">Market Cap</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#111827] dark:text-[#F9FAFB] uppercase tracking-wider">Open</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#111827] dark:text-[#F9FAFB] uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#111827] dark:text-[#F9FAFB] uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1F2937] divide-y divide-[#E5E7EB] dark:divide-[#374151]">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <tr
                  key={stock.Symbol}
                  onClick={() => handleRowClick(stock.Symbol)}
                  className="cursor-pointer hover:bg-[#F9FAFB] dark:hover:bg-[#374151] transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-[#4B5563] dark:text-[#D1D5DB]">
                    <button
                      onClick={(e) => handleStarClick(stock.Symbol, e)}
                      className={`text-lg ${
                        favoritedStocks.has(stock.Symbol) 
                          ? 'text-[#0EA5E9] dark:text-[#38BDF8]' // accent colors
                          : 'text-[#111827] dark:text-[#F9FAFB]'
                      } hover:text-[#0EA5E9] dark:hover:text-[#38BDF8]`}
                    >
                      {favoritedStocks.has(stock.Symbol) ? '★' : '☆'}
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">{stock.CompanyName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-[#111827] dark:text-[#F9FAFB]">{getCurrencySymbol(stock.Currency)}{stock.MarketCap.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-[#111827] dark:text-[#F9FAFB]">{getCurrencySymbol(stock.Currency)}{stock.Open.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">{getCurrencySymbol(stock.Currency)}{stock.CurrentPrice.toFixed(2)}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${getColor(stock.PercentageChange)}`}>
                    {stock.PercentageChange.toFixed(2)}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  No stocks found for the selected currency.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockDashboard;