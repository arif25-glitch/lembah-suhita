import React, { useEffect } from 'react';
import Modal from './Modal';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: string;
    volume: string;
    priceDiscount: string;
    imageUrl: string;
  } | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, product }) => {
  const [name, setName] = React.useState('');
  const [volume, setVolume] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [priceDiscount, setPriceDiscount] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setVolume(product.volume);
      setPrice(product.price);
      setPriceDiscount(product.priceDiscount);
    }
  }, [product]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && volume && price && priceDiscount) {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('id', product?.id || '');
      formData.append('name', name);
      formData.append('volume', volume);
      formData.append('price', price);
      formData.append('priceDiscount', priceDiscount);

      if (image) {
        formData.append('image', image);
      }

      fetch('/api/items/edit', {
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
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
      <Modal isOpen={isOpen} onClose={onClose} title="Edit Produk">
        <form onSubmit={handleEdit}>
          {/* Form fields with pre-filled data */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Barang
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
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
              onChange={(e) => setPrice(e.target.value)}
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
              onChange={(e) => setPriceDiscount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
              Gambar Barang
            </label>
            <input
              id="imageUrl"
              type="file"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={isLoading}>
            Edit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
