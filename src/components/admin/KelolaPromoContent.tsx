import React, { useEffect, useState } from 'react';
// Optional: Import modal components if needed
// import TambahPromoModal from './TambahPromoModal';
// import EditPromoModal from './EditPromoModal';
// import HapusPromoModal from './HapusPromoModal';

interface Promo {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string;
}

const KelolaPromoContent: React.FC = () => {
  const [data, setData] = useState<Promo[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state management placeholders
  const [, setIsTambahOpen] = useState(false);
  const [, setIsEditOpen] = useState(false);
  const [, setIsHapusOpen] = useState(false);
  const [, setSelectedPromo] = useState<Promo | null>(null);
  const [, setDataSelectedHapus] = useState('');

  const handleEdit = (promo: Promo) => {
    setSelectedPromo(promo);
    setIsEditOpen(true);
  };

  const handleHapus = (promo: Promo) => {
    setSelectedPromo(promo);
    setDataSelectedHapus(promo.id);
    setIsHapusOpen(true);
  };

  // const handleDelete = async (id: string) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch('/api/promo/delete', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ id })
  //     });
  //     const result = await response.json();
  //     if (result.status) {
  //       setData(prev => prev.filter(item => item.id !== id));
  //     } else {
  //       alert('Gagal menghapus promo');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setIsLoading(false);
  //   setIsHapusOpen(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/promo/read_all');
        const resData = await response.json();
        if (resData.status) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newPromo: Promo[] = resData.data.map((item: any) => ({
            id: String(item._id),
            judul: String(item.judul),
            deskripsi: String(item.deskripsi),
            tanggal: String(item.tanggal)
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

  return (
    <>
      {isLoading && (
        // ...existing loading code...
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
                <th className="py-2 px-4 border-b">Deskripsi</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((promo, index) => (
                  <tr key={promo.id} className="text-center">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{promo.judul}</td>
                    <td className="py-2 px-4 border-b">{promo.deskripsi.substring(0, 50)}...</td>
                    <td className="py-2 px-4 border-b">{promo.tanggal}</td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handleEdit(promo)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit
                      </button>
                      <button onClick={() => handleHapus(promo)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border-b text-center" colSpan={5}>Tidak ada promo saat ini</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Modals can be added here as needed */}
      </div>
    </>
  );
};

export default KelolaPromoContent;
