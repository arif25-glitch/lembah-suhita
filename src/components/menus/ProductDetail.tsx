import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';

interface ProductDetailProps {
  product: {
    id: string[];
    name: string;
    volume: string[];
    price: string[];
    priceDiscount: string[];
    imageUrl: string[];
  };
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedVolume, setSelectedVolume] = useState(product.volume[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usernameState, setUsernameState] = useState('');

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      setIsLoggedIn(true);
      setUsernameState(username);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const selectedIndex = product.volume.indexOf(selectedVolume);
  const totalPrice = parseInt(product.price[selectedIndex]) - parseInt(product.priceDiscount[selectedIndex]);

  const formatPrice = (price: string) => {
    return `Rp. ${parseInt(price).toLocaleString('id-ID')}`;
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      // Implement checkout logic here

      fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameState,
          productId: product.id[selectedIndex],
          volume: selectedVolume,
          price: product.price[selectedIndex],
          priceDiscount: product.priceDiscount[selectedIndex],
          quantity: 1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            alert('Checkout Berhasil!');
            window.location.reload();
          } else {
            alert('Checkout Gagal!');
          }
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <button onClick={onBack} className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded mb-4">Back</button>
      <div className="border p-6 rounded-lg shadow-lg bg-white flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <Image 
            src={product.imageUrl[selectedIndex]} 
            alt={product.name} 
            width={500}
            height={500}
            className="object-cover rounded" />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <div className="mb-4">
            <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Volume</label>
            <select
              id="volume"
              value={selectedVolume}
              onChange={(e) => setSelectedVolume(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {product.volume.map((vol, index) => (
                <option key={index} value={vol}>{vol}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="text-lg font-bold">Harga:</p>
            <p className="text-lg font-bold text-green-600">{formatPrice(product.price[selectedIndex])}</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="text-lg font-bold">Diskon:</p>
            <p className="text-lg font-bold text-red-500">{formatPrice(product.priceDiscount[selectedIndex])}</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="text-lg font-bold">Total Harga:</p>
            <p className="text-lg font-bold text-black">{formatPrice(totalPrice.toString())}</p>
          </div>
          <div className="text-right">
            <button onClick={handleCheckout} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4">Checkout</button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Silakan login terlebih dahulu sebelum belanja</h2>
            <button onClick={() => setShowModal(false)} className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
