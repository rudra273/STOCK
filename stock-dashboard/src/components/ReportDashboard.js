// // src/components/ReportDashboard.js

// import React from 'react';

// const ReportDashboard = ({ stocks }) => {
//   const getTopGainers = (stocks) => {
//     return stocks.sort((a, b) => b.PercentageChange - a.PercentageChange).slice(0, 5);
//   };

//   const getTopLosers = (stocks) => {
//     return stocks.sort((a, b) => a.PercentageChange - b.PercentageChange).slice(0, 5);
//   };

//   const getHighestMarketCap = (stocks) => {
//     return stocks.sort((a, b) => b.MarketCap - a.MarketCap).slice(0, 5);
//   };

//   const topGainers = getTopGainers(stocks);
//   const topLosers = getTopLosers(stocks);
//   const highestMarketCap = getHighestMarketCap(stocks);

//   return (
//     <div className="bg-[#FFFFFF] dark:bg-[#222831] min-h-screen">
//       <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//           <h1 className="text-4xl font-bold mb-6 text-[#393E46] dark:text-[#00ADB5]">Stock Report</h1>
//           <div className="flex flex-col md:flex-row gap-8 p-8">
//             {/* Top Gainers Card */}
//             <div className="bg-[#FFFFFF] shadow-lg rounded-sm p-6 w-full md:w-1/3 flex flex-col">
//               <h2 className="text-xl font-bold mb-4 text-[#333333]">Top Gainers</h2>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-[#E1F4F3]">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change %</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-[#FFFFFF] divide-y divide-gray-200">
//                   {topGainers.map((stock) => (
//                     <tr key={stock.Symbol}>
//                       <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
//                       <td className={`px-4 py-2 whitespace-nowrap text-sm ${stock.PercentageChange >= 0 ? 'text-green-500' : 'text-red-500'} truncate`}>
//                         {stock.PercentageChange.toFixed(2)}%
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
    
//             {/* Top Losers Card */}
//             <div className="bg-[#FFFFFF] shadow-lg rounded-sm p-6 w-full md:w-1/3 flex flex-col">
//               <h2 className="text-xl font-bold mb-4 text-[#333333]">Top Losers</h2>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-[#E1F4F3]">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change %</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-[#FFFFFF] divide-y divide-gray-200">
//                   {topLosers.map((stock) => (
//                     <tr key={stock.Symbol}>
//                       <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
//                       <td className={`px-4 py-2 whitespace-nowrap text-sm ${stock.PercentageChange >= 0 ? 'text-green-500' : 'text-red-500'} truncate`}>
//                         {stock.PercentageChange.toFixed(2)}%
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
    
//             {/* Top Market Cap Card */}
//             <div className="bg-[#FFFFFF] shadow-lg rounded-sm p-6 w-full md:w-1/3 flex flex-col">
//               <h2 className="text-xl font-bold mb-4 text-[#333333]">Top Market Cap</h2>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-[#E1F4F3]">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-[#FFFFFF] divide-y divide-gray-200">
//                   {highestMarketCap.map((stock) => (
//                     <tr key={stock.Symbol}>
//                       <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
//                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${stock.MarketCap.toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
  
  

// };

// export default ReportDashboard;
import React from 'react';

const StockCard = ({ title, data, columns }) => (
  <div className="bg-[#FFFFFF] dark:bg-[#706C61] shadow-lg rounded-sm p-6 w-full flex flex-col h-full border border-[#E1F4F3]">
    <h2 className="text-xl font-bold mb-4 text-[#333333] truncate">{title}</h2>
    <div className="overflow-x-auto flex-grow">
      <table className="w-full">
        <thead className="bg-[#E1F4F3]">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 text-left text-xs font-medium text-[#706C61] uppercase tracking-wider">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E1F4F3]">
          {data.map((stock) => (
            <tr key={stock.Symbol}>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-[#333333] truncate">
                {stock.CompanyName}
              </td>
              <td className={`px-4 py-2 whitespace-nowrap text-sm truncate ${
                'PercentageChange' in stock
                  ? stock.PercentageChange >= 0 ? 'text-green-500' : 'text-red-500'
                  : 'text-[#706C61]'
              }`}>
                {'PercentageChange' in stock
                  ? `${stock.PercentageChange.toFixed(2)}%`
                  : `$${stock.MarketCap.toLocaleString()}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ReportDashboard = ({ stocks }) => {
  const getTopGainers = (stocks) => {
    return stocks.sort((a, b) => b.PercentageChange - a.PercentageChange).slice(0, 5);
  };

  const getTopLosers = (stocks) => {
    return stocks.sort((a, b) => a.PercentageChange - b.PercentageChange).slice(0, 5);
  };

  const getHighestMarketCap = (stocks) => {
    return stocks.sort((a, b) => b.MarketCap - a.MarketCap).slice(0, 5);
  };

  const topGainers = getTopGainers(stocks);
  const topLosers = getTopLosers(stocks);
  const highestMarketCap = getHighestMarketCap(stocks);

  return (
    <div className="dark:bg-[#706C61] bg-[#FFFFFF] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-[#333333] text-center">Stock Report</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StockCard 
            title="Top Gainers" 
            data={topGainers} 
            columns={['Company Name', 'Change %']}
          />
          <StockCard 
            title="Top Losers" 
            data={topLosers} 
            columns={['Company Name', 'Change %']}
          />
          <StockCard 
            title="Top Market Cap" 
            data={highestMarketCap} 
            columns={['Company Name', 'Market Cap']}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;