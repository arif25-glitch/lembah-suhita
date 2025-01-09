"use client";

import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaSignOutAlt, FaBars, FaChartBar } from 'react-icons/fa';
import OverviewContent from '@/components/admin/OverviewContent';
import DashboardContent from '@/components/admin/DashboardContent';
import AnalyticsContent from '@/components/admin/AnalyticsContent';
import UsersContent from '@/components/admin/UsersContent';
// ...existing code...

const AdminPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNav, setSelectedNav] = useState('dashboard');

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    switch (selectedNav) {
      case 'dashboard':
        return <DashboardContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'users':
        return <UsersContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="admin-page flex">
      <nav className={`side-nav ${isExpanded ? 'w-64' : 'w-21'} bg-gray-800 text-white h-screen p-4 transition-width duration-300`}>
        <button onClick={toggleNav} className="text-white mb-4 px-4">
          <FaBars />
        </button>
        <ul className="space-y-4">
          <li>
            <a href="#dashboard" onClick={() => setSelectedNav('dashboard')} className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'dashboard' ? 'bg-gray-700' : ''}`}>
              <FaTachometerAlt className="mr-2" />
              {isExpanded && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a href="#analytics" onClick={() => setSelectedNav('analytics')} className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'analytics' ? 'bg-gray-700' : ''}`}>
              <FaChartBar className="mr-2" />
              {isExpanded && <span>Transaksi</span>}
            </a>
          </li>
          <li>
            <a href="#users" onClick={() => setSelectedNav('users')} className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'users' ? 'bg-gray-700' : ''}`}>
              <FaUsers className="mr-2" />
              {isExpanded && <span>Users</span>}
            </a>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center w-full py-2 px-4 rounded bg-red-600 hover:bg-red-700">
              <FaSignOutAlt className="mr-2" />
              {isExpanded && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </nav>
      <div className="main-content flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

const handleLogout = () => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  window.location.href = "/";
};

// ...existing code...

export default AdminPage;
