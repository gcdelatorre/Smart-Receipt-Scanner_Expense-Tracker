import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, amount, trend, trendUp, icon, color }) => {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{amount}</h3>
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color] || colorClasses.indigo}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span className={`flex items-center font-medium px-1.5 py-0.5 rounded ${trendUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}>
          {trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          {trend}
        </span>
        <span className="text-gray-400 ml-2">from last month</span>
      </div>
    </div>
  );
};

export default StatCard;
