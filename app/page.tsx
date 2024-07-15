"use client"
import Link from 'next/link';

export default function HomePage() {


    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Wazzup Boy!</h1>
            <div className="space-x-4">
                        <Link href="/login" passHref>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Login
                            </button>
                        </Link>
                        <Link href="/signup" passHref>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </button>
                        </Link>
            </div>
        </div>
    );
}
