import React, { useState, useEffect } from 'react';

interface Paket {
  id: string;
  nama: string;
  deskripsi: string;
  harga: string;
}

interface EditPaketModalProps {
  isOpen: boolean;
  onClose: () => void;
  paket: Paket | null;
}

const EditPaketModal: React.FC<EditPaketModalProps> = ({ isOpen, onClose, paket }) => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (paket) {
      setNama(paket.nama);
      setDeskripsi(paket.deskripsi);
      setHarga(paket.harga);
    }
  }, [paket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard_paket/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: paket?.id, nama, deskripsi, harga })
      });
      const result = await response.json();
      if (result.status) {
        onClose();
        window.location.reload();
      } else {
        alert('Gagal mengubah paket');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !paket) return null;
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md w-96">
          <h2 className="text-xl font-bold mb-4">Edit Paket</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Nama Paket</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Deskripsi</label>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Harga</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                Batal
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPaketModal;
