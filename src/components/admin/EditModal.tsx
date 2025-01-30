import React, { useEffect } from 'react';
import Modal from './Modal';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    nama: string;
    deskripsi: string;
    harga: string;
  } | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, product }) => {
  const [nama, setNama] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [harga, setHarga] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (product) {
      setNama(product.nama);
      setDeskripsi(product.deskripsi);
      setHarga(product.harga);
    }
  }, [product]);

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nama && deskripsi && harga) {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('id', product?.id || '');
      formData.append('nama', nama);
      formData.append('deskripsi', deskripsi);
      formData.append('harga', harga.replace(/\./g, ''));

      fetch('/api/items/edit', {
        method: 'POST',
        body: formData,
      })
      .then((result) => {
        setIsLoading(false);
        if (result.status) {
          window.location.reload();
        }
      });
    } else {
      return;
    }
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onClose={onClose} title="Edit Produk">
        <form onSubmit={handleEdit}>
          {/* Form fields with pre-filled data */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
              Nama Paket
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">
              Deskripsi Paket
            </label>
            <input
              id="deskripsi"
              type="text"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="harga">
              Harga Paket
            </label>
            <input
              id="harga"
              type="text"
              value={harga}
              onChange={(e) => setHarga(formatNumber(e.target.value.replace(/\D/g, '')))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={isLoading}>
            Edit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
