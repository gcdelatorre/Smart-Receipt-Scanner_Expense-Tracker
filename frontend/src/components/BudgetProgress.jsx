import React from 'react';

const BudgetProgress = ({ category, current, total, color }) => {
  const percentage = Math.min((current / total) * 100, 100);
  const colorClasses = {
    indigo: 'bg-indigo-500',
    yellow: 'bg-yellow-400',
    green: 'bg-green-500',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{category}</span>
        <span className="text-gray-500">${current} / ${total}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetProgress;
