import React, { useEffect, useRef } from 'react';
import Hero from '../Hero';
import Berita from '../Berita';
import TentangKami from '../TentangKami';
import PaketLembahSuhita from '../PaketLembahSuhita';
import Pengumuman from '../Pengumuman';

interface HomeProps {
  setActiveMenu: string;
}

const Home: React.FC<HomeProps> = ({ setActiveMenu }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tentangKamiRef = useRef<HTMLDivElement>(null);
  const BeritaRef = useRef<HTMLDivElement>(null);
  const PaketLembahSuhitaRef = useRef<HTMLDivElement>(null);
  const PengumumanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (setActiveMenu) {
      case 'Home':
        heroRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Tentang Kami':
        tentangKamiRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Berita':
        BeritaRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Paket Lembah Suhita':
        PaketLembahSuhitaRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Pengumuman':
        PengumumanRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  }, [setActiveMenu]);

  return (
    <>
      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={tentangKamiRef}>
        <TentangKami />
      </div>
      <div ref={BeritaRef}>
        <Berita />
      </div>
      <div ref={PaketLembahSuhitaRef}>
        <PaketLembahSuhita />
      </div>
      <div ref={PengumumanRef}>
        <Pengumuman />
      </div>
    </>
  );
};

export default Home;
