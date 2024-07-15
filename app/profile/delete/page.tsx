"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi"; // Import trash icon

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState({
        username: '',
        email: '',
        _id: '',
        fullname: '',
        password: ''
    });

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/self');
            console.log(res.data);
            setData(res.data.data);
        } catch (error:any) {
            console.error("Error fetching user details:", error.message);
            toast.error("Failed to fetch user details");
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const deleteUserAccount = async () => {
        try {
            await axios.delete('/api/users/delete', { data: { _id: data._id } });
            toast.success("User account deleted successfully");
            router.push("/"); 
        } catch (error:any) {
            console.error("Delete failed:", error.message);
            toast.error("Failed to delete user account");
        }
    };

    
    const back = () => {
        router.push("/profile");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex items-center mb-6">
                    <HiOutlineTrash className="text-4xl text-red-500 mr-4" /> {/* Trash icon */}
                    <h1 className="text-2xl font-bold">Are you sure you want to delete your account?</h1>
                </div>

                <div className="text-center">
                    <p className="mb-4">Deleting your account is irreversible. All your data will be lost.</p>
                    <button
                        onClick={back}
                        className="w-full md:w-auto bg-white hover:bg-slate-100 text-slate-500 font-bold py-2 px-4 rounded"
                    >
                        Nope
                    </button>
                    <button
                        onClick={deleteUserAccount}
                        className="mx-10 w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Yes, delete my account
                    </button>
                </div>
            </div>
        </div>
    );
}
