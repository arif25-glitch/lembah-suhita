import Image from 'next/image';

export default function TentangKami() {
  return (
    <div className="p-10 bg-white rounded shadow-md text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Tentang Kami</h2>

      {/* Description */}
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="p-4 bg-gray-100 rounded shadow-md flex items-center transform transition-transform duration-300 hover:scale-105 m-2">
          <h3 className="text-xl text-[#794422] font-bold mb-4">Lembah Suhita, terletak di bawah kaki Gunung Batu Putu, adalah destinasi edukasi eksklusif yang menawarkan pengalaman belajar tentang lebah madu, seni ecoprint ramah lingkungan, camping ground di alam terbuka, serta relaksasi di sungai dan kolam jernih yang bersumber dari mata air gunung batu putu.</h3>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-12">
        <div className="p-4 bg-gray-100 rounded shadow-md flex flex-col items-center transform transition-transform duration-300 hover:scale-105 m-2 w-80 h-100">
          <Image src="/img/assets/tentangkami/edukasi-lebah-madu.png" alt="Edukasi Lebah Madu" width={200} height={150} className="mb-2" />
          <span className="text-[#794422] font-bold">Edukasi Lebah Madu</span>
          <p className="text-gray-700 mt-2 text-center">Edukasi lebah madu merupakan kegiatan pembelajaran yang bertujuan untuk mengenalkan proses budidaya lebah madu, peran lebah dalam ekosistem, dan manfaat produk lebah seperti madu, propolis, dan royal jelly.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow-md flex flex-col items-center transform transition-transform duration-300 hover:scale-105 m-2 w-80 h-96">
          <Image src="/img/assets/tentangkami/eco-print.png" alt="Eco Print" width={200} height={150} className="mb-2" />
          <span className="text-[#794422] font-bold">Eco Print</span>
          <p className="text-gray-700 mt-2 text-center">Edukasi ecoprint mengenalkan teknik pewarnaan alami pada kain menggunakan daun, bunga, dan bagian tumbuhan lainnya.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow-md flex flex-col items-center transform transition-transform duration-300 hover:scale-105 m-2 w-80 h-96">
          <Image src="/img/assets/tentangkami/camping-ground.png" alt="Camping Ground" width={200} height={150} className="mb-2" />
          <span className="text-[#794422] font-bold">Camping Ground</span>
          <p className="text-gray-700 mt-2 text-center">Camping ground area yang disediakan untuk kegiatan berkemah di alam terbuka, menawarkan pengalaman dekat dengan alam yang cocok untuk rekreasi, edukasi, atau kegiatan kelompok.</p>
        </div>
      </div>
    </div>
  );
}