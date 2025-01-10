import React, { useEffect } from 'react';

interface Antrian {
  id: string;
  nama: string;
  paket: string;
  tanggal: string;
}

const dummyAntrian: Antrian[] = [
  {
    id: "1",
    nama: "John Doe",
    paket: "Basic Clean",
    tanggal: "2024-01-15"
  },
  {
    id: "2",
    nama: "Jane Smith",
    paket: "Deep Clean",
    tanggal: "2024-01-15"
  },
  {
    id: "3",
    nama: "Mike Johnson",
    paket: "Premium Clean",
    tanggal: "2024-01-16"
  },
  {
    id: "4",
    nama: "Sarah Wilson",
    paket: "Basic Clean",
    tanggal: "2024-01-16"
  },
  {
    id: "5",
    nama: "Robert Brown",
    paket: "Deep Clean",
    tanggal: "2024-01-17"
  }
];

const AntrianContent: React.FC = () => {
  const [data, setData] = React.useState<Antrian[]>([]);
  // const [, setDataSelectedHapus] = React.useState('');
  const [isFetched, setIsFetched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [, setSelectedAntrian] = useState<Antrian | null>(null);

  const handleAccept = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleHapus = (antrian: Antrian, id: string) => {
  //   setSelectedAntrian(antrian);
  //   setDataSelectedHapus(id);
  //   // Add delete confirmation logic here
  // };

  useEffect(() => {
    // Simulate API call with dummy data
    const fetchData = async () => {
      if (isFetched) return;
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const transformedData = dummyAntrian.map(item => ({
          ...item,
          tanggal: new Date(item.tanggal).toLocaleDateString('id-ID')
        }));
        
        setData(transformedData);
        setIsFetched(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isFetched]);

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
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Nama Pelanggan</th>
                <th className="py-2 px-4 border-b">Paket</th>
                <th className="py-2 px-4 border-b">Jam</th>
                <th className="py-2 px-4 border-b">Jumlah</th>
                <th className="py-2 px-4 border-b">Kode</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((antrian, index) => (
                <tr key={antrian.id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{antrian.nama}</td>
                  <td className="py-2 px-4 border-b">{antrian.paket}</td>
                  <td className="py-2 px-4 border-b">{antrian.tanggal}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button 
                      onClick={() => handleAccept(antrian.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Terima
                    </button>
                    <button 
                      onClick={() => handleReject(antrian.id)}
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
