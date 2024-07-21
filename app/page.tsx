"use client";

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-slate-800 mb-4">Welcome to AuthZebra!</h1>
        <p className="text-lg text-slate-600 ">Your gateway to secure QR code authentication.</p>
      </div>
      
      <div className="flex space-x-4">
        <Link href="/login" passHref>
          <button className="bg-white text-teal-700 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Login
          </button>
        </Link>
        <Link href="/signup" passHref>
          <button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
