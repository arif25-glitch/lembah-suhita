import React from 'react';

interface TambahFiturModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TambahFiturModal: React.FC<TambahFiturModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      {/* ...existing modal overlay... */}
      <div className="modal-content">
        <h2>Tambah Fitur</h2>
        {/* Add form elements here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TambahFiturModal;
