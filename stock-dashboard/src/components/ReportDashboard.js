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


// --------------------------------------------------------------------------------------------------------------

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
//     <div className="flex flex-col md:flex-row gap-8 p-8">
//       {/* Top Gainers Card */}
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
//         <h2 className="text-xl font-bold mb-4">Top Gainers</h2>
//         {/* <p className="mb-4 text-sm text-gray-500">Companies with the highest percentage increase in stock price.</p> */}
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage Change</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {topGainers.map((stock) => (
//               <tr key={stock.Symbol}>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
//                 <td className={`px-4 py-2 whitespace-nowrap text-sm ${stock.PercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                   {stock.PercentageChange.toFixed(2)}%
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Top Losers Card */}
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
//         <h2 className="text-xl font-bold mb-4">Top Losers</h2>
//         {/* <p className="mb-4 text-sm text-gray-500">Companies with the highest percentage decrease in stock price.</p> */}
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage Change</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {topLosers.map((stock) => (
//               <tr key={stock.Symbol}>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
//                 <td className={`px-4 py-2 whitespace-nowrap text-sm ${stock.PercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                   {stock.PercentageChange.toFixed(2)}%
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Highest Market Capitalization Card */}
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
//         <h2 className="text-xl font-bold mb-4">Highest Market Capitalization</h2>
//         {/* <p className="mb-4 text-sm text-gray-500">Companies with the largest market capitalization.             </p> */}
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {highestMarketCap.map((stock) => (
//               <tr key={stock.Symbol}>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${stock.MarketCap.toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReportDashboard;


// ---------------------------------------------------------------------------------------------------------------------



import React from 'react';

const ReportDashboard = ({ stocks }) => {
  // Conversion rates
  const conversionRates = {
    INR: 1 / 83, // 1 USD = 83 INR
    GBp: 1 / 0.79, // 1 USD = 0.79 GBP
  };

  // Convert market cap to USD
  const convertToUSD = (value, currency) => {
    if (currency === 'USD') return value;
    return value * (conversionRates[currency] || 1); // Default to 1 if currency is not found
  };

  const getTopGainers = (stocks) => {
    return stocks.sort((a, b) => b.PercentageChange - a.PercentageChange).slice(0, 5);
  };

  const getTopLosers = (stocks) => {
    return stocks.sort((a, b) => a.PercentageChange - b.PercentageChange).slice(0, 5);
  };

  const getHighestMarketCap = (stocks) => {
    const stocksInUSD = stocks.map(stock => ({
      ...stock,
      MarketCapInUSD: convertToUSD(stock.MarketCap, stock.Currency),
    }));
    return stocksInUSD.sort((a, b) => b.MarketCapInUSD - a.MarketCapInUSD).slice(0, 5);
  };

  const topGainers = getTopGainers(stocks);
  const topLosers = getTopLosers(stocks);
  const highestMarketCap = getHighestMarketCap(stocks);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Top Gainers Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Top Gainers</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage Change</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topGainers.map((stock) => (
              <tr key={stock.Symbol}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
                <td className={`px-4 py-2 whitespace-nowrap text-sm ${stock.PercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.PercentageChange.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Losers Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Top Losers</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage Change</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topLosers.map((stock) => (
              <tr key={stock.Symbol}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
                <td className={`px-4 py-2 whitespace-nowrap text-sm ${stock.PercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.PercentageChange.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Highest Market Capitalization Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Highest Market Capitalization</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {highestMarketCap.map((stock) => (
              <tr key={stock.Symbol}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${stock.MarketCapInUSD.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportDashboard;

