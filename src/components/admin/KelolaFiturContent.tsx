/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import EditFiturModal from './EditFiturModal';

interface Fitur {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Added imageUrl property
}

const KelolaFiturContent: React.FC = () => {
  const [data, setData] = useState<Fitur[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFitur, setSelectedFitur] = useState<Fitur | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // New state

  const handleEdit = (fitur: Fitur) => {
    setSelectedFitur(fitur);
    setIsEditOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/fitur/read_all');
        const resData = await response.json();
        if (resData.status) {
          const newFitur: Fitur[] = resData.data.map((item: any) => ({
            id: String(item._id),
            title: String(item.title),
            description: String(item.description),
            imageUrl: String(item.imageUrl) // Added mapping for imageUrl
          }));
          setData(newFitur);
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
                <th className="py-2 px-4 border-b">Judul</th>
                <th className="py-2 px-4 border-b">Deskripsi</th>
                <th className="py-2 px-4 border-b">Gambar</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((fitur, index) => (
                  <tr key={fitur.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{fitur.title}</td>
                    <td className="py-2 px-4 border-b">{fitur.description.substring(0, 50)}...</td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={fitur.imageUrl}
                        alt={fitur.title}
                        className="w-12 h-12 object-cover mx-auto cursor-pointer" 
                        onClick={() => setPreviewImage(fitur.imageUrl)} />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(fitur)}
                        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border-b text-center" colSpan={5}>Tidak ada fitur saat ini</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <EditFiturModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} fitur={selectedFitur} />
      </div>

      {/* Full screen image preview overlay */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative">
            <img src={previewImage} alt="Preview" className="max-w-full max-h-screen" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 text-white bg-red-500 rounded px-2 py-1"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default KelolaFiturContent;
