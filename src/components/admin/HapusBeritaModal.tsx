import React from 'react';

interface Berita {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface HapusBeritaModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  berita: Berita | null;
  onDelete: (id: string) => void;
}

const HapusBeritaModal: React.FC<HapusBeritaModalProps> = ({ id, isOpen, onClose, berita, onDelete }) => {
  if (!isOpen || !berita) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Hapus Berita</h2>
        <p className="mb-4">Yakin ingin menghapus berita <strong>{berita.title}</strong>?</p>
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

export default HapusBeritaModal;
