import React, { useState } from 'react';

interface TambahPengumumanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TambahPengumumanModal: React.FC<TambahPengumumanModalProps> = ({ isOpen, onClose }) => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [tanggal, setTanggal] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pengumuman/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isi, tanggal })
      });
      const result = await response.json();
      if (result.status) {
        onClose();
      } else {
        alert('Gagal menambahkan pengumuman');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Tambah Pengumuman</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Judul</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Isi</label>
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tanggal</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahPengumumanModal;
