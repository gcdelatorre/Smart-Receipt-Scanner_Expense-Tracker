import React from 'react';

const NavItem = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`}>
    <span className={`mr-3 ${active ? 'text-indigo-600' : 'group-hover:text-gray-600'}`}>
      {icon}
    </span>
    <span className="font-medium">{label}</span>
  </a>
);

export default NavItem;
