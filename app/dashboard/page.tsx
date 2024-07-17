"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../lib/LoadingSpinner';
import qrcode from "qrcode";
import toast from 'react-hot-toast';

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
  let [text, setText] = useState("");
  let [saved, setSaved] = useState(false);
  let [failed, setFailed] = useState(false);
  let [ImageUrl, setImageUrl] = useState("");
  let [fileName, setFileName] = useState("");

  const generateQr = async () => {
      try {
          const response = await qrcode.toDataURL(user.aak);
          setImageUrl(response);
          setFileName("authzebra-"+user.username+".png")
      } catch (error:any) {
          console.log(error);
      }
  }


  const downloadImage = () => {
      try {
          setFailed(false);
          const link = document.createElement('a');
          link.href = ImageUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setSaved(true);
      } catch (error) {
          console.log(error);
          setSaved(false)
          setSaved(true)
          
      }
  }

  useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/users/self');
            console.log(res.data);
            setUser(res.data.data);
            // generateQr();
            setLoading(false)
        } catch (error: any) {
            console.error("Error fetching user details:", error.message);
            toast.error("Failed to fetch user details");
            setLoading(false)
        }
        // console.log(user);
        // generateQr()
    };


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
                            <p className="mb-4">Save this for account recovery in the future. This will be used on the forgot password page.</p>
                        </div>

                        <label htmlFor="aak" className="block text-gray-700">Alternative Authentication QR Code</label>
                        {/* <input
                            type="text"
                            id="aak"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            disabled
                            defaultValue={user.aak}
                        /> */}

                        
                        {generateQr() && (
                            <div className="mt-4">
                                <img src={ImageUrl} alt="Generated QR Code" />
                                    <button onClick={downloadImage} className="w-full py-2 mt-4 bg-green-500 text-white font-bold rounded">
                                        Download QR Code
                                    </button>
                            </div>
                        )}

                    </div>
                </div>
                </>
            )}
        </>
    );
}
