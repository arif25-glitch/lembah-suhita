import React, { useState, useEffect } from 'react';

interface Promo {
  id: string;
  text: string;
}

interface EditPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  promo: Promo | null;
}

const EditPromoModal: React.FC<EditPromoModalProps> = ({ isOpen, onClose, promo }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (promo) {
      setText(promo.text);
    }
  }, [promo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/promo/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: promo?.id, text })
      });
      const result = await response.json();
      if (result.status) {
        onClose();
        window.location.reload();
      } else {
        alert('Gagal mengubah promo');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !promo) return null;
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
          <h2 className="text-xl font-bold mb-4">Edit Promo</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
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

export default EditPromoModal;
