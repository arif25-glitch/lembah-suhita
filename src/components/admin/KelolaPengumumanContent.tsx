import React, { useEffect, useState } from 'react';
import TambahPengumumanModal from './TambahPengumumanModal';
import EditPengumumanModal from './EditPengumumanModal';
import HapusPengumumanModal from './HapusPengumumanModal';

interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
}

const KelolaPengumumanContent: React.FC = () => {
  const [data, setData] = useState<Pengumuman[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHapusOpen, setIsHapusOpen] = useState(false);
  const [selectedPengumuman, setSelectedPengumuman] = useState<Pengumuman | null>(null);
  const [dataSelectedHapus, setDataSelectedHapus] = useState('');

  const handleEdit = (pengumuman: Pengumuman) => {
    setSelectedPengumuman(pengumuman);
    setIsEditOpen(true);
  };

  const handleHapus = (pengumuman: Pengumuman) => {
    setSelectedPengumuman(pengumuman);
    setDataSelectedHapus(pengumuman.id);
    setIsHapusOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/pengumuman/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const result = await response.json();
      if (result.status) {
        setData(prev => prev.filter(item => item.id !== id));
      } else {
        alert('Gagal menghapus pengumuman');
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
        const response = await fetch('/api/pengumuman/read_all');
        const resData = await response.json();
        if (resData.status) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newPengumuman: Pengumuman[] = resData.data.map((item: any) => ({
            id: String(item._id),
            judul: String(item.judul),
            isi: String(item.isi),
            tanggal: String(item.tanggal)
          }));
          setData(newPengumuman);
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
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Judul</th>
                <th className="py-2 px-4 border-b">Isi</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((pengumuman, index) => (
                  <tr key={pengumuman.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{pengumuman.judul}</td>
                    <td className="py-2 px-4 border-b">{pengumuman.isi.substring(0, 50)}...</td>
                    <td className="py-2 px-4 border-b">{pengumuman.tanggal}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(pengumuman)}
                        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleHapus(pengumuman)}
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
        <TambahPengumumanModal isOpen={isTambahOpen} onClose={() => setIsTambahOpen(false)} />
        <EditPengumumanModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} pengumuman={selectedPengumuman} />
        <HapusPengumumanModal
          id={dataSelectedHapus}
          isOpen={isHapusOpen}
          onClose={() => setIsHapusOpen(false)}
          pengumuman={selectedPengumuman}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default KelolaPengumumanContent;
