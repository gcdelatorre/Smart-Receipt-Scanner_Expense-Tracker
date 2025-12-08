import React, { useState } from 'react';
import {
  LayoutDashboard,
  CreditCard,
  PieChart,
  Wallet,
  Settings,
  Search,
  Bell,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import NavItem from './components/NavItem';
import StatCard from './components/StatCard';
import BudgetProgress from './components/BudgetProgress';

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      <Sidebar />

      {/* Main Content Wrapper */}
      <main className="md:ml-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">

        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                className="bg-gray-100 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
                placeholder="Search..."
              />
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm transition-colors">
              <Plus size={16} className="mr-1.5" />
              Add New
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Balance"
              amount="$12,450.00"
              trend="+2.5%"
              trendUp={true}
              color="indigo"
              icon={<Wallet size={24} />}
            />
            <StatCard
              title="Monthly Income"
              amount="$4,200.00"
              trend="+4.2%"
              trendUp={true}
              color="green"
              icon={<TrendingUp size={24} />}
            />
            <StatCard
              title="Monthly Expenses"
              amount="$1,250.00"
              trend="-1.2%"
              trendUp={false}
              color="red"
              icon={<TrendingDown size={24} />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Chart Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Spending Analytics</h3>
                <select className="text-sm border-gray-200 rounded-lg text-gray-500 focus:ring-indigo-500 bg-transparent">
                  <option>This Month</option>
                </select>
              </div>

              {/* Simulated Chart Container */}
              <div className="relative h-64 w-full flex items-end space-x-2">
                {/* Just a visual CSS bar chart simulation for demo purposes */}
                {[40, 65, 45, 80, 55, 90, 60].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group">
                    <div
                      className="bg-indigo-100 group-hover:bg-indigo-200 rounded-t-sm transition-all relative"
                      style={{ height: `${h}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                        ${h * 10}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            {/* Budgets */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Budgets</h3>
              </div>
              <div className="space-y-6">
                <BudgetProgress category="Groceries" current={350} total={500} color="indigo" />
                <BudgetProgress category="Entertainment" current={190} total={200} color="yellow" />
                <BudgetProgress category="Transport" current={50} total={150} color="green" />
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-3 font-semibold">Transaction</th>
                    <th className="px-6 py-3 font-semibold">Category</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  <tr className="hover:bg-gray-50 border-b border-gray-50">
                    <td className="px-6 py-4 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-3">
                        <PieChart size={16} />
                      </div>
                      <span className="font-medium text-gray-900">Spotify Premium</span>
                    </td>
                    <td className="px-6 py-4">Subscription</td>
                    <td className="px-6 py-4 text-gray-500">Dec 12</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">-$12.99</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3">
                        <Wallet size={16} />
                      </div>
                      <span className="font-medium text-gray-900">Upwork</span>
                    </td>
                    <td className="px-6 py-4">Income</td>
                    <td className="px-6 py-4 text-gray-500">Dec 10</td>
                    <td className="px-6 py-4 text-right font-medium text-green-600">+$1,250.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}