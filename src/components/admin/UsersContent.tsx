import React, { useEffect, useState } from 'react';
import TambahUserModal from './TambahUserModal';
import EditUserModal from './EditUserModal';
import HapusUserModal from './HapusUserModal';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const UsersContent: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [dataSelectedHapus, setDataSelectedHapus] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHapusOpen, setIsHapusOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleHapus = (user: User, id: string) => {
    setSelectedUser(user);
    setIsHapusOpen(true);
    setDataSelectedHapus(id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await fetch('/api/user/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    if (result.status) {
      setData(data.filter((item) => item.id !== id));
    }
    setIsLoading(false);
    setIsHapusOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched) return;
      try {
        const response = await fetch('/api/user/read_all');
        const data = await response.json();
        if (data.status) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newUsers: User[] = data.data.map((item: any) => {
            return {
              id: String(item._id),
              username: String(item.username),
              email: String(item.email),
              password: String(item.password),
            };
          });
          setData(prevUsers => [...prevUsers, ...newUsers]);
          setIsFetched(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <button onClick={() => setIsTambahOpen(true)} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Tambah</button>
        <div className="overflow-auto max-h-[450px]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Password</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={data.id} className='text-center'>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{data.username}</td>
                  <td className="py-2 px-4 border-b">{data.email}</td>
                  <td className="py-2 px-4 border-b">{data.password}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => handleEdit(data)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                    <button onClick={() => handleHapus(data, data.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TambahUserModal isOpen={isTambahOpen} onClose={() => setIsTambahOpen(false)} />

        <EditUserModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} user={selectedUser} />

        <HapusUserModal id={dataSelectedHapus} isOpen={isHapusOpen} onClose={() => setIsHapusOpen(false)} user={selectedUser} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default UsersContent;
