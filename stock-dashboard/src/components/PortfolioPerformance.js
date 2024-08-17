"use client";

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const PortfolioPerformance = ({ data }) => {
  const [filters, setFilters] = useState({
    daily: true,
    weekly: true,
    monthly: true,
    yearly: true,
  });

  const handleFilterClick = (period) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [period]: !prevFilters[period],
    }));
  };

  // Define custom colors for each period
  const colors = {
    daily_percent_change: "#CDFAD5", // Day - Light Green
    weekly_percent_change: "#577B8D", // Week - Light Blue
    monthly_percent_change: "#FFCF96", // Month - Light Orange
    yearly_percent_change: "#FF8080", // Year - Light Red
  };

  // Helper function to get top N companies by a specific key
  const getTopCompanies = (key, limit = 4) => {
    return data
      .slice()
      .sort((a, b) => b[key] - a[key])
      .slice(0, limit);
  };

  // Data for the monthly and yearly top companies
  const topMonthlyCompanies = getTopCompanies('monthly_percent_change');
  const topYearlyCompanies = getTopCompanies('yearly_percent_change');

  // Colors for the pie charts
  const pieColors = ["#FFCF96", "#FF8080", "#CDFAD5", "#577B8D"];

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#4A5568" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
      >
        {`${name.length > 15 ? name.slice(0, 15) + '...' : name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white text-gray-900 p-6">
      <div className="flex-1">
        {/* Filter Buttons */}
        <div className="flex justify-center mt-4 mb-8 space-x-2">
          <button
            onClick={() => handleFilterClick("daily")}
            className={`px-3 py-1 text-sm font-medium rounded transition duration-300 ${
              filters.daily
                ? "bg-[#CDFAD5] text-gray-700 hover:[#E2F4C5]"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => handleFilterClick("weekly")}
            className={`px-3 py-1 text-sm font-medium rounded transition duration-300 ${
              filters.weekly
                ? "bg-[#577B8D] text-[#1E0342] hover:[#1E0342]"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => handleFilterClick("monthly")}
            className={`px-3 py-1 text-sm font-medium rounded transition duration-300 ${
              filters.monthly
                ? "bg-[#FFCF96] text-orange-800 hover:bg-orange-300"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleFilterClick("yearly")}
            className={`px-3 py-1 text-sm font-medium rounded transition duration-300 ${
              filters.yearly
                ? "bg-[#FF8080] text-red-800 hover:bg-red-300"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Bar Chart */}
        <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
                opacity={0.5}
              />
              <XAxis
                dataKey="company_name"
                tick={{ fill: "#4A5568", fontSize: 12 }}
                tickFormatter={(value) => value.length > 20 ? `${value.slice(0, 20)}...` : value}
                interval={0}
              />
              <YAxis
                tick={{ fill: "#4A5568", fontSize: 12 }}
                domain={["dataMin - 5", "dataMax + 5"]}
                tickFormatter={(value) => `${Math.round(value)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F7FAFC",
                  border: "none",
                  borderRadius: "5px",
                }}
                itemStyle={{ color: "#2D3748" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                iconSize={16}
                formatter={(value) => (
                  <span style={{ color: "#4A5568", fontSize: 14 }}>{value}</span>
                )}
              />
              {filters.daily && (
                <Bar
                  dataKey="daily_percent_change"
                  fill={colors.daily_percent_change}
                  radius={[10, 10, 0, 0]}
                />
              )}
              {filters.weekly && (
                <Bar
                  dataKey="weekly_percent_change"
                  fill={colors.weekly_percent_change}
                  radius={[10, 10, 0, 0]}
                />
              )}
              {filters.monthly && (
                <Bar
                  dataKey="monthly_percent_change"
                  fill={colors.monthly_percent_change}
                  radius={[10, 10, 0, 0]}
                />
              )}
              {filters.yearly && (
                <Bar
                  dataKey="yearly_percent_change"
                  fill={colors.yearly_percent_change}
                  radius={[10, 10, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Charts Section */}
        <div className="flex flex-row justify-center gap-24 mt-8 mb-16">
          {/* Monthly Donut Chart */}
          {filters.monthly && topMonthlyCompanies.length > 0 && (
            <div className="flex flex-col items-center w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 4 Monthly Performance</h3>
              <ResponsiveContainer width="110%" height={300}>
                <PieChart>
                  <Pie
                    data={topMonthlyCompanies}
                    dataKey="monthly_percent_change"
                    nameKey="company_name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {topMonthlyCompanies.map((entry, index) => (
                      <Cell key={`cell-monthly-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F7FAFC",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    itemStyle={{ color: "#2D3748" }}
                    formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Yearly Donut Chart */}
          {filters.yearly && topYearlyCompanies.length > 0 && (
            <div className="flex flex-col items-center w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 4 Yearly Performance</h3>
              <ResponsiveContainer width="110%" height={300}>
                <PieChart>
                  <Pie
                    data={topYearlyCompanies}
                    dataKey="yearly_percent_change"
                    nameKey="company_name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {topYearlyCompanies.map((entry, index) => (
                      <Cell key={`cell-yearly-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F7FAFC",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    itemStyle={{ color: "#2D3748" }}
                    formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPerformance;

