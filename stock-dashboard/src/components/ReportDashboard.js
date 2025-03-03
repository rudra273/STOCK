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
    return value * (conversionRates[currency] || 1);
  };

  // Get top gainers with only positive percentage changes
  const getTopGainers = (stocks) => {
    return stocks
      .filter(stock => stock.PercentageChange > 0)
      .sort((a, b) => b.PercentageChange - a.PercentageChange)
      .slice(0, 5);
  };

  // Get top Losers with only negative percentage changes
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
      <h2 className="text-xl font-bold text-[#111827] dark:text-[#F9FAFB]">Market Reports</h2>
      
      {/* Top Gainers Card */}
      <div className="bg-white dark:bg-[#1F2937] shadow-md rounded-lg p-4 w-full">
        <h3 className="text-lg font-bold mb-3 text-[#111827] dark:text-[#F9FAFB]">Top Gainers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-[#374151]">
                <th className="text-left text-xs font-medium text-[#4B5563] dark:text-[#D1D5DB] py-2">Company</th>
                <th className="text-right text-xs font-medium text-[#4B5563] dark:text-[#D1D5DB] py-2">Change (%)</th>
              </tr>
            </thead>
            <tbody>
              {topGainers.length > 0 ? (
                topGainers.map(stock => (
                  <tr key={stock.Symbol} className="border-b border-[#E5E7EB] dark:border-[#374151] last:border-0">
                    <td className="py-2 text-sm text-[#111827] dark:text-[#F9FAFB]">{stock.CompanyName}</td>
                    <td className="py-2 text-sm text-right text-[#10B981] dark:text-[#34D399] font-medium">
                      +{stock.PercentageChange.toFixed(2)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-4 text-center text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    No gainers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Losers Card */}
      <div className="bg-white dark:bg-[#1F2937] shadow-md rounded-lg p-4 w-full">
        <h3 className="text-lg font-bold mb-3 text-[#111827] dark:text-[#F9FAFB]">Top Losers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-[#374151]">
                <th className="text-left text-xs font-medium text-[#4B5563] dark:text-[#D1D5DB] py-2">Company</th>
                <th className="text-right text-xs font-medium text-[#4B5563] dark:text-[#D1D5DB] py-2">Change (%)</th>
              </tr>
            </thead>
            <tbody>
              {topLosers.length > 0 ? (
                topLosers.map(stock => (
                  <tr key={stock.Symbol} className="border-b border-[#E5E7EB] dark:border-[#374151] last:border-0">
                    <td className="py-2 text-sm text-[#111827] dark:text-[#F9FAFB]">{stock.CompanyName}</td>
                    <td className="py-2 text-sm text-right text-[#EF4444] dark:text-[#F87171] font-medium">
                      {stock.PercentageChange.toFixed(2)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-4 text-center text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    No losers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Highest Market Capitalization Card */}
      <div className="bg-white dark:bg-[#1F2937] shadow-md rounded-lg p-4 w-full">
        <h3 className="text-lg font-bold mb-3 text-[#111827] dark:text-[#F9FAFB]">Highest Market Cap</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-[#374151]">
                <th className="text-left text-xs font-medium text-[#4B5563] dark:text-[#D1D5DB] py-2">Company</th>
                <th className="text-right text-xs font-medium text-[#4B5563] dark:text-[#D1D5DB] py-2">Market Cap (USD)</th>
              </tr>
            </thead>
            <tbody>
              {highestMarketCap.length > 0 ? (
                highestMarketCap.map(stock => (
                  <tr key={stock.Symbol} className="border-b border-[#E5E7EB] dark:border-[#374151] last:border-0">
                    <td className="py-2 text-sm text-[#111827] dark:text-[#F9FAFB]">{stock.CompanyName}</td>
                    <td className="py-2 text-sm text-right text-[#111827] dark:text-[#F9FAFB]">${stock.MarketCapInUSD.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-4 text-center text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    No market cap data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;