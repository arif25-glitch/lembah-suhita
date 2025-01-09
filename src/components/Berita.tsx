import Image from 'next/image';
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
}

// interface ApiProduct {
//   id: number;
//   name: string;
//   image: string;
// }

const Berita = () => {
  const [products,] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetch('/api/algorithms/apriori')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status) {
  //         setProducts(data.data.map((data: ApiProduct) => ({
  //           id: data.id,
  //           name: data.name,
  //           image: data.image,
  //         })));
  //       }
  //     });
  // }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Berita</h2>
        <div className="mt-8 flex overflow-x-scroll space-x-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 min-w-[300px] flex flex-col items-center">
              <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">{product.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Berita;
