"use client";

import jsPDF from 'jspdf';
import { useParams } from 'next/navigation';

export default function Tiket() {
  const params = useParams();

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.addImage('/img/assets/tiket_reall.png', 'JPEG', 0, 0, 210, 297);
    if (params.uniqueId) {
      doc.text(params.uniqueId as string, 105, 290, { align: 'center' });
    }
    doc.save(`tiket_${params.uniqueId}.pdf`);
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full h-full">
        <img src={'/img/assets/tiket_reall.png'} alt="Bukti Pembayaran" className="object-cover w-full" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
          {params.uniqueId}
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="mb-4 px-4 py-2 my-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Download Tiket
      </button>
    </div>
  );
}