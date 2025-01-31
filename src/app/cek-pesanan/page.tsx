"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function CekPesanan() {
  interface Order {
    username: string;
    session: string;
    totalPurchased: number;
    totalPrice: string;
    status: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [, setUsername] = useState('');
  const [isNoDataModalOpen, setIsNoDataModalOpen] = useState(false);

  useEffect(() => {
    setUsername(Cookies.get('username') as string);

    const fetchData = async () => {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: Cookies.get('username'),
        }),
      });
      const data = await response.json();

      if (data.status) {
        const dataOrders = data.data;
        setOrders(dataOrders);
      } else {
        setIsNoDataModalOpen(true);
      }
    }

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-500 text-white';
      case 'accept':
        return 'bg-green-500 text-white';
      case 'reject':
        return 'bg-red-500 text-white';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="p-4">
        <button
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
          onClick={() => window.location.href = '/'}
        >
          Back
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#794422] text-white">
              <tr>
                <th className="py-3 px-5 border-b text-center">No</th>
                <th className="py-3 px-5 border-b text-center">Nama</th>
                <th className="py-3 px-5 border-b text-center">Sesi</th>
                <th className="py-3 px-5 border-b text-center">Total Pemesanan</th>
                <th className="py-3 px-5 border-b text-center">Total Harga</th>
                <th className="py-3 px-5 border-b text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => (
                <tr key={key} className="hover:bg-gray-100">
                  <td className="py-3 px-5 border-b text-center">{key}</td>
                  <td className="py-3 px-5 border-b text-center">{order.username}</td>
                  <td className="py-3 px-5 border-b text-center">{order.session}</td>
                  <td className="py-3 px-5 border-b text-center">{order.totalPurchased}</td>
                  <td className="py-3 px-5 border-b text-center">{order.totalPrice}</td>
                  <td className={`py-3 px-5 border-b text-center ${getStatusColor(order.status)}`}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isNoDataModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-xl mb-4">Tidak ada Pesananmu saat ini</h2>
            <button
              onClick={() => setIsNoDataModalOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}