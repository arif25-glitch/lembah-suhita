import React from 'react';
import Modal from './Modal';

interface TambahModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TambahModal: React.FC<TambahModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = React.useState('');
  const [volume, setVolume] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [priceDiscount, setPriceDiscount] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && volume && price && priceDiscount && image) {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('name', name);
      formData.append('volume', volume);
      formData.append('price', price.replace(/\./g, ''));
      formData.append('priceDiscount', priceDiscount.replace(/\./g, ''));
      formData.append('image', image);

      fetch('/api/items/add', {
        method: 'POST',
        body: formData,
      })
      .then((result) => {
        setIsLoading(false);
        if (result.status) {
          window.location.reload();
        }
      });
    } else {
      return;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    } else {
      setImage(null);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onClose={onClose} title="Tambah Produk">
        <form onSubmit={handleAdd}>
          {/* Form fields */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Barang
            </label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Barang"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volume">
              Volume Barang
            </label>
            <input
              id="volume"
              type="text"
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Volume Barang"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Harga Barang
            </label>
            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(formatNumber(e.target.value.replace(/\D/g, '')))}
              placeholder="Harga Barang"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceDiscount">
              Diskon
            </label>
            <input
              id="priceDiscount"
              type="text"
              value={priceDiscount}
              onChange={(e) => setPriceDiscount(formatNumber(e.target.value.replace(/\D/g, '')))}
              placeholder="Diskon"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
              Gambar Barang
            </label>
            <input
              id="imageUrl"
              onChange={handleImageChange}
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={isLoading}>
            Tambah
          </button>
        </form>
      </Modal>
    </>
  );
};

export default TambahModal;
