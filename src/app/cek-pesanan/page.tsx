"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function CekPesanan() {
  interface Order {
    id: number;
    customerName: string;
    product: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [username, setUsernmae] = useState('');

  useEffect(() => {
    setUsernmae(Cookies.get('username') as string);

    console.log(username);
    fetch('/api/orders') // Adjust the API endpoint as necessary
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

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
                <th className="py-3 px-5 border-b text-center">ID</th>
                <th className="py-3 px-5 border-b text-center">Customer Name</th>
                <th className="py-3 px-5 border-b text-center">Product</th>
                <th className="py-3 px-5 border-b text-center">Amount</th>
                <th className="py-3 px-5 border-b text-center">Created At</th>
                <th className="py-3 px-5 border-b text-center">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="py-3 px-5 border-b text-center">{order.id}</td>
                  <td className="py-3 px-5 border-b text-center">{order.customerName}</td>
                  <td className="py-3 px-5 border-b text-center">{order.product}</td>
                  <td className="py-3 px-5 border-b text-center">{order.amount}</td>
                  <td className="py-3 px-5 border-b text-center">{order.createdAt}</td>
                  <td className="py-3 px-5 border-b text-center">{order.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}