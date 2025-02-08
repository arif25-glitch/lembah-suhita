import React from 'react';

interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
}

interface HapusPengumumanModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  pengumuman: Pengumuman | null;
  onDelete: (id: string) => void;
}

const HapusPengumumanModal: React.FC<HapusPengumumanModalProps> = ({ id, isOpen, onClose, pengumuman, onDelete }) => {
  if (!isOpen || !pengumuman) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Hapus Pengumuman</h2>
        <p className="mb-4">Yakin ingin menghapus pengumuman <strong>{pengumuman.judul}</strong>?</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Batal
          </button>
          <button onClick={() => onDelete(id)} className="px-4 py-2 bg-red-600 text-white rounded">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default HapusPengumumanModal;
