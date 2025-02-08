import React, { useEffect } from 'react';
import Image from 'next/image';
import Cookie from 'js-cookie';

interface HomeProps {
  setActiveMenu: string;
  otherMenu: (data: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveMenu, otherMenu }) => {
  const [showModal, setShowModal] = React.useState(false);
  // TODO: Replace with actual login check
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleCekPesanan = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      setShowModal(false);
      // Optionally, add further logic for a logged in user.
      window.location.href = "/cek-pesanan";
    }
  };

  useEffect(() => {
    const user = Cookie.get('username');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const sectionMapping: { [key: string]: string } = {
      "Tentang Kami": "tentangkami",
      "Berita": "berita",
      "Paket Lembah Suhita": "paketlembahsuhita",
      "Pengumuman": "pengumumanpenting"
    };
    const targetId = sectionMapping[setActiveMenu];

    // Always scroll to the top first
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (targetId) {
      setTimeout(() => {
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [setActiveMenu]);

  return (
    <>
      <section className="relative bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/img/assets/landing-background.jpeg')` }}></div>
          <div className="absolute inset-0 bg-dark opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-12 inline-block">
            <h1 className="text-4xl font-extrabold text-[#794422] sm:text-5xl lg:text-6xl">
              Edotourism Suhita Bee Farm
            </h1>
            <p className="mt-4 text-lg text-[#794422]">
              Bees Education, Ecoprint, Camping, FnB
            </p>
          </div>
        </div>
      </section>

      <section id="tentangkami" className="p-10 bg-white rounded shadow-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Tentang Kami</h2>
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="p-4 bg-gray-100 rounded shadow-md flex items-center transform transition-transform duration-300 hover:scale-105 m-2">
            <h3 className="text-xl text-[#794422] font-bold mb-4">Lembah Suhita, terletak di bawah kaki Gunung Batu Putu, adalah destinasi edukasi eksklusif yang menawarkan pengalaman belajar tentang lebah madu, seni ecoprint ramah lingkungan, camping ground di alam terbuka, serta relaksasi di sungai dan kolam jernih yang bersumber dari mata air gunung batu putu.</h3>
          </div>
        </div>
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
      </section>

      <section id='berita' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Berita</h2>
        <div className="mt-8 flex overflow-x-scroll space-x-4">
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id} className="bg-white shadow-md rounded-lg p-4 min-w-[300px] flex flex-col items-center">
              <div className="w-48 h-48 relative">
                <Image
                  src={`/img/berita/berita${id}.jpg`}
                  alt={`Product ${id}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id='paketlembahsuhita' className="p-10 bg-white rounded shadow-md text-center">
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
              <li>Min 6 Orang <br /> <span className='font-bold'>Rp. 40.000 / Orang</span></li>
              <li>Min 6 Orang + Tenda <br /> <span className='font-bold'>Rp. 80.000 / Orang</span></li>
            </ul>
          </div>
        </div>
        <div className="my-10 p-4 bg-[#794422] rounded shadow-md transform transition-transform duration-300 hover:scale-105 w-full flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 bg-white text-[#794422] py-2 px-10 rounded-full">Promo</h3>
          <div className="flex-grow"></div>
          <p className="mt-auto text-white">S & K Berlaku</p>
        </div>
      </section>

      <section id='pengumumanpenting' className="p-10 bg-white rounded shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">PENGUMUMAN PENTING!</h2>
        <div className="my-10 p-4 bg-[#794422] rounded shadow-md transform transition-transform duration-300 hover:scale-105 w-full flex flex-col items-center">
          <p className="mt-auto text-white font-bold text-center" style={{ fontSize: "18px" }}>Tiket kunjungan ke Lembah Suhita terbatas, jadi jangan sampai ketinggalan! 
            Nikmati pengalaman seru menjelajahi keindahan alam, edukasi lebah madu, ecoprint, hingga camping ground bersama keluarga dan teman-teman.</p>
          <div className="flex-grow"></div>
          <div className="flex justify-center space-x-4">
            <a href="#" onClick={(e) => { e.preventDefault(); otherMenu('Pilih Paket'); }} className="text-xl font-bold mb-2 bg-white text-[#794422] my-10 py-2 px-10 rounded-full transform transition-transform duration-300 hover:scale-105">Pesan Sekarang</a>
            <a href="#" onClick={handleCekPesanan} className="text-xl font-bold mb-2 bg-white text-[#794422] my-10 py-2 px-10 rounded-full transform transition-transform duration-300 hover:scale-105">Cek Pesananmu</a>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Silakan login terlebih dahulu sebelum mengecek pesananmu</h2>
            <button onClick={() => setShowModal(false)} className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded">Tutup</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
