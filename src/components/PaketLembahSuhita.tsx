import React from 'react';
// import Image from 'next/image';

// const testimonies = [
//   {
//     name: "Febri Pratama",
//     text: "Parfume yang sangat wangi dan tahan lama. Saya sangat merekomendasikan toko ini!",
//     image: "/img/testimonies/user1.jpg"
//   },
//   {
//     name: "Jane Smith",
//     text: "Pelayanan yang sangat ramah dan produk yang berkualitas tinggi. Saya pasti akan kembali lagi.",
//     image: "/img/testimonies/user2.jpg"
//   },
//   {
//     name: "Michael Johnson",
//     text: "Pengalaman berbelanja yang luar biasa. Parfume yang saya beli sangat memuaskan.",
//     image: "/img/testimonies/user3.jpg"
//   }
// ];

const PaketLembahSuhita = () => {
  return (
    <div className="p-10 bg-white rounded shadow-md text-center">
      {/* <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        {testimonies.map((testimony, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded shadow-md flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
            <Image
              src={testimony.image}
              alt={testimony.name}
              width={100}
              height={100}
              className="w-16 h-16 rounded-full mb-4" />
            <p className="text-lg font-semibold">{testimony.name}</p>
            <p className="text-gray-600">{testimony.text}</p>
          </div>
        ))}
      </div> */}
      
      <h2 className="text-3xl font-extrabold text-gray-900 my-16">PAKET LEMBAH SUHITA</h2>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-12">
        <div className="p-4 bg-gray-200 rounded shadow-md transform transition-transform duration-300 hover:scale-105 w-80 h-80 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 bg-[#794422] text-white py-2 px-10 rounded-full max-w-xs">Edu Lebah</h3>
          <ul className="list-disc list-inside text-gray-700 text-left">
            <li>Edukasi Lebah</li>
            <li>Icip Madu Di Sarang</li>
            <li>Free Honey Stick</li>
          </ul>
          <div className="flex-grow"></div>
          <p className="mt-auto">Rp. 50.000 / Orang</p>
        </div>
        <div className="p-4 bg-gray-200 rounded shadow-md transform transition-transform duration-300 hover:scale-105 w-80 h-80 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 bg-[#794422] text-white py-2 px-10 rounded-full max-w-xs">Eco Print</h3>
            <ul className="list-disc list-inside text-gray-700 text-left">
            <li>Edukasi Ecoprint</li>
            <li>Membuat Ecoprint</li>
            <li>Totebag Ecoprint</li>
            </ul>
          <div className="flex-grow"></div>
          <p className="mt-auto">Rp. 40.000 / Orang</p>
        </div>
        <div className="p-4 bg-gray-200 rounded shadow-md transform transition-transform duration-300 hover:scale-105 w-80 h-80 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 bg-[#794422] text-white py-2 px-10 rounded-full max-w-xs">Camping</h3>
          <ul className="list-disc list-inside text-gray-700 text-left">
            <li>Min 6 Orang <br/> <span className='font-bold'>Rp. 40.000 / Orang</span></li>
            <li>Min 6 Orang + Tenda <br/> <span className='font-bold'>Rp. 80.000 / Orang</span></li>
          </ul>
        </div>
    </div>

    {/* Promo Card */}
    <div className="my-10 p-4 bg-[#794422] rounded shadow-md transform transition-transform duration-300 hover:scale-105 w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-2 bg-white text-[#794422] py-2 px-10 rounded-full">Promo</h3>
      <div className="flex-grow"></div>
      <p className="mt-auto text-white">S & K Berlaku</p>
    </div>
  </div>
  );
};

export default PaketLembahSuhita;
