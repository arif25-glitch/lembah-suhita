import React from 'react';
import Modal from './Modal';

interface HapusUserModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  user: { username: string } | null;
  onDelete: (id: string) => void;
}

const HapusUserModal: React.FC<HapusUserModalProps> = ({ id, isOpen, onClose, user, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hapus User">
      <p>Apakah kamu yakin ingin menghapus {user?.username}?</p>
      <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Hapus</button>
    </Modal>
  );
};

export default HapusUserModal;
