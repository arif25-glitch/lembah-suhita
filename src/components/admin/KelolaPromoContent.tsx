/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import EditPromoModal from './EditPromoModal';

interface Promo {
  id: string;
  text: string;
}

const KelolaPromoContent: React.FC = () => {
  const [data, setData] = useState<Promo[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<Promo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/promo/read_all');
        const resData = await response.json();
        if (resData.status) {
          const newPromo: Promo[] = resData.data.map((item: any) => ({
            id: String(item._id),
            text: item.text
          }));
          setData(newPromo);
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

  const handleEdit = (promo: Promo) => {
    setSelectedPromo(promo);
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
                <th className="py-2 px-4 border-b">Promo</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((promo, index) => (
                  <tr key={promo.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{promo.text}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border-b text-center" colSpan={3}>
                    Tidak ada promo saat ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <EditPromoModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          promo={selectedPromo}
        />
      </div>
    </>
  );
};

export default KelolaPromoContent;
