// import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TambahModal from './TambahModal';
// import EditModal from './EditModal';
// import HapusProdukModal from './HapusProdukModal'; // Import HapusProdukModal component

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  harga: string;
}

const DashboardContent: React.FC = () => {
  const [data, setData] = React.useState<Product[]>([]);
  const [, setDataSelectedHapus] = React.useState('');
  const [isFetched, setIsFetched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isTambahOpen, setIsTambahOpen] = React.useState(false);
  const [, setIsEditModalOpen] = useState(false);
  const [, setIsHapusOpen] = React.useState(false);
  const [, setSelectedProduct] = useState<Product | null>(null);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // const handleEditModalClose = () => {
  //   setIsEditModalOpen(false);
  //   setSelectedProduct(null);
  // };

  const handleHapus = (product: Product, id: string) => {
    setSelectedProduct(product);
    setIsHapusOpen(true);
    setDataSelectedHapus(id);
  };

  // const handleDelete = async (id: string) => {
  //   setIsLoading(true);
  //   const response = await fetch('/api/items/delete', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ id }),
  //   });

  //   const result = await response.json();
  //   if (result.status) {
  //     setData(data.filter((item) => item.id !== id));
  //   }
  //   setIsLoading(false);
  //   setIsHapusOpen(false);
  // };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('api/items/read');
        const data = await response.json();
        if (data.status) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newProducts: Product[] = data.data.map((item: any) => {
            return {
              id: String(item._id),       // Sanitize to string
              nama: String(item.nama),    // Sanitize to string
              deskripsi: String(item.deskripsi), // Sanitize to string
              harga: parseFloat(item.harga) || 0,     // Sanitize and provide default
            };
          });
          setData(prevProducts => [...prevProducts, ...newProducts]);
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
        <button onClick={() => setIsTambahOpen(true)} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Tambah</button>
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nama Paket</th>
                <th className="py-2 px-4 border-b">Deskripsi Paket</th>
                <th className="py-2 px-4 border-b">Harga Paket</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              {
                data.map((data, index) => (
                  <tr key={data.id} className='text-center'>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{data.nama}</td>
                    <td className="py-2 px-4 border-b">{data.deskripsi}</td>
                    <td className="py-2 px-4 border-b">{formatCurrency(Number(data.harga))}</td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handleEditClick(data)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                      <button onClick={() => handleHapus(data, data.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Hapus</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <TambahModal isOpen={isTambahOpen} onClose={() => setIsTambahOpen(false)} />

        {/* <EditModal isOpen={isEditModalOpen} onClose={handleEditModalClose} product={selectedProduct} /> */}

        {/* <HapusProdukModal id={dataSelectedHapus} isOpen={isHapusOpen} onClose={() => setIsHapusOpen(false)} product={selectedProduct} onDelete={handleDelete} /> Use HapusProdukModal component */}
      </div>
    </>
  );
};

export default DashboardContent;
