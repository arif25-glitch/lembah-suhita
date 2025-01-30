import React from 'react';
import Modal from './Modal';

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  harga: string;
}

interface HapusProdukModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onDelete: (id: string) => void;
}

const HapusProdukModal: React.FC<HapusProdukModalProps> = ({ id, isOpen, onClose, product, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hapus Produk">
      <p>Apakah kamu yakin ingin menghapus {product?.nama}?</p>
      <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Hapus</button>
    </Modal>
  );
};

export default HapusProdukModal;
