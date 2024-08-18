///-----------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { addStockToPortfolio } from '../utils/api';

// const StockDashboard = ({ stocks }) => {
//   const router = useRouter();
//   const [selectedCurrency, setSelectedCurrency] = useState('ALL');
//   const [favoritedStocks, setFavoritedStocks] = useState(new Set());

//   const getColor = (percentage) => {
//     return percentage >= 0 ? 'text-green-500' : 'text-red-500';
//   };

//   const handleRowClick = (symbol) => {
//     router.push(`/dashboard/${symbol}/chart`);
//   };

//   const handleStarClick = async (symbol, e) => {
//     e.stopPropagation();
//     try {
//       await addStockToPortfolio(symbol);
//       setFavoritedStocks(prev => {
//         const updatedFavorites = new Set(prev);
//         if (updatedFavorites.has(symbol)) {
//           updatedFavorites.delete(symbol);
//         } else {
//           updatedFavorites.add(symbol);
//         }
//         return updatedFavorites;
//       });
//     } catch (error) {
//       console.error('Failed to add stock to portfolio:', error);
//     }
//   };

//   const getCurrencySymbol = (currency) => {
//     switch (currency) {
//       case 'USD':
//         return '$';
//       case 'INR':
//         return '₹';
//       case 'GBp':
//         return '£';
//       default:
//         return '$';
//     }
//   };

//   const filteredStocks = selectedCurrency === 'ALL' 
//     ? stocks 
//     : stocks.filter(stock => stock.Currency === selectedCurrency);

//   return (
//     <div className="flex flex-col items-center">
//       <div className="mb-4">
//         <button 
//           onClick={() => setSelectedCurrency('ALL')} 
//           className={`px-3 py-1 m-2 ${selectedCurrency === 'ALL' ? 'bg-[#706C61] text-white' : 'bg-[#E1F4F3] text-gray-800'} rounded-md hover:bg-[#333333] hover:text-white`}
//         >
//           All
//         </button>
//         <button 
//           onClick={() => setSelectedCurrency('USD')} 
//           className={`px-3 py-1 m-2 ${selectedCurrency === 'USD' ? 'bg-[#706C61] text-white' : 'bg-[#E1F4F3] text-gray-800'} rounded-md hover:bg-[#333333] hover:text-white`}
//         >
//           USD
//         </button>
//         <button 
//           onClick={() => setSelectedCurrency('INR')} 
//           className={`px-3 py-1 m-2 ${selectedCurrency === 'INR' ? 'bg-[#706C61] text-white' : 'bg-[#E1F4F3] text-gray-800'} rounded-md hover:bg-[#333333] hover:text-white`}
//         >
//           INR
//         </button>
//         <button 
//           onClick={() => setSelectedCurrency('GBp')} 
//           className={`px-3 py-1 m-2 ${selectedCurrency === 'GBp' ? 'bg-[#706C61] text-white' : 'bg-[#E1F4F3] text-gray-800'} rounded-md hover:bg-[#333333] hover:text-white`}
//         >
//           GBp
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-transparent dark:bg-[#706C61] bg-[#FFFFFF]">
//           <thead className="dark:bg-[#333333] bg-[#E1F4F3]">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Favorite</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Company Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Market Cap</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Open</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Current Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Change %</th>
//             </tr>
//           </thead>
//           <tbody className="dark:bg-[#706C61] bg-[#FFFFFF]">
//             {filteredStocks.map((stock) => (
//               <tr 
//                 key={stock.Symbol} 
//                 onClick={() => handleRowClick(stock.Symbol)} 
//                 className="cursor-pointer hover:bg-[#E1F4F3] dark:hover:bg-[#333333] hover:shadow-md dark:hover:shadow-md"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-[#FFFFFF]">
//                   <button 
//                     onClick={(e) => handleStarClick(stock.Symbol, e)} 
//                     className={`text-[24px] ${favoritedStocks.has(stock.Symbol) ? 'text-[#E1F4F3]' : 'text-[#333333]'} hover:text-[#E1F4F3]`}
//                   >
//                     {favoritedStocks.has(stock.Symbol) ? '★' : '☆'}
//                   </button>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#333333] dark:text-[#FFFFFF]">{stock.CompanyName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.MarketCap.toLocaleString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.Open.toFixed(2)}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.CurrentPrice.toFixed(2)}</td>
//                 <td 
//                   className={`px-6 py-4 whitespace-nowrap text-sm ${getColor(stock.PercentageChange)} dark:text-[#FFFFFF]`}
//                 >
//                   {stock.PercentageChange.toFixed(2)}%
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StockDashboard;

// -----------------------------------------------------------------------------------------------------------------------

// ===================================================================================

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
    return percentage >= 0 ? 'text-green-500' : 'text-red-500';
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
    <div className="flex flex-col items-center">
      <div className="mb-2 mt-0 flex flex-wrap justify-center">
        <button 
          onClick={() => setSelectedCurrency('ALL')} 
          className={`px-4 m-1 ${selectedCurrency === 'ALL' ? 'bg-[#706C61] text-white' : 'bg-[#E1F4F3] text-gray-800'} rounded-md hover:bg-[#333333] hover:text-white`}
        >
          All
        </button>
        <button 
          onClick={() => setSelectedCurrency('USD')} 
          className={`px-4 m-1 ${selectedCurrency === 'USD' ? 'bg-[#706C61] text-white' : 'bg-[#E1F4F3] text-gray-800'} rounded-md hover:bg-[#333333] hover:text-white`}
        >
          USD
        </button>
        <button 
          onClick={() => setSelectedCurrency('INR')} 
          className={`px-4 m-1 ${selectedCurrency === 'INR' ? 'bg-[#706C61] text-white' : 'bg-[#E1F4F3] text-gray-800'} rounded-md hover:bg-[#333333] hover:text-white`}
        >
          INR
        </button>
        <button 
          onClick={() => setSelectedCurrency('GBp')} 
          className={`px-4 m-1 ${selectedCurrency === 'GBp' ? 'bg-[#706C61] text-white' : 'bg-[#E1F4F3] text-gray-800'} rounded-md hover:bg-[#333333] hover:text-white`}
        >
          GBp
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200 dark:bg-[#706C61] bg-[#FFFFFF]">
          <thead className="dark:bg-[#333333] bg-[#E1F4F3]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider">Fav</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider">Market Cap</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider">Open</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody className="dark:bg-[#706C61] bg-[#FFFFFF]">
            {filteredStocks.map((stock) => (
              <tr 
                key={stock.Symbol} 
                onClick={() => handleRowClick(stock.Symbol)} 
                className="cursor-pointer hover:bg-[#E1F4F3] dark:hover:bg-[#333333] hover:shadow-md dark:hover:shadow-md"
              >
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-[#FFFFFF]">
                  <button 
                    onClick={(e) => handleStarClick(stock.Symbol, e)} 
                    className={`text-[20px] ${favoritedStocks.has(stock.Symbol) ? 'text-[#E1F4F3]' : 'text-[#333333]'} hover:text-[#E1F4F3]`}
                  >
                    {favoritedStocks.has(stock.Symbol) ? '★' : '☆'}
                  </button>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-[#333333] dark:text-[#FFFFFF]">{stock.CompanyName}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.MarketCap.toLocaleString()}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.Open.toFixed(2)}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.CurrentPrice.toFixed(2)}</td>
                <td 
                  className={`px-6 py-3 whitespace-nowrap text-sm ${getColor(stock.PercentageChange)} dark:text-[#FFFFFF]`}
                >
                  {stock.PercentageChange.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-24" /> {/* Increased margin to ensure the last row is not hidden */}
      </div>
    </div>
  );
};

export default StockDashboard;

