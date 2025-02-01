"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Home from './menus/Home';
import Products from './menus/Products';
// import About from './menus/About';
// import Contact from './menus/Contact';
import Login from './menus/Login';
import MyCart from './menus/MyCart';
import ProductDetail from './menus/ProductDetail';

import Cookies from 'js-cookie';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Home');
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProduct] = useState<{ id: string; nama: string; deskripsi: string; harga: string; } | null>(null);

  useEffect(() => {
    if (Cookies.get('username')) {
      setIsLogin(true);
      setUsername(Cookies.get('username') as string);

      fetch('/api/cart/count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: Cookies.get('username') as string }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setCartItemCount(data.count)
          } else {
            console.log("Something error with the code");
          }
        })
    } else {
      setIsLogin(false);
      setUsername('');
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setIsOpen(false); // Close the menu when an item is clicked
  };

  const handleLogout = () => {
    Cookies.remove('username');
    window.location.reload();
  };

  const navItems = ['Beranda', 'Tentang Kami', 'Berita', 'Paket Lembah Suhita', 'Pengumuman', 'Pilih Paket'];

  const renderContent = () => {
    switch (activeMenu) {
      case 'Home':
        return <Home setActiveMenu='Home' otherMenu={setActiveMenu}/>;
      case 'Tentang Kami':
        return <Home setActiveMenu='Tentang Kami' otherMenu={setActiveMenu}/>;
      case 'Berita':
        return <Home setActiveMenu='Berita' otherMenu={setActiveMenu}/>;
      case 'Paket Lembah Suhita':
        return <Home setActiveMenu='Paket Lembah Suhita' otherMenu={setActiveMenu}/>;
      case 'Pengumuman':
        return <Home setActiveMenu='Pengumuman' otherMenu={setActiveMenu}/>;
      case 'Login':
        return <Login />;
      case 'Pilih Paket':
        return <Products />;
      case 'ProductDetail':
        return selectedProduct ? <ProductDetail product={selectedProduct} onBack={() => handleMenuClick('Products')} /> : <Products />;
      case 'Cart':
        return <MyCart />;
      default:
        return <Home setActiveMenu='Home' otherMenu={setActiveMenu}/>;
    }
  };

  // const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-10x1 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Image
                className="h-8 w-8"
                src="/img/assets/icon.png"
                width={50}
                height={50}
                alt="Logo" />
              <a href="#" className="ml-2 text-2xl font-extrabold text-[#794422]">LEMBAH SUHITA</a>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => handleMenuClick(item)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium relative
                    ${activeMenu === item ? 'text-[#794422] font-bold' : 'text-[#794422]'}
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                    after:bg-[#794422] after:transition-all after:duration-300
                    hover:after:w-full`}
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="hidden sm:flex sm:items-center space-x-4">
              <button
                onClick={() => handleMenuClick('Cart')}
                className="relative bg-gray-100 text-[#794422] px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-gray-200"
              >
                <Image
                  className="h-5 w-5 mr-2"
                  src="/img/icons/shopping-cart.png"
                  width={20}
                  height={20}
                  alt="Cart"
                />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
              {
                !isLogin ? (
                  <button
                    onClick={() => handleMenuClick('Login')}
                    className="bg-[#794422] text-white w-32 px-3 py-2 rounded-md text-base font-medium hover:bg-[#8b5d3b]"
                  >
                    Sign In / Up
                  </button>
                ) :
                  (
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="bg-[#794422] text-white w-32 px-3 py-2 rounded-md text-base font-medium hover:bg-[#8b5d3b]"
                      >
                        {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-10">
                          <a
                            href="#"
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-white bg-[#794422] hover:bg-[#8b5d3b]"
                          >
                            Logout
                          </a>
                        </div>
                      )}
                    </div>
                  )
              }
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button onClick={toggleMenu} className="bg-[#794422] text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => handleMenuClick(item)}
                  className={`block px-3 py-2 rounded-md text-base font-medium 
                    ${activeMenu === item ? 'text-[#794422] font-bold' : 'text-[#794422]'}
                    hover:bg-gray-100`}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => handleMenuClick('Cart')}
                className="relative bg-gray-100 text-[#794422] w-full px-3 py-2 rounded-md text-base font-medium flex items-center justify-center hover:bg-gray-200"
              >
                <Image
                  className="h-5 w-5 mr-2"
                  src="/img/icons/shopping-cart.png"
                  width={20}
                  height={20}
                  alt="Cart"
                />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
              {
                !isLogin ? (
                  <button
                    onClick={() => handleMenuClick('Login')}
                    className="bg-[#794422] text-white w-full px-3 py-2 rounded-md text-base font-medium hover:bg-[#8b5d3b]"
                  >
                    Sign In / Up
                  </button>
                ) :
                  (
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="bg-[#794422] text-white w-full px-3 py-2 rounded-md text-base font-medium hover:bg-[#8b5d3b]"
                      >
                        {username}
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-10">
                          <a
                            href="#"
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-white bg-[#794422] hover:bg-[#8b5d3b]"
                          >
                            Logout
                          </a>
                        </div>
                      )}
                    </div>
                  )
              }
            </div>
          </div>
        )}
      </nav>
      <div>
        {renderContent()}
      </div>
    </>
  );
};

export default Navbar;
