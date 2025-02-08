import React, { useEffect, useState } from 'react';
import Modal from './Modal';

interface Fitur {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface EditFiturModalProps {
  isOpen: boolean;
  onClose: () => void;
  fitur: Fitur | null;
}

const EditFiturModal: React.FC<EditFiturModalProps> = ({ isOpen, onClose, fitur }) => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const [existingGambarUrl, setExistingGambarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fitur) {
      setJudul(fitur.title);
      setDeskripsi(fitur.description);
      setExistingGambarUrl(fitur.imageUrl);
      setGambar(null);
    }
  }, [fitur]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (judul && deskripsi && (gambar || existingGambarUrl)) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('id', fitur?.id || '');
      formData.append('title', judul);
      formData.append('description', deskripsi);
      if (gambar) {
        formData.append('imageUrl', gambar);
      } else {
        formData.append('imageUrl', existingGambarUrl);
      }

      fetch('/api/fitur/edit', {
        method: 'POST',
        body: formData,
      })
      .then((result) => {
        setIsLoading(false);
        if (result.status) {
          window.location.reload();
        }
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
    }
  };

  if (!isOpen || !fitur) return null;

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onClose={onClose} title="Edit Fitur">
        <form onSubmit={handleEdit}>
          <div className="mb-4">
            <label htmlFor="judul" className="block text-gray-700 text-sm font-bold mb-2">
              Judul
            </label>
            <input
              id="judul"
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deskripsi" className="block text-gray-700 text-sm font-bold mb-2">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              rows={5}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gambar" className="block text-gray-700 text-sm font-bold mb-2">
              Gambar
            </label>
            <input
              id="gambar"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setGambar(e.target.files[0]);
                }
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {existingGambarUrl && !gambar && (
              <p className="mt-2 text-sm text-gray-600">Current image: {existingGambarUrl}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Edit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EditFiturModal;
