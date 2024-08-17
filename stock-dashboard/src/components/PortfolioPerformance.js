// "use client";

// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const PortfolioPerformance = ({ data }) => {
//   const [filters, setFilters] = useState({
//     daily: true,
//     weekly: true,
//     monthly: true,
//     yearly: true,
//   });

//   // Transform the data for Recharts
//   const transformedData = data.map(item => ({
//     company_name: item.company_name,
//     today_percent_change: item.today_percent_change || 0,
//     weekly_percent_change: item.weekly_percent_change || 0,
//     monthly_percent_change: item.monthly_percent_change || 0,
//     yearly_percent_change: item.yearly_percent_change || 0
//   }));

//   const handleFilterClick = (period) => {
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [period]: !prevFilters[period],
//     }));
//   };

//   return (
//     <div className="w-full h-screen flex flex-col">
//       <div className="flex-1">
//         <div className="flex justify-center mb-4 space-x-1">
//           <button
//             onClick={() => handleFilterClick('daily')}
//             className={`px-2 py-1 text-xs rounded ${filters.daily ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
//           >
//             Daily
//           </button>
//           <button
//             onClick={() => handleFilterClick('weekly')}
//             className={`px-2 py-1 text-xs rounded ${filters.weekly ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
//           >
//             Weekly
//           </button>
//           <button
//             onClick={() => handleFilterClick('monthly')}
//             className={`px-2 py-1 text-xs rounded ${filters.monthly ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => handleFilterClick('yearly')}
//             className={`px-2 py-1 text-xs rounded ${filters.yearly ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
//           >
//             Yearly
//           </button>
//         </div>

//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={transformedData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="company_name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {filters.daily && <Bar dataKey="today_percent_change" fill="#8884d8" />}
//             {filters.weekly && <Bar dataKey="weekly_percent_change" fill="#82ca9d" />}
//             {filters.monthly && <Bar dataKey="monthly_percent_change" fill="#ffc658" />}
//             {filters.yearly && <Bar dataKey="yearly_percent_change" fill="#ff7300" />}
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default PortfolioPerformance;

"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PortfolioPerformance = ({ data }) => {
  const [filters, setFilters] = useState({
    daily: true,
    weekly: true,
    monthly: true,
    yearly: true,
  });

  // Transform the data for Recharts
  const transformedData = data.map(item => ({
    company_name: item.company_name,
    today_percent_change: item.today_percent_change || 0,
    weekly_percent_change: item.weekly_percent_change || 0,
    monthly_percent_change: item.monthly_percent_change || 0,
    yearly_percent_change: item.yearly_percent_change || 0
  }));

  const handleFilterClick = (period) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [period]: !prevFilters[period],
    }));
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1">
        <div className="flex justify-center mt-4 mb-4 space-x-1">
          <button
            onClick={() => handleFilterClick('daily')}
            className={`px-2 py-1 text-xs rounded ${filters.daily ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Daily
          </button>
          <button
            onClick={() => handleFilterClick('weekly')}
            className={`px-2 py-1 text-xs rounded ${filters.weekly ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => handleFilterClick('monthly')}
            className={`px-2 py-1 text-xs rounded ${filters.monthly ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleFilterClick('yearly')}
            className={`px-2 py-1 text-xs rounded ${filters.yearly ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Yearly
          </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="company_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {filters.daily && <Bar dataKey="today_percent_change" fill="#8884d8" />}
            {filters.weekly && <Bar dataKey="weekly_percent_change" fill="#82ca9d" />}
            {filters.monthly && <Bar dataKey="monthly_percent_change" fill="#ffc658" />}
            {filters.yearly && <Bar dataKey="yearly_percent_change" fill="#ff7300" />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioPerformance;
