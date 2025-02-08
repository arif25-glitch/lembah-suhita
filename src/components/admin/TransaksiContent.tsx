import React, { useEffect, useState } from 'react';

interface AnalyticsData {
  id: string;
  sesi: string;
  orderId: string;
  order_date: string;
  username: string;
  value: number;
  status: string;
}

const TransaksiContent = () => {
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
          const newAnalyticsData: AnalyticsData[] = data.data.map((item: any, key: any) => ({
            id: key.toString(),
            orderId: String(item._id),
            sesi: String(item.session),
            order_date: String(item.transaction_date),
            username: String(item.username),
            value: Number(item.totalPrice),
            status: String(item.status),
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

  const handleDelete = async (id: string, orderId: string) => {
    if (!window.confirm("Yakin ingin menghapus transaksi ini?")) return;
    try {
      setIsLoading(true);
      const response = await fetch('/api/transaction/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      const result = await response.json();
      if (result.status) {
        setData(prev => prev.filter(item => item.id !== id));
        setIsLoading(false);
      } else {
        alert("Gagal menghapus transaksi");
      }
    } catch (error) {
      console.error(error);
    }
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
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Order Id</th>
                <th className="py-2 px-4 border-b">Sesi</th>
                <th className="py-2 px-4 border-b">Tanggal Order</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Total Harga</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(item => item.status === 'accept')
                .map((data, index) => (
                  <tr key={data.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{data.orderId}</td>
                    <td className="py-2 px-4 border-b">{data.sesi}</td>
                    <td className="py-2 px-4 border-b">{data.order_date}</td>
                    <td className="py-2 px-4 border-b">{data.username}</td>
                    <td className="py-2 px-4 border-b">{formatCurrency(Number(data.value))}</td>
                    <td className="py-2 px-4 border-b">
                      <button 
                        onClick={() => handleDelete(data.id, data.orderId)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransaksiContent;
