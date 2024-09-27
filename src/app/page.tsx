'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const success_login = (kata: string) => toast(kata);
  
  const handleLink = () => {

    setIsLoading(true);
    const userAgent = navigator.userAgent || (window as unknown as { opera?: string }).opera || '';

    // const deepLink = 'intent://home#Intent;package=com.mb.android;scheme=emby;end';
    // const deepLink = 'intent://home#Intent;scheme=com.mb.android;package=com.mb.android;end';
    const deepLink = 'emby://192.168.0.160:8096';

    
    console.log(userAgent);
    if (/android/i.test(userAgent)) {

      window.location.href = deepLink;
      console.log('android');
      setTimeout(() => {
        window.location.href = 'http://192.168.0.160:8096';
      }, 3000); // 3 detik

      // setTimeout(() => {
      //   window.location.href = 'https://play.google.com/store/apps/details?id=com.emby.emby.mobile';
      // }, 3000); // 3 detik
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window)) {
      window.location.href = deepLink;
      console.log('iphone');
 
      // setTimeout(() => {
      //   window.location.href = 'https://apps.apple.com/us/app/emby/id992180193';
      // }, 3000); // 3 detik
    } else {
      console.log('browser');

      router.push(process.env.NEXT_PUBLIC__API_EMBY || 'http://localhost:8096');
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!username || !password) {
      alert('Username and password harus diisi');
      return;
    }
    setIsLoading(true);
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          success_login(data.message);
          setUsername('');
          setPassword('');
        } else {
          success_login('Failed to register user');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to register user');
      })
      .finally(() => {
        setIsLoading(false);
      });

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-600 via-zinc-400 to-stone-600 p-1">
    <ToastContainer />
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            border: '16px solid #f3f3f3',
            borderRadius: '50%',
            borderTop: '16px solid #3498db',
            animation: 'spin 2s linear infinite'
          }}></div>
        </div>
      )}
      <div className="bg-red-500 text-white text-center p-1 rounded-lg mb-2 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center mb-2">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
          </svg>
          <span className="font-extrabold text-lg">Peringatan: Jaringan ini tidak memiliki akses internet.</span>
        </div>
        <hr className="w-full border-gray-300 mb-2"/>
        <span className="font-bold text-md">wifi ini hanya menyediakan film offline yang dapat diakses oleh pengguna yang terhubung ke wifi ini.</span>
      </div>
      <div className="bg-orange-400 p-1 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1 text-center">Register</h2>
        <div className="bg-orange-300 text-gray-950 text-center p-4 rounded-lg mb-4 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center mb-2">
            <span className="font-extrabold text-lg">
            Jika sudah memiliki akun, kamu bisa langsung menuju halaman <button className="text-blue-700 hover:text-blue-900 underline" onClick={handleLink}>DISINI</button> atau buka dengan apk Emby di perangkat kamu. dan pastekan link ini<span className="font-bold text-cyan-700">
            <button
                className="text-cyan-700 underline"
                onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(process.env.NEXT_PUBLIC__API_EMBY || 'http://localhost:8096')
                  .then(() => {
                    alert('Link copied to clipboard!');
                  })
                  .catch((err: Error) => {
                    console.error('Could not copy text: ', err.message);
                  });
                } else {
                  console.error('Clipboard API not supported');
                }
                }}
              >
              {process.env.NEXT_PUBLIC__API_EMBY || 'http://localhost:8096'}
              </button>
            </span>
            </span>
        </div>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password  
              <span className="text-red-500">* pin default kamu adalah 1234</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;