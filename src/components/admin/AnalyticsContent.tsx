import React, { useEffect, useState } from 'react';

interface AnalyticsData {
  id: string;
  order_id: string;
  order_date: string;
  username: string;
  value: number;
}

const AnalyticsContent = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/transaction/read_all');
        const data = await response.json();
        if (data.status) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newAnalyticsData: AnalyticsData[] = data.data.map((item: any) => ({
            id: String(item._id),
            order_id: String(item.order_id),
            order_date: String(item.transaction_date),
            username: String(item.customer_details.first_name),
            value: Number(item.gross_amount),
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
  }, []);

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
      <h1 className='font-extrabold text-center mb-5' style={{fontSize: '20px'}}>Data Transaksi</h1>
      <div>
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Tanggal Order</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={data.id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{data.order_id}</td>
                  <td className="py-2 px-4 border-b">{data.order_date}</td>
                  <td className="py-2 px-4 border-b">{data.username}</td>
                  <td className="py-2 px-4 border-b">{formatCurrency(Number(data.value))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AnalyticsContent;
