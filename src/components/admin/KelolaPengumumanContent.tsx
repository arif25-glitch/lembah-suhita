/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import EditPengumumanModal from './EditPengumumanModal';

// Updated interface with only id and text
interface Pengumuman {
  id: string;
  text: string;
}

const KelolaPengumumanContent: React.FC = () => {
  const [data, setData] = useState<Pengumuman[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPengumuman, setSelectedPengumuman] = useState<Pengumuman | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/pengumuman/read_all');
        const resData = await response.json();
        if (resData.status) {
          // Map result to new structure: combine judul, isi (first 50 chars) and tanggal
          const newPengumuman: Pengumuman[] = resData.data.map((item: any) => ({
            id: String(item._id),
            text: item.text,
          }));
          setData(newPengumuman);
          setIsFetched(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isFetched]);

  const handleEdit = (pengumuman: Pengumuman) => {
    setSelectedPengumuman(pengumuman);
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
        {/* Removed Tambah button */}
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Text</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((pengumuman, index) => (
                  <tr key={pengumuman.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{pengumuman.text}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(pengumuman)}
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
                    Tidak ada pengumuman saat ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Only the edit modal remains */}
        <EditPengumumanModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          pengumuman={selectedPengumuman}
        />
      </div>
    </>
  );
};

export default KelolaPengumumanContent;
