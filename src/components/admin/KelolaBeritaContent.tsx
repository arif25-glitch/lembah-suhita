import React, { useEffect, useState } from 'react';
import TambahBeritaModal from './TambahBeritaModal';
import EditBeritaModal from './EditBeritaModal';
import HapusBeritaModal from './HapusBeritaModal';

interface Berita {
  id: string;
  title: string;
  content: string;
  date: string;
}

const KelolaBeritaContent: React.FC = () => {
  const [data, setData] = useState<Berita[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHapusOpen, setIsHapusOpen] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);
  const [dataSelectedHapus, setDataSelectedHapus] = useState('');

  const handleEdit = (berita: Berita) => {
    setSelectedBerita(berita);
    setIsEditOpen(true);
  };

  const handleHapus = (berita: Berita) => {
    setSelectedBerita(berita);
    setDataSelectedHapus(berita.id);
    setIsHapusOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/berita/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const result = await response.json();
      if (result.status) {
        setData(prev => prev.filter(item => item.id !== id));
      } else {
        alert('Gagal menghapus berita');
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setIsHapusOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/berita/read_all');
        const resData = await response.json();
        if (resData.status) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newBerita: Berita[] = resData.data.map((item: any) => ({
            id: String(item._id),
            title: String(item.title),
            content: String(item.content),
            date: String(item.date)
          }));
          setData(newBerita);
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
        <button onClick={() => setIsTambahOpen(true)} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Tambah
        </button>
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Judul</th>
                <th className="py-2 px-4 border-b">Konten</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((berita, index) => (
                  <tr key={berita.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{berita.title}</td>
                    <td className="py-2 px-4 border-b">{berita.content.substring(0, 50)}...</td>
                    <td className="py-2 px-4 border-b">{berita.date}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(berita)}
                        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleHapus(berita)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border-b text-center" colSpan={5}>Tidak ada berita saat ini</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        <TambahBeritaModal isOpen={isTambahOpen} onClose={() => setIsTambahOpen(false)} />
        <EditBeritaModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} berita={selectedBerita} />
        <HapusBeritaModal
          id={dataSelectedHapus}
          isOpen={isHapusOpen}
          onClose={() => setIsHapusOpen(false)}
          berita={selectedBerita}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default KelolaBeritaContent;
