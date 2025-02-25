"use client";

import jsPDF from 'jspdf';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Tiket() {
  const params = useParams();

  const handleDownload = () => {
    const doc = new jsPDF();
    // Rotate the image 270° via the last parameter in addImage
    doc.addImage('/img/assets/tiket_reall.png', 'JPEG', 0, -210, 300, 210, undefined, 'FAST', 270);
    if (params.uniqueId) {
      doc.setFontSize(30);
      doc.setFont('helvetica', 'bold');
      doc.text(params.uniqueId as string, 45, 125, { angle: 270, align: 'center' });
    }
    doc.save(`tiket_${params.uniqueId}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full h-auto aspect-video md:aspect-auto">
      <img 
        src={'/img/assets/tiket_reall.png'} 
        alt="Bukti Pembayaran" 
        className="object-cover w-full h-full" 
      />
      <div className="absolute bottom-0 md:bottom-4 left-0 right-0 text-center py-2" style={{ fontSize: "30px", fontWeight: "bold", transform: "scale(1)" }}>
        {params.uniqueId}
      </div>
      </div>
      <button
      onClick={handleDownload}
      className="mb-4 px-4 py-2 my-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      style={{ transform: "scale(1)" }}
      >
      Download Tiket
      </button>
    </div>
  );
}