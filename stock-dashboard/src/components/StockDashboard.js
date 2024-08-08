// // components/StockDashboard.js

// import React from 'react';

// const StockDashboard = ({ stocks }) => {
//   console.log('Stocks in StockDashboard:', stocks);

//   const getColor = (percentage) => {
//     return percentage >= 0 ? 'text-green-500' : 'text-red-500';
//   };

//   const calculatePercentageChange = (current, previous) => {
//     if (previous === 0) return 0;
//     return ((current - previous) / previous) * 100;
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Change</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly Change</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Change</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yearly Change</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {stocks.map((stock) => (
//             <tr key={stock.Symbol}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.CompanyName}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.MarketCap.toLocaleString()}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stock.Open.toFixed(2)}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${stock.CurrentPrice.toFixed(2)}</td>
//               <td className={`px-6 py-4 whitespace-nowrap text-sm ${getColor(stock.PercentageChange)}`}>
//                 {stock.PercentageChange.toFixed(2)}%
//               </td>
//               <td className={`px-6 py-4 whitespace-nowrap text-sm ${getColor(calculatePercentageChange(stock.CurrentPrice, stock.WeeklyLow))}`}>
//                 {calculatePercentageChange(stock.CurrentPrice, stock.WeeklyLow).toFixed(2)}%
//               </td>
//               <td className={`px-6 py-4 whitespace-nowrap text-sm ${getColor(calculatePercentageChange(stock.CurrentPrice, stock.MonthlyLow))}`}>
//                 {calculatePercentageChange(stock.CurrentPrice, stock.MonthlyLow).toFixed(2)}%
//               </td>
//               <td className={`px-6 py-4 whitespace-nowrap text-sm ${getColor(calculatePercentageChange(stock.CurrentPrice, stock.FiftyTwoWeekLow))}`}>
//                 {calculatePercentageChange(stock.CurrentPrice, stock.FiftyTwoWeekLow).toFixed(2)}%
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StockDashboard;

// -----------------------------------------------------------------------------------------------------------------

// import React from 'react';
// import { useRouter } from 'next/navigation'; // Updated import

// const StockDashboard = ({ stocks }) => {
//   const router = useRouter(); // Initialize router

//   const getColor = (percentage) => {
//     return percentage >= 0 ? 'text-green-500' : 'text-red-500';
//   };

//   const calculatePercentageChange = (current, previous) => {
//     if (previous === 0) return 0;
//     return ((current - previous) / previous) * 100;
//   };

//   const handleRowClick = (symbol) => {
//     router.push(`/dashboard/${symbol}/chart`); // Navigate to the chart page
//   };
  

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-transparent dark:bg-[#706C61] bg-[#FFFFFF]">
//         <thead className="dark:bg-[#333333] bg-[#E1F4F3]">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Company Name</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Market Cap</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Open</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Current Price</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Change %</th>
//           </tr>
//         </thead>
//         <tbody className="dark:bg-[#706C61] bg-[#FFFFFF]">
//           {stocks.map((stock) => (
//             <tr 
//               key={stock.Symbol} 
//               onClick={() => handleRowClick(stock.Symbol)} 
//               className="cursor-pointer hover:bg-[#E1F4F3] dark:hover:bg-[#333333] hover:shadow-md dark:hover:shadow-md"
//             >
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#333333] dark:text-[#FFFFFF]">{stock.CompanyName}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333] dark:text-[#FFFFFF]">{stock.MarketCap.toLocaleString()}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333] dark:text-[#FFFFFF]">${stock.Open.toFixed(2)}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#333333] dark:text-[#FFFFFF]">${stock.CurrentPrice.toFixed(2)}</td>
//               <td 
//                 className={`px-6 py-4 whitespace-nowrap text-sm ${getColor(stock.PercentageChange)} dark:text-[#FFFFFF]`}
//               >
//                 {stock.PercentageChange.toFixed(2)}%
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
  
  

// };

// export default StockDashboard;


// --------------------------------------------------------------------------------------------------------------------------



import React from 'react';
import { useRouter } from 'next/navigation'; // Updated import

const StockDashboard = ({ stocks }) => {
  const router = useRouter(); // Initialize router

  const getColor = (percentage) => {
    return percentage >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const handleRowClick = (symbol) => {
    router.push(`/dashboard/${symbol}/chart`); // Navigate to the chart page
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
        return '$'; // Default to USD if currency is not found
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-transparent dark:bg-[#706C61] bg-[#FFFFFF]">
        <thead className="dark:bg-[#333333] bg-[#E1F4F3]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Company Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Market Cap</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Open</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Current Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">Change %</th>
          </tr>
        </thead>
        <tbody className="dark:bg-[#706C61] bg-[#FFFFFF]">
          {stocks.map((stock) => (
            <tr 
              key={stock.Symbol} 
              onClick={() => handleRowClick(stock.Symbol)} 
              className="cursor-pointer hover:bg-[#E1F4F3] dark:hover:bg-[#333333] hover:shadow-md dark:hover:shadow-md"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#333333] dark:text-[#FFFFFF]">{stock.CompanyName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.MarketCap.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.Open.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#333333] dark:text-[#FFFFFF]">{getCurrencySymbol(stock.Currency)}{stock.CurrentPrice.toFixed(2)}</td>
              <td 
                className={`px-6 py-4 whitespace-nowrap text-sm ${getColor(stock.PercentageChange)} dark:text-[#FFFFFF]`}
              >
                {stock.PercentageChange.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockDashboard;
