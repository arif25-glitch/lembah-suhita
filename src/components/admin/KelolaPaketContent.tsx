/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import EditPaketModal from './EditPaketModal';

interface Paket {
  id: string;
  nama: string;
  deskripsi: string;
  harga: string;
}

const KelolaPaketContent: React.FC = () => {
  const [data, setData] = useState<Paket[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/dashboard_paket/read_all');
        const resData = await response.json();
        if (resData.status) {
          const newPaket: Paket[] = resData.data.map((item: any) => ({
            id: String(item._id),
            nama: String(item.nama),
            deskripsi: String(item.deskripsi),
            harga: String(item.harga)
          }));
          setData(newPaket);
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

  const handleEdit = (paket: Paket) => {
    setSelectedPaket(paket);
    setIsEditOpen(true);
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
      <div>
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Nama Paket</th>
                <th className="py-2 px-4 border-b">Deskripsi</th>
                <th className="py-2 px-4 border-b">Harga</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((paket, index) => (
                  <tr key={paket.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{paket.nama}</td>
                    <td className="py-2 px-4 border-b">{paket.deskripsi.substring(0, 50)}...</td>
                    <td className="py-2 px-4 border-b">{paket.harga}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(paket)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border-b text-center" colSpan={5}>
                    Tidak ada paket saat ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <EditPaketModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          paket={selectedPaket}
        />
      </div>
    </>
  );
};

export default KelolaPaketContent;
