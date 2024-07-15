"use client"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Navbar() {

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link href={"/"}>Home</Link>
                    {/* <Link href={"/dashboard"}>Dashboard</Link> */}
                </div>
                <div className="space-x-4">
                            <Link href={"/dashboard"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                            <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                       
                            <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            <Link href="/signup" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
}

// ERRORS
// It does not check if user logged out
