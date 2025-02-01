import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
}

const Berita = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productData: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        image: '/img/berita/berita1.jpg',
      },
      {
        id: 2,
        name: 'Product 2',
        image: '/img/berita/berita2.jpg',
      },
      {
        id: 3,
        name: 'Product 3',
        image: '/img/berita/berita3.jpg',
      },
      {
        id: 4,
        name: 'Product 4',
        image: '/img/berita/berita4.jpg',
      },
      {
        id: 5,
        name: 'Product 5',
        image: '/img/berita/berita5.jpg',
      },
    ];

    setProducts(productData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Berita</h2>
        <div className="mt-8 flex overflow-x-scroll space-x-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 min-w-[300px] flex flex-col items-center">
              <div className="w-48 h-48 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Berita;
