/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

interface AnalyticsData {
  id: string;
  sesi: string;
  orderId: string;
  order_date: string;
  username: string;
  value: number;
  status: string;
  uniqueId: string;
  totalPurchased: string;
}

const KelolaDataPenjualan = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/transaction/data_penjualan_read_all');
        const result = await response.json();
        if (result.status) {
          const newAnalyticsData: AnalyticsData[] = result.data.map((item: any, key: number) => ({
            id: key.toString(),
            orderId: String(item._id),
            sesi: String(item.servedData),
            order_date: String(item.transaction_date),
            username: String(item.username),
            value: Number(item.totalPrice),
            status: String(item.status),
            uniqueId: String(item.uniqueId),
            totalPurchased: String(item.totalPurchased),
          }));
          setData(newAnalyticsData);
          setIsFetched(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isFetched]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <h1 className="font-extrabold text-center mb-5" style={{ fontSize: '20px' }}>Data Penjualan</h1>
      <div>
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Order Id</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Tanggal Order</th>
                <th className="py-2 px-4 border-b">Total Tiket</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Total Harga</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(item => item.status === 'accept')
                .map((item, index) => (
                  <tr key={item.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{item.uniqueId}</td>
                    <td className="py-2 px-4 border-b">{item.sesi}</td>
                    <td className="py-2 px-4 border-b">{item.order_date}</td>
                    <td className="py-2 px-4 border-b">{item.totalPurchased}</td>
                    <td className="py-2 px-4 border-b">{item.username}</td>
                    <td className="py-2 px-4 border-b">{formatCurrency(item.value)}</td>
                    <td className="py-2 px-4 border-b">{item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default KelolaDataPenjualan;