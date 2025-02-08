import React from 'react';

interface Fitur {
  id: string;
  title: string;
  description: string;
}

interface HapusFiturModalProps {
  isOpen: boolean;
  onClose: () => void;
  fitur: Fitur | null;
  id: string;
  onDelete: (id: string) => void;
}

const HapusFiturModal: React.FC<HapusFiturModalProps> = ({ isOpen, onClose, fitur, id, onDelete }) => {
  if (!isOpen || !fitur) return null;
  return (
    <div className="modal">
      {/* ...existing modal overlay... */}
      <div className="modal-content">
        <h2>Hapus Fitur</h2>
        <p>Apakah Anda yakin ingin menghapus fitur &quot;{fitur.title}&quot;?</p>
        <button onClick={() => onDelete(id)} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">Hapus</button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
      </div>
    </div>
  );
};

export default HapusFiturModal;
