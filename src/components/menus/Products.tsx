import React, { useEffect, useState } from 'react';
import ProductDetail from './ProductDetail';

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  harga: string;
}

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [data, setData] = React.useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/items/read');
        const dataResponse = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedData = transformData(dataResponse.data);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformData = (data: any[]): Product[] => {
    return data.map(item => ({
      id: item._id || '',
      nama: item.nama || '',
      deskripsi: item.deskripsi || '',
      harga: item.harga ? item.harga.toString() : '0'
    }));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <>
      {
        isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <p>Loading...</p>
            </div>
          </div>
        )
      }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentProducts.map(product => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <h2 className="text-lg font-bold mb-2">{product.nama}</h2>
              <p className="text-gray-600 mb-2">{product.deskripsi}</p>
              <p className="text-xl font-semibold text-[#794422] mb-4">
                Rp {parseInt(product.harga).toLocaleString('id-ID')}
              </p>
              <button 
                onClick={() => setSelectedProduct(product)} 
                className="bg-[#794422] text-white py-2 px-4 rounded hover:bg-[#a45c2e] transition-colors duration-300"
              >
                Pesan Sekarang
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(data.length / productsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#794422] hover:bg-[#a45c2e] text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
