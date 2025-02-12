"use client";

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaSignOutAlt, FaChartBar, FaNewspaper, FaWrench, FaBullhorn } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import OverviewContent from '@/components/admin/OverviewContent';
import DashboardContent from '@/components/admin/DashboardContent';
import TransaksiContent from '@/components/admin/TransaksiContent';
import UsersContent from '@/components/admin/UsersContent';
import AntrianContent from '@/components/admin/AntrianContent';
import SessionContent from '@/components/admin/SessionContent';
import KelolaBeritaContent from '@/components/admin/KelolaBeritaContent';
import KelolaPengumumanContent from '@/components/admin/KelolaPengumumanContent';
import KelolaFiturContent from '@/components/admin/KelolaFiturContent';
import KelolaPaketContent from '@/components/admin/KelolaPaketContent';
import KelolaPromoContent from '@/components/admin/KelolaPromoContent';

const AdminPage = () => {
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [isLogin, setIsLogin] = useState(false);

  const renderContent = () => {
    switch (selectedNav) {
      case 'dashboard':
        return <DashboardContent />;
      case 'analytics':
        return <TransaksiContent />;
      case 'users':
        return <UsersContent />;
      case 'antrian':
        return <AntrianContent />;
      case 'session':
        return <SessionContent />;
      case 'kelolaBerita':
        return <KelolaBeritaContent />;
      case 'kelolaFitur':
        return <KelolaFiturContent />;
      case 'kelolaPengumuman':
        return <KelolaPengumumanContent />;
      case 'kelolaPaket':
        return <KelolaPaketContent />;
      case 'kelolaPromo':
        return <KelolaPromoContent />;
      default:
        return <OverviewContent />;
    }
  };

  useEffect(() => {
    const username = Cookies.get('username');
    setIsLogin(true);
    if (username === 'admin') {
      // setIsLogin(true);
    }
  }, []);

  return (
    <>
      {!isLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Mohon Login Terlebih Dahulu</p>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row min-h-screen">
        <nav className="w-full md:w-64 bg-gray-800 text-white md:h-screen p-4 fixed md:relative z-50 overflow-x-auto">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/img/assets/icon.png"
              width={50}
              height={50}
              alt="Logo"
              className="md:w-[100px] md:h-[100px]"
            />
          </div>
          <ul className="flex md:block space-x-4 md:space-x-0 md:space-y-4 flex-row md:flex-col justify-start md:justify-start items-center md:items-stretch min-w-max">
            <li className="w-full">
              <a href="#dashboard" 
                onClick={() => setSelectedNav('dashboard')} 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'dashboard' ? 'bg-[#794422]' : ''}`}>
                <FaTachometerAlt className="mr-2" />
                <span className="md:inline">Paket</span>
              </a>
            </li>
            <li className="w-full">
              <a href="#analytics" 
                onClick={() => setSelectedNav('analytics')} 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'analytics' ? 'bg-[#794422]' : ''}`}>
                <FaChartBar className="mr-2" />
                <span className=" md:inline">Transaksi</span>
              </a>
            </li>
            <li className="w-full">
              <a href="#users" 
                onClick={() => setSelectedNav('users')} 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'users' ? 'bg-[#794422]' : ''}`}>
                <FaUsers className="mr-2" />
                <span className=" md:inline">Pengguna</span>
              </a>
            </li>
            <li className="w-full">
              <a href="#antrian" 
                onClick={() => setSelectedNav('antrian')} 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'antrian' ? 'bg-[#794422]' : ''}`}>
                <MdPeople className="mr-2" />
                <span className=" md:inline">Pesanan Masuk</span>
              </a>
            </li>
            {/* <li className="w-full">
              <a href="#session" 
                onClick={() => setSelectedNav('session')} 
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'session' ? 'bg-[#794422]' : ''}`}>
                <FaClock className="mr-2" />
                <span className=" md:inline">Kelola Jadwal</span>
              </a>
            </li> */}
            <li className="w-full">
              <a
                href="#kelolaBerita"
                onClick={() => setSelectedNav('kelolaBerita')}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'kelolaBerita' ? 'bg-[#794422]' : ''}`}
              >
                <FaNewspaper className="mr-2" />
                <span className="md:inline">Kelola Berita</span>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#kelolaFitur"
                onClick={() => setSelectedNav('kelolaFitur')}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'kelolaFitur' ? 'bg-[#794422]' : ''}`}
              >
                <FaWrench className="mr-2" />
                <span className="md:inline">Kelola Fitur</span>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#kelolaPengumuman"
                onClick={() => setSelectedNav('kelolaPengumuman')}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'kelolaPengumuman' ? 'bg-[#794422]' : ''}`}
              >
                <FaBullhorn className="mr-2" />
                <span className="md:inline">Kelola Pengumuman</span>
              </a>
            </li>
            <li className="w-full">
              <a href="#kelolaPaket" onClick={() => setSelectedNav('kelolaPaket')}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'kelolaPaket' ? 'bg-[#794422]' : ''}`}>
                <FaTachometerAlt className="mr-2" />
                <span className="md:inline">Dashboard Paket</span>
              </a>
            </li>
            <li className="w-full">
              <a href="#kelolaPromo" onClick={() => setSelectedNav('kelolaPromo')}
                className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${selectedNav === 'kelolaPromo' ? 'bg-[#794422]' : ''}`}>
                <FaChartBar className="mr-2" />
                <span className="md:inline">Kelola Promo</span>
              </a>
            </li>
            <li className="w-full">
              <button onClick={handleLogout} 
                      className="flex items-center w-full py-2 px-4 rounded bg-red-600 hover:bg-red-700">
                <FaSignOutAlt className="mr-2" />
                <span className=" md:inline">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="flex-1 p-8 mt-[130px] md:mt-0">
          {renderContent()}
        </div>
      </div>
    </>
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

export default AdminPage;
