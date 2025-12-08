import React from 'react';
import { LayoutDashboard, CreditCard, PieChart, Wallet } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = () => (
  <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between h-screen fixed left-0 top-0">
    <div>
      {/* Logo */}
      <div className="h-16 flex items-center px-8 border-b border-gray-100">
        <div className="bg-indigo-600 p-1.5 rounded-lg mr-3">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">SpendWise</span>
      </div>

      {/* Nav Links */}
      <nav className="mt-6 px-4 space-y-1">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <NavItem icon={<CreditCard size={20} />} label="Transactions" />
        <NavItem icon={<PieChart size={20} />} label="Analytics" />
        <NavItem icon={<Wallet size={20} />} label="Budgets" />
      </nav>
    </div>

    {/* User Profile */}
    <div className="p-4 border-t border-gray-200">
      <a href="#" className="flex items-center w-full hover:bg-gray-50 p-2 rounded-lg transition-colors">
        <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
          AD
        </div>
        <div className="ml-3 truncate">
          <p className="text-sm font-semibold text-gray-900">Alex Doe</p>
          <p className="text-xs text-gray-500 truncate">alex@orbit.com</p>
        </div>
      </a>
    </div>
  </aside>
);

export default Sidebar;
