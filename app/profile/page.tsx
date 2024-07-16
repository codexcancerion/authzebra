"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi"; // Import icons
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import LoadingSpinner from "../lib/LoadingSpinner";

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        username: '',
        email: '',
        _id: '',
        fullname: '',
        password: ''
    });

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/users/self');
            console.log(res.data);
            setData(res.data.data);
            setLoading(false)
        } catch (error: any) {
            console.error("Error fetching user details:", error.message);
            toast.error("Failed to fetch user details");
            setLoading(false)
        }
    };

    const logout = async () => {
        try {            
            setLoading(true)
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            window.location.href = "/login"
            setLoading(false)
        } catch (error: any) {
            console.error("Logout error:", error.message);
            toast.error("Failed to logout");
            setLoading(false)
        }
    };

    const handleEditProfile = () => {
        router.push("/profile/edit");
    };

    const handleDeleteProfile = () => {
        router.push("/profile/delete");
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex items-center mb-6">
                    <FaUserCircle className="text-2xl text-blue-500 mr-4" /> {/* User icon */}
                    <h1 className="text-2xl font-bold">Profile</h1>
                </div>
                <p className="text-3xl font-bold mb-4">{data.fullname}</p>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    Logout
                </button>

                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={handleEditProfile}
                        className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        <HiOutlinePencilAlt className="text-xl mr-2" /> Edit Profile
                    </button>

                    <button
                        onClick={handleDeleteProfile}
                        className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        <HiOutlineTrash className="text-xl mr-2" /> Delete Profile
                    </button>
                </div>

                {/* Display additional user information */}
                <div className="border-t pt-4">
                    <p className="text-gray-600"><span className="font-bold">Username:</span> {data.username}</p>
                    <p className="text-gray-600"><span className="font-bold">Email:</span> {data.email}</p>
                    <p className="text-gray-600"><span className="font-bold">ID:</span> {data._id}</p>
                </div>
            </div>
        </div>
    );
}
