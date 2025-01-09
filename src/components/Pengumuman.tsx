import React from 'react';

const Pengumuman = () => {
  return (
    <div className="p-10 bg-white rounded shadow-md">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">PENGUMUMAN PENTING!</h2>
      <div className="my-10 p-4 bg-[#794422] rounded shadow-md transform transition-transform duration-300 hover:scale-105 w-full flex flex-col items-center">
        <p className="mt-auto text-white font-bold text-center" style={{fontSize: "18px"}}>Tiket kunjungan ke Lembah Suhita terbatas, jadi jangan sampai ketinggalan! 
        Nikmati pengalaman seru menjelajahi keindahan alam, edukasi lebah madu, ecoprint, hingga camping ground bersama keluarga dan teman-teman.</p>
        <div className="flex-grow"></div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-xl font-bold mb-2 bg-white text-[#794422] my-10 py-2 px-10 rounded-full transform transition-transform duration-300 hover:scale-105">Pesan Sekarang</a>
          <a href="#" className="text-xl font-bold mb-2 bg-white text-[#794422] my-10 py-2 px-10 rounded-full transform transition-transform duration-300 hover:scale-105">Cek Antrian</a>
        </div>
      </div>
    </div>
  );
};

export default Pengumuman;
