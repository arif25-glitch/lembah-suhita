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
  const [sessions, setSessions] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [sessionCapacity,] = useState<number>(10); // Example capacity
  const [buktiPembayaran, setBuktiPembayaran] = useState<fetchBuktiPembayaran[]>([]);

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
    const fetching = async () => {
      const result = await fetch('/api/antrian/read_all');
      const data = await result.json();
      
      if (data.status) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempData = data.data.map((item: any) => ({
          id: item._id,
          nama: item.username,
          totalHarga: item.totalPrice,
          tanggal: item.transaction_date,
          totalPemelian: item.totalPurchased,
          status: item.status,
          sesi: item.session,
          uniqueId: item.uniqueId,
        }));
        setData(tempData);
        setIsFetched(true);
        setIsLoading(false);
      }
    }

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

  const autoAcceptReject = async () => {
    const sortedData = [...data].sort((a, b) => b.totalPemelian - a.totalPemelian);
    let acceptedCount = 0;

    for (const item of sortedData) {
      if (acceptedCount < sessionCapacity) {
        await handleAccept(item.id);
        acceptedCount++;
      } else {
        await handleRemove(item.id);
      }
    }
  };

  const filteredData = selectedSession
    ? data.filter(antrian => antrian.sesi === selectedSession && antrian.status === 'pending')
    : data.filter(antrian => antrian.status === 'pending');

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
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="">Pilih Sesi</option>
            {sessions.map((session, index) => (
              <option key={index} value={session}>
                {session}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Nama Pelanggan</th>
                <th className="py-2 px-4 border-b">Jam</th>
                <th className="py-2 px-4 border-b">Jumlah</th>
                <th className="py-2 px-4 border-b">Kode</th>
                <th className="py-2 px-4 border-b">Bukti Pembayaran</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((antrian, index) => (
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
    </>
  );
};

export default AntrianContent;
