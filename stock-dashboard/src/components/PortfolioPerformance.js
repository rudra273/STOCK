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

  // Define custom colors for each period using the new palette
  const periodColors = {
    daily: {
      bg: "var(--color-primary)",
      darkBg: "var(--color-primary-dark)",
      dataKey: "daily_percent_change"
    },
    weekly: {
      bg: "var(--color-secondary)",
      darkBg: "var(--color-secondary-dark)",
      dataKey: "weekly_percent_change"
    },
    monthly: {
      bg: "var(--color-accent)",
      darkBg: "var(--color-accent-dark)",
      dataKey: "monthly_percent_change"
    },
    yearly: {
      bg: "var(--color-success)",
      darkBg: "var(--color-success-dark)",
      dataKey: "yearly_percent_change"
    }
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
        fill="var(--color-text-primary)" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
      >
        {`${name.length > 15 ? name.slice(0, 15) + '...' : name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark p-6 rounded-lg">
      <div className="flex-1">
        {/* Filter Buttons */}
        <div className="flex justify-center mt-4 mb-8 space-x-2">
          <button
            onClick={() => handleFilterClick("daily")}
            className={`px-3 py-1 text-sm font-medium rounded transition duration-300 ${
              filters.daily
                ? "bg-primary dark:bg-primary-dark text-white hover:opacity-90"
                : "bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-text-secondary-dark hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            style={{
              backgroundColor: filters.daily ? periodColors.daily.bg : undefined,
            }}
          >
            Daily
          </button>
          <button
            onClick={() => handleFilterClick("weekly")}
            className={`px-3 py-1 text-sm font-medium rounded transition duration-300 ${
              filters.weekly
                ? "text-white hover:opacity-90"
                : "bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-text-secondary-dark hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            style={{
              backgroundColor: filters.weekly ? periodColors.weekly.bg : undefined,
            }}
          >
            Weekly
          </button>
          <button
            onClick={() => handleFilterClick("monthly")}
            className={`px-3 py-1 text-sm font-medium rounded transition duration-300 ${
              filters.monthly
                ? "text-white hover:opacity-90"
                : "bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-text-secondary-dark hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            style={{
              backgroundColor: filters.monthly ? periodColors.monthly.bg : undefined,
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => handleFilterClick("yearly")}
            className={`px-3 py-1 text-sm font-medium rounded transition duration-300 ${
              filters.yearly
                ? "text-white hover:opacity-90"
                : "bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-text-secondary-dark hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            style={{
              backgroundColor: filters.yearly ? periodColors.yearly.bg : undefined,
            }}
          >
            Yearly
          </button>
        </div>

        {/* Bar Chart */}
        <div className="mb-8 p-4 bg-surface dark:bg-surface-dark rounded-lg shadow-md">
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                opacity={0.5}
              />
              <XAxis
                dataKey="company_name"
                tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                tickFormatter={(value) => value.length > 20 ? `${value.slice(0, 20)}...` : value}
                interval={0}
              />
              <YAxis
                tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                domain={["dataMin - 5", "dataMax + 5"]}
                tickFormatter={(value) => `${Math.round(value)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "5px",
                }}
                itemStyle={{ color: "var(--color-text-primary)" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                iconSize={16}
                formatter={(value) => (
                  <span style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>{value}</span>
                )}
              />
              {filters.daily && (
                <Bar
                  dataKey={periodColors.daily.dataKey}
                  fill={periodColors.daily.bg}
                  radius={[10, 10, 0, 0]}
                />
              )}
              {filters.weekly && (
                <Bar
                  dataKey={periodColors.weekly.dataKey}
                  fill={periodColors.weekly.bg}
                  radius={[10, 10, 0, 0]}
                />
              )}
              {filters.monthly && (
                <Bar
                  dataKey={periodColors.monthly.dataKey}
                  fill={periodColors.monthly.bg}
                  radius={[10, 10, 0, 0]}
                />
              )}
              {filters.yearly && (
                <Bar
                  dataKey={periodColors.yearly.dataKey}
                  fill={periodColors.yearly.bg}
                  radius={[10, 10, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Charts Section */}
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-24 mt-8 mb-16">
          {/* Monthly Donut Chart */}
          {filters.monthly && topMonthlyCompanies.length > 0 && (
            <div className="flex flex-col items-center w-full max-w-md p-4 bg-surface dark:bg-surface-dark rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
                Top 4 Monthly Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
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
                    {topMonthlyCompanies.map((entry, index) => {
                      const colorKeys = ["primary", "secondary", "accent", "success"];
                      return (
                        <Cell 
                          key={`cell-monthly-${index}`} 
                          fill={`var(--color-${colorKeys[index % colorKeys.length]})`} 
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "5px",
                    }}
                    itemStyle={{ color: "var(--color-text-primary)" }}
                    formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Yearly Donut Chart */}
          {filters.yearly && topYearlyCompanies.length > 0 && (
            <div className="flex flex-col items-center w-full max-w-md p-4 bg-surface dark:bg-surface-dark rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
                Top 4 Yearly Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
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
                    {topYearlyCompanies.map((entry, index) => {
                      const colorKeys = ["primary", "secondary", "accent", "success"];
                      return (
                        <Cell 
                          key={`cell-yearly-${index}`} 
                          fill={`var(--color-${colorKeys[index % colorKeys.length]})`} 
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "5px",
                    }}
                    itemStyle={{ color: "var(--color-text-primary)" }}
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