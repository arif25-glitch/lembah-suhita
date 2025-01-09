import React, { useEffect, useState } from 'react';
import ProductDetail from './ProductDetail';
import Image from 'next/image';

interface Product {
  id: string[];
  name: string;
  volume: string[];
  price: string[];
  priceDiscount: string[];
  imageUrl: string[];
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
      const response = await fetch('https://tokoarabicparfume-api.vercel.app/api/get_data');
      const dataResponse = await response.json();
      const transformedData = transformData(dataResponse.data);
      setData(transformedData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformData = (data: any[]) => {
    const transformed: Product[] = [];
    const productMap: { [key: string]: Product } = {};

    data.forEach(item => {
      if (!productMap[item.name]) {
        productMap[item.name] = {
          id: [],
          name: item.name,
          volume: [],
          price: [],
          priceDiscount: [],
          imageUrl: []
        };
        transformed.push(productMap[item.name]);
      }
      productMap[item.name].id.push(item._id);
      productMap[item.name].volume.push(item.volume);
      productMap[item.name].price.push(item.price);
      productMap[item.name].priceDiscount.push(item.priceDiscount);
      productMap[item.name].imageUrl.push(item.imageUrl);
    });

    return transformed;
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
            <div key={product.id[0]} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <Image 
              src={product.imageUrl[0]} 
              alt={product.name} 
              width={200}
              height={200}
              className="object-contain mx-auto mb-4 rounded-lg" />
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <button onClick={() => setSelectedProduct(product)} className="bg-blue-500 text-white py-2 px-4 rounded">Pesan Sekarang</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(data.length / productsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200'}`}
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
