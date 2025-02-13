import React, { useState, useEffect } from 'react';

interface Berita {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

interface EditBeritaModalProps {
  isOpen: boolean;
  onClose: () => void;
  berita: Berita | null;
}

const EditBeritaModal: React.FC<EditBeritaModalProps> = ({ isOpen, onClose, berita }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (berita) {
      setTitle(berita.title);
      setContent(berita.content);
      setImagePreview(berita.imageUrl);
    }
  }, [berita]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('id', berita?.id || '');
      formData.append('title', title);
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      } else {
        formData.append('imageUrl', imagePreview);
      }

      const response = await fetch('/api/berita/edit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.status) {
        setIsLoading(false);
        onClose();
        window.location.reload();
      } else {
        alert('Gagal mengubah berita');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen || !berita) return null;
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
          <h2 className="text-xl font-bold mb-4">Edit Berita</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Judul</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Konten</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {/* Changed date field into image file input */}
            <div className="mb-4">
              <label className="block mb-1">Gambar</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 border rounded"
              />
              {/* Optionally display current image preview */}
              {imagePreview && !imageFile && (
                <img src={imagePreview} alt="Current" className="mt-2 w-32 h-32 object-cover" />
              )}
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

export default EditBeritaModal;
