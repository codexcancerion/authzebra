"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../lib/LoadingSpinner';

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
      username: '',
      email: '',
      _id: '',
      fullname: '',
      password: '',
      aak: ''
  });

  // Check if user is logged in by fetching user details
    const getUserDetails = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/users/self');
            setUser(res.data.data);
            setIsLoggedIn(true);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);


    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
                    <h1 className="text-4xl font-bold mb-6">Wazzup {user?.fullname}!</h1>
                    <div className="space-x-4">
                        
                                <Link href="/profile" passHref>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Profile
                                    </button>
                                </Link>
                    </div>
                    
                    <div className="my-6 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h1 className="text-center text-2xl font-bold mb-6 ">AAK</h1>

                        <div className="text-center">
                            <p className="mb-4">Save this for account recovery</p>
                        </div>

                        <label htmlFor="aak" className="block text-gray-700">Alternative Authentication Key</label>
                        <input
                            type="text"
                            id="aak"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            disabled
                            defaultValue={user.aak}
                        />

                    </div>
                </div>
                </>
            )}
        </>
    );
}
