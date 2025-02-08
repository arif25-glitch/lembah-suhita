"use client";

import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Session {
  _id: string;
  name: string;
  kosong: number;
  terisi: number;
}

const SessionContent = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    kosong: 0,
    terisi: 0
  });

  // Fetch sessions from API
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/session/read');
      const data = await response.json();
      setSessions(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = '/api/session/create';
      const method = "POST";
      const constantJumlahPengunjung = 200; // Use constant 200

      await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: formData.name,
          jumlahPengunjung: constantJumlahPengunjung,
        }),
      });

      setShowModal(false);
      fetchSessions();
      resetForm();
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Kamu Ingin Menghapus Sesi Ini?')) {
      setIsLoading(true);
      try {
        const result = await fetch(`/api/session/delete`, {
          method: 'POST',
          body: JSON.stringify({ id }),
        });

        const data = await result.json();
        if (data.status) {
          window.location.reload();
        }
        fetchSessions();
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: '',
      kosong: 0,
      terisi: 0
    });
  };

  return (
    <>
      {
        isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <p>Loading...</p>
            </div>
          </div>
        )
      }
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Jadwal</h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tambah Jadawl Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Kosong</th>
                <th className="px-6 py-3 border-b">Terisi</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={index} className="text-center">
                  <td className="px-6 py-4 border-b">{session.name}</td>
                  <td className="px-6 py-4 border-b">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                      {session.kosong}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-800">
                      {session.terisi}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Tambah Jadwal Baru</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Jadwal</label>
                  <input
                    type="date"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SessionContent;