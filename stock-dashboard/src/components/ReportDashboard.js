
// // ----------------------------------------------------------------------------------------------------

// import React from 'react';

// const ReportDashboard = ({ stocks }) => {
//   // Conversion rates
//   const conversionRates = {
//     INR: 1 / 83, // 1 USD = 83 INR
//     GBp: 1 / 0.79, // 1 USD = 0.79 GBP
//   };

//   // Convert market cap to USD
//   const convertToUSD = (value, currency) => {
//     if (currency === 'USD') return value;
//     return value * (conversionRates[currency] || 1); // Default to 1 if currency is not found
//   };

//   // Get top gainers with only positive percentage changes
//   const getTopGainers = (stocks) => {
//     return stocks
//       .filter(stock => stock.PercentageChange > 0)
//       .sort((a, b) => b.PercentageChange - a.PercentageChange)
//       .slice(0, 5);
//   };

//   // Get top losers with only negative percentage changes
//   const getTopLosers = (stocks) => {
//     return stocks
//       .filter(stock => stock.PercentageChange < 0)
//       .sort((a, b) => a.PercentageChange - b.PercentageChange)
//       .slice(0, 5);
//   };

//   const getHighestMarketCap = (stocks) => {
//     const stocksInUSD = stocks.map(stock => ({
//       ...stock,
//       MarketCapInUSD: convertToUSD(stock.MarketCap, stock.Currency),
//     }));
//     return stocksInUSD.sort((a, b) => b.MarketCapInUSD - a.MarketCapInUSD).slice(0, 5);
//   };

//   const topGainers = getTopGainers(stocks);
//   const topLosers = getTopLosers(stocks);
//   const highestMarketCap = getHighestMarketCap(stocks);

//   return (
//     <div className="flex flex-col md:flex-row gap-8 p-8">
//       {/* Top Gainers Card */}
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
//         <h2 className="text-xl font-bold mb-4">Top Gainers</h2>
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
//                 <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${stock.MarketCapInUSD.toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReportDashboard;

// ----------------------------------------------------------------------------------------------------------------

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

  // Get top gainers with only positive percentage changes
  const getTopGainers = (stocks) => {
    return stocks
      .filter(stock => stock.PercentageChange > 0)
      .sort((a, b) => b.PercentageChange - a.PercentageChange)
      .slice(0, 5);
  };

  // Get top losers with only negative percentage changes
  const getTopLosers = (stocks) => {
    return stocks
      .filter(stock => stock.PercentageChange < 0)
      .sort((a, b) => a.PercentageChange - b.PercentageChange)
      .slice(0, 5);
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
    <div className="flex flex-col gap-6 w-full">
      {/* Top Gainers Card */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-full">
        <h2 className="text-lg font-bold mb-2">Top Gainers</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-gray-600">Company Name</th>
              <th className="text-left text-sm font-medium text-gray-600">Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {topGainers.map(stock => (
              <tr key={stock.Symbol}>
                <td className="py-2 text-sm text-gray-800">{stock.CompanyName}</td>
                <td className={`py-2 text-sm ${stock.PercentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.PercentageChange.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Losers Card */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-full">
        <h2 className="text-lg font-bold mb-2">Top Losers</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-gray-600">Company Name</th>
              <th className="text-left text-sm font-medium text-gray-600">Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {topLosers.map(stock => (
              <tr key={stock.Symbol}>
                <td className="py-2 text-sm text-gray-800">{stock.CompanyName}</td>
                <td className={`py-2 text-sm ${stock.PercentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.PercentageChange.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Highest Market Capitalization Card */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-full">
        <h2 className="text-lg font-bold mb-2">Highest Market Capitalization</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-gray-600">Company Name</th>
              <th className="text-left text-sm font-medium text-gray-600">Market Cap (USD)</th>
            </tr>
          </thead>
          <tbody>
            {highestMarketCap.map(stock => (
              <tr key={stock.Symbol}>
                <td className="py-2 text-sm text-gray-800">{stock.CompanyName}</td>
                <td className="py-2 text-sm text-gray-800">${stock.MarketCapInUSD.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportDashboard;

