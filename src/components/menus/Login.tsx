import React, { useState } from 'react';
import Image from 'next/image';

import Cookies from 'js-cookie';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (usernameOrEmail === 'admin' && password === 'admin') {
      window.location.href = '/admin';
    } else {
      fetch(isLogin ? 'api/user/read' : 'api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isLogin ? { usernameOrEmail: usernameOrEmail, password: password } : { username: username, email: email, password: password, cart: [] }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            alert(isLogin ? 'Berhasil login' : 'Berhasil membuat akun');
            if (isLogin) {
              Cookies.set('username', data.username);
              setIsLogin(true);
              window.location.reload();
            } else {
              setIsLogin(true);
            }
          } else {
            alert(isLogin ? "Gagal login" : "Gagal membuat akun");
          }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/img/assets/landing-background-4.webp')" }}>
      <div className="md:w-1/4 w-4/6 mx-auto p-6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-md rounded-md text-center">
        <Image 
          src="/img/assets/icon.png" 
          width={175} 
          height={175} 
          alt="Logo" 
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full px-3 py-2 border rounded-md" />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">{isLogin ? 'Username Atau Email' : 'Email'}</label>
            <input 
              type={isLogin ? 'text' : 'email'} 
              className="w-full px-3 py-2 border rounded-md" 
              value={isLogin ? usernameOrEmail : email}
              onChange={(e) => isLogin ? setUsernameOrEmail(e.target.value) : setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded-md" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={toggleForm} className="text-indigo-500 underline">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
