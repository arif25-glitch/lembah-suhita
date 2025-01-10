import React, { useEffect, useState } from 'react';

// Declare the snap property on the window object
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snap: any;
  }
}
import Cookies from 'js-cookie';

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
          window.location.href = "/";
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
          window.location.href = "/";
        }
      });
  };

  const handlePurchase = async () => {
    // Implement purchase logic here
    setIsServed(true);
    try {
      
    } catch (err) {
      console.error(err);
    }
    // try {
    //   fetch('/api/transaction', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       order_id: 'order-' + Math.floor(Math.random() * 1000000),
    //       gross_amount: totalPrice, // Amount in IDR
    //       customer_details: {
    //         first_name: usernameState,
    //         last_name: '-',
    //         email: 'john.doe@example.com',
    //         phone: '08123456789',
    //       },
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.status) {
    //         window.snap.pay(data.token, {
    //           onSuccess: () => {
    //             const transactionData = {
    //               order_id: data.token,
    //               gross_amount: totalPrice,
    //               customer_details: {
    //                 first_name: usernameState,
    //                 last_name: '-',
    //                 email: '',
    //                 phone: '',
    //               },
    //               items: cartItems,
    //               transaction_date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
    //             };
    //             fetch('/api/transaction/on_success', {
    //               method: 'POST',
    //               headers: {
    //                 'Content-Type': 'application/json',
    //               },
    //               body: JSON.stringify(transactionData),
    //             })
    //               .then((res) => res.json())
    //               .then((data) => {
    //                 if (data.status) {
    //                   setIsPurchase(true);
    //                 }
    //               });
    //           },
    //           onPending: () => {
    //             setIsPurchase(false);
    //             console.log('Payment Pending');
    //           },
    //           onError: (result: string) => {
    //             setIsPurchase(false);
    //             console.log('Payment Error:', result);
    //           },
    //           onClose: () => {
    //             setIsPurchase(false);
    //             console.log('Payment popup closed.');
    //           },
    //         });

    //       }
    //     })

    // } catch (err) {
    //   console.error(err);
    // }
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
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
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
                onClick={() => setIsServed(false)}
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
            <h2 className="text-2xl font-bold mb-4">Terimakasih telah belanja di toko kami</h2>
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
        <h2 className="text-2xl font-bold mb-4">My Cart</h2>
        {cartItems.length === 0 ? (
          <p>Tidak ada produk pada keranjang saat ini</p>
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
          className="bg-[#794422] text-white px-4 py-2 rounded-md mt-4"
        >
          Pesan Sekarang
        </button>
      </div>
    </>
  );
};

export default MyCart;
