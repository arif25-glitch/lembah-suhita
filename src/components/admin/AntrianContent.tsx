import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Antrian {
  id: string;
  nama: string;
  totalHarga: number;
  tanggal: string;
  totalPemelian: number;
  status: string;
  sesi: string;
  uniqueId: string;
}

interface fetchBuktiPembayaran {
  id: string;
  imageUrl: string;
  uniqueId: string;
}

const AntrianContent: React.FC = () => {
  const [data, setData] = React.useState<Antrian[]>([]);
  const [, setIsFetched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [, setSessions] = useState<string[]>([]);
  const [selectedSession, ] = useState<string>('');
  const [sessionCapacity,] = useState<number>(250); // Example capacity
  const [buktiPembayaran, setBuktiPembayaran] = useState<fetchBuktiPembayaran[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [, setAcceptedCount] = useState(0);
  const [selectedTanggal, setSelectedTanggal] = useState<string>('');
  const [fullAccepted, setFullAccepted] = useState<Antrian[]>([]);
  const [dateSessions, setDateSessions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/session/read');
        const result = await response.json();
        
        if (result.status) {
          const sessionState = result.data.map((item: { name: string; }) => item.name);
          setSessions(sessionState);
        }

      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    const fetchBuktiPembayaran = async () => {
      try {
        const response = await fetch('/api/bukti-pembayaran');
        const result = await response.json();

        if (result.status) {
          setBuktiPembayaran(result.data);
        }
      } catch (error) {
        console.error('Error fetching bukti pembayaran:', error);
      }
    };

    fetchBuktiPembayaran();
  }, [])

  useEffect(() => {
    const fetchDateSessions = async () => {
      try {
        const res = await fetch('/api/date_session/read');
        const result = await res.json();
        if (result.status && result.data) {
          // Assuming result.data is an array of session objects with a "date" field.
          const dates = result.data.map((s: { date: string }) => s.date);
          setDateSessions(dates);
        }
      } catch (error) {
        console.error('Error fetching date sessions:', error);
      }
    };
    fetchDateSessions();
  }, []);

  useEffect(() => {
    const fetching = async () => {
      const result = await fetch('/api/antrian/read_all');
      const resData = await result.json();
      if (resData.status) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fullData = resData.data.map((item: any) => ({
          id: item._id,
          nama: item.username,
          totalHarga: item.totalPrice,
          tanggal: item.servedData,
          totalPemelian: item.totalPurchased,
          status: item.status,
          sesi: item.session,
          uniqueId: item.uniqueId,
        }));
        const acceptedItems: Antrian[] = fullData.filter((item: Antrian) => item.status === 'accept');
        const pendingItems: Antrian[] = fullData.filter((item: Antrian) => item.status === 'pending');
        setFullAccepted(acceptedItems);
        setData(pendingItems);
        setIsFetched(true);
        setIsLoading(false);
      }
    };
    fetching();
  }, []);

  const handleAccept = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await fetch('/api/antrian/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
       
      console.log(response);

      setData(data.filter(item => item.id !== id));
      setAcceptedCount(prev => prev + 1);
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/transaction/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.status) {
        setData(data.filter(item => item.id !== id));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error removing transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Bagian Algoritma Greedy
  const autoAcceptReject = async () => {
    const sortedData = [...data].sort((a, b) => b.totalPemelian - a.totalPemelian);
    let acceptedCount = 0;
    for (const item of sortedData) {
      if (acceptedCount < effectiveCapacity) {  // use effectiveCapacity here
        await handleAccept(item.id);
        acceptedCount++;
        window.location.reload();
      } else {
        await handleRemove(item.id);
        window.location.reload();
      }
    }
  };
  // --------------------- Sampai Sini -------------------------

  // Compute effectiveCapacity based on selectedTanggal and dateSessions
  const effectiveCapacity = selectedTanggal === "" ? 250 * dateSessions.length : sessionCapacity;

  // Update filtered data: filter and sort in descending order based on 'totalPemelian'
  const baseFiltered = selectedSession 
    ? data.filter(antrian => antrian.sesi === selectedSession && antrian.status === 'pending')
    : data.filter(antrian => antrian.status === 'pending');

  const finalFilteredData = selectedTanggal
    ? baseFiltered.filter(antrian => antrian.tanggal === selectedTanggal)
    : baseFiltered;

  const sortedFilteredData = finalFilteredData.sort((a, b) => b.totalPemelian - a.totalPemelian);

  // Compute accepted total based on selectedTanggal.
  const computedAcceptedCount = selectedTanggal
    ? fullAccepted.filter(item => item.tanggal === selectedTanggal).reduce((sum, item) => sum + item.totalPemelian, 0)
    : fullAccepted.reduce((sum, item) => sum + item.totalPemelian, 0);

  // New: Compute total Pesanan Tiket from the table data (sum of 'Jumlah')
  const totalPesananTiket = sortedFilteredData.reduce((sum, item) => sum + item.totalPemelian, 0);

  // Combine distinct dates available in date_session and antrian collection
  const availableDates = Array.from(
    new Set([
      ...dateSessions,
      ...data.map(item => item.tanggal),
      ...fullAccepted.map(item => item.tanggal)
    ])
  ).sort();

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-between mb-4">
          <button
            onClick={autoAcceptReject}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Aktifkan Greedy Algorithm
          </button>
          {/* Updated dropdown: shows all available dates from date_session and antrian collection */}
          <div>
            <select
              value={selectedTanggal}
              onChange={(e) => setSelectedTanggal(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="">Semua Tanggal</option>
              {availableDates.map((tanggal, idx) => (
                <option key={idx} value={tanggal}>
                  {tanggal}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Modified card section with modern gray background and white text */}
        <div className="flex my-4">
          <div className="flex-1 mx-2 bg-gray-800 text-white shadow-md rounded p-4 text-center">
            <h3 className="font-bold mb-2">Daya Tampung</h3>
            <p className="text-xl">{selectedTanggal === "" ? "-" : effectiveCapacity}</p>
          </div>
          <div className="flex-1 mx-2 bg-gray-800 text-white shadow-md rounded p-4 text-center">
            <h3 className="font-bold mb-2">Total Pesanan Tiket</h3>
            <p className="text-xl">{totalPesananTiket}</p>
          </div>
          <div className="flex-1 mx-2 bg-gray-800 text-white shadow-md rounded p-4 text-center">
            <h3 className="font-bold mb-2">Sisa</h3>
            <p className="text-xl">{selectedTanggal === "" ? "-" : (effectiveCapacity - computedAcceptedCount)}</p>
          </div>
        </div>
        <div className="overflow-auto max-h-[400px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Nama Pelanggan</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Jumlah</th>
                <th className="py-2 px-4 border-b">Kode</th>
                <th className="py-2 px-4 border-b">Bukti Pembayaran</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedFilteredData.map((antrian, index) => (
                <tr key={antrian.id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{antrian.nama}</td>
                  <td className="py-2 px-4 border-b">{antrian.tanggal}</td>
                  <td className="py-2 px-4 border-b">{antrian.totalPemelian}</td>
                  <td className="py-2 px-4 border-b">{antrian.id}</td>
                  <td className="py-2 px-4 border-b">
                    {buktiPembayaran.find(item => item.uniqueId === antrian.uniqueId) ? <>
                      <Image
                        src={buktiPembayaran.find(item => item.uniqueId === antrian.uniqueId)?.imageUrl || '/path/to/default/image.jpg'}
                        alt={antrian.nama}
                        width={50}
                        height={50}
                        className="cursor-pointer mx-auto"
                        onClick={() => {
                          const url = buktiPembayaran.find(item => item.uniqueId === antrian.uniqueId)?.imageUrl;
                          if (url) setPreviewImage(url);
                        }}
                        />
                    </> : 'Belum Upload'}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button 
                      onClick={() => handleAccept(antrian.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Terima
                    </button>
                    <button 
                      onClick={() => handleRemove(antrian.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full screen image preview overlay */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative">
            <img src={previewImage} alt="Preview" className="max-w-full max-h-screen" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 text-white bg-red-500 rounded px-2 py-1"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AntrianContent;
