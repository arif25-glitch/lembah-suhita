/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

// Declare the snap property on the window object
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snap: any;
  }
}
import Cookies from 'js-cookie';
import Image from 'next/image';

interface CartItem {
  data: {
    _id: string;
    nama: string;
    deskripsi: string;
    harga: string;
  };
  count: number;
}

const MyCart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [usernameState, setUsernameState] = useState('');
  const [, setTotalPrice] = useState(0);
  const [isPurchase, setIsPurchase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isServed, setIsServed] = useState(false);
  const [, setSessions] = useState<string[]>([]);
  const [selectedSession, ] = useState<string>('');
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    const username = Cookies.get('username');
    setUsernameState(username as string);

    if (username) {
      setIsLoggedIn(true);
      setIsLoading(true);
      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setCartItems(data.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const total = data.data.reduce((total: any, item: any) => {
              const itemTotal = (parseInt(item.data.price) - parseInt(item.data.priceDiscount)) * item.count;
              return total + itemTotal;
            }, 0);
            setTotalPrice(total);
            setIsLoading(false);
          }
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (isPurchase) {
      setIsLoading(true);
      fetch('/api/cart/empty_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameState }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setCartItems([]);
            setTotalPrice(0);
            setIsLoading(false);
          }
        });
    }
  }, [isPurchase, usernameState]);

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

  const addProduct = (productId: string) => {
    setIsLoading(true);
    fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: usernameState, productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCartItems(prevItems =>
            prevItems.map(item =>
              item.data._id === productId ? { ...item, count: item.count + 1 } : item
            )
          );
          setIsLoading(false);
        }
      });
  };

  const removeProduct = (productId: string) => {
    setIsLoading(true);
    fetch('/api/cart/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: usernameState, productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCartItems(prevItems =>
            prevItems
              .map(item => (item.data._id === productId ? { ...item, count: item.count - 1 } : item))
              .filter(item => item.count > 0)
          );
          setIsLoading(false);
        }
      });
  };

  const handleCek = () => {
    window.location.href = "/cek-pesanan";
  };

  const handlePurchase = async () => {
    if (!selectedSession) {
      setIsSessionModalOpen(true);
      setUniqueId(Math.random().toString(36).substr(2, 9));
      return;
    }

    setIsServed(true);
    setIsQrModalOpen(true); // Show QR code modal
  };

  const afterPurchase = () => {
    setIsPurchase(false);
    window.location.reload();
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = (parseInt(item.data.harga)) * item.count;
      return total + itemTotal;
    }, 0);
  };

  const generatePDFReceipt = (transactionData: any) => {
    const doc = new jsPDF();
    doc.text('Lembah Suhita', 10, 10);
    doc.text('Struk', 10, 20);
    doc.text(`Nama: ${transactionData.username}`, 10, 30);
    doc.text(`Tanggal Transaksi: ${transactionData.transaction_date}`, 10, 40);
    doc.text(`Total Harga: Rp. ${transactionData.totalPrice}`, 10, 50);
    doc.text('Paket:', 10, 60);

    transactionData.items.forEach((item: any, index: any) => {
      doc.text(`${index + 1}. ${item.data.nama} - ${item.count} x Rp. ${item.data.harga}`, 10, 70 + (index * 10));
    });

    doc.save('struk_lembah_suhita.pdf');
  };

  const handleImageSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('username', usernameState);
    formData.append('uniqueId', uniqueId);

    try {
      setIsLoading(true);
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setIsImageModalOpen(false);
        setSelectedImage(null);
        setIsLoading(true);

        // Implement purchase logic here
        const dataPurchasing = {
          username: usernameState,
          items: cartItems,
          totalPrice: calculateTotalPrice(),
          transaction_date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
          totalPurchased: cartItems.reduce((total, item) => total + item.count, 0),
          servedData: selectedDate,
          status: "pending",
          session: selectedSession,
          uniqueId: uniqueId,
        };

        fetch('/api/transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataPurchasing),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status) {
              setIsServed(false);
              setIsLoading(false);
              setIsPurchase(true);
              generatePDFReceipt(dataPurchasing); // Generate PDF receipt
            }
          });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="p-4">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md text-center">
          <h2 className="text-2xl font-bold mb-4">Kamu harus login terlebih dahulu untuk melihat keranjang kamu</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {
        isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[10000]">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <p>Loading...</p>
            </div>
          </div>
        )
      }
      {
        isServed && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <p>Anda Telah Masuk Antrian Tiket, Mohon Untuk Tunggu Beberapa Saat Atau Hubungi Admin Bila Ada Kesalahan</p>
              <button
                onClick={() => handlePurchase}
                className="bg-[#794422] text-white px-4 py-2 rounded-md mt-4"
              >
                Oke
              </button>
            </div>
          </div>
        )
      }
      {isPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md text-center">
            <h2 className="text-2xl font-bold mb-4">Terimakasih telah memesan tiket di Lembah Suhita</h2>
            <button
              onClick={afterPurchase}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Keranjang Pesanan Ku</h2>
        {cartItems.length === 0 ? (
          <p>Tidak ada paket pada keranjang saat ini</p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.data._id} className="flex justify-between items-center mb-2">
                {/* <img src={item.data.imageUrl} alt={item.data.name} className="w-16 h-16 object-cover rounded mr-4" /> */}
                <div className="flex flex-col flex-grow">
                  <span>{item.data.nama} (x{item.count})</span>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold">Rp. {(parseInt(item.data.harga)) * item.count}</span>
                    <div>
                      <button
                        onClick={() => addProduct(item.data._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeProduct(item.data._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 text-right">
          <p className="text-lg font-bold">Total Harga: Rp. {calculateTotalPrice().toLocaleString('id-ID')}</p>
        </div>
        <button
          onClick={handlePurchase}
          className="bg-[#794422] text-white px-4 py-2 rounded-md mt-4 mx-2"
        >
          Pesan Sekarang
        </button>
        <button
          onClick={handleCek}
          className="bg-[#794422] text-white px-4 py-2 rounded-md mt-4 mx-2"
        >
          Cek Pesananmu
        </button>
      </div>

      {isSessionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-xl mb-4">Pilih Tanggal</h2>
            <input
              type="date"
              className="px-4 py-2 border rounded w-full mb-4"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
          onClick={() => setIsSessionModalOpen(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
          Batal
              </button>
              <button
          onClick={() => {
            setIsSessionModalOpen(false);
            handlePurchase();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
          Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {isQrModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl mb-4">Scan QR Code untuk Pembayaran</h2>
            <div className="flex justify-center">
              <Image 
                src="/img/qris/qris1hd.jpg" 
                alt="QR Code" 
                width={500}
                height={500}
                className="object-cover" 
              />
            </div>
            <button
              onClick={() => {
                setIsQrModalOpen(false);
                setIsImageModalOpen(true);
              }}
              className="bg-[#794422] text-white px-4 py-2 rounded-md mt-4"
            >
              Lanjutkan
            </button>
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {isImageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-xl mb-4">Upload Bukti Pembayaran *Maks file: 10 MB</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files ? e.target.files[0] : null)}
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleImageSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCart;
