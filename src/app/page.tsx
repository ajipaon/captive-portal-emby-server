'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLink = () => {
    // Deteksi perangkat pengguna
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    const deepLink = 'emby://'; // Deep link untuk membuka aplikasi Emby

    console.log(userAgent)
    if (/android/i.test(userAgent)) {

      window.location.href = deepLink;
      console.log("android")

      // setTimeout(() => {
      //   window.location.href = 'https://play.google.com/store/apps/details?id=com.emby.emby.mobile';
      // }, 3000); // 3 detik
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window)) {
      window.location.href = deepLink;
      console.log("iphone")
 
      // setTimeout(() => {
      //   window.location.href = 'https://apps.apple.com/us/app/emby/id992180193';
      // }, 3000); // 3 detik
    } else {
      console.log("browser")
      
      router.push('http://localhost:8096');
    }
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-600 via-zinc-400 to-stone-600 p-1">
      <div className="bg-red-500 text-white text-center p-4 rounded-lg mb-4 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center mb-2">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
          </svg>
          <span className="font-extrabold text-lg">Peringatan: Jaringan ini tidak memiliki akses internet.</span>
        </div>
        <hr className="w-full border-gray-300 mb-2"/>
        <span className="font-bold text-md">wifi ini hanya menyediakan film offline yang dapat diakses oleh pengguna yang terhubung ke wifi ini.</span>
      </div>
      <div className="bg-orange-400 p-3 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1 text-center">Register</h2>
        <div className="bg-orange-300 text-gray-950 text-center p-4 rounded-lg mb-4 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center mb-2">
            <span className="font-extrabold text-lg">
            Jika sudah memiliki akun, kamu bisa langsung menuju halaman <button className="text-blue-700 hover:text-blue-900 underline" onClick={handleLink}>DISINI</button>
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
          <div className="flex items-center justify-between">
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