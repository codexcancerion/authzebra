"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineSave } from "react-icons/hi"; // Import save icon
import { FaUserEdit } from "react-icons/fa"; // Import edit icon

export default function EditPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [data, setData] = useState({
        fullname: "",
        email: "",
        id: "",
        username: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [currentData, setCurrentData] = useState({
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
            const res = await axios.get('/api/users/self');
            console.log(res.data);
            setCurrentData(res.data.data);
        } catch (error: any) {
            console.error("Error fetching user details:", error.message);
            toast.error("Failed to fetch user details");
        }
    };


    const onSave = async () => {
        try {
            setLoading(true);
            const response = await axios.put("/api/users/updateSelf", data);
            console.log("Update success", response.data);
            toast.success("Profile updated successfully");
            router.push("/profile");
        } catch (error:any) {
            console.error("Update failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data.fullname.length > 0 || data.email.length > 0 || data.username.length > 0 || data.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [data]);

    const handleFullname = (e:any) => {
        setData({ ...data, fullname: e.target.value });
    };

    const handleEmail = (e:any) => {
        setData({ ...data, email: e.target.value });
    };

    const handleUsername = (e:any) => {
        setData({ ...data, username: e.target.value });
    };

    const handlePassword = (e:any) => {
        setData({ ...data, password: e.target.value });
    };

    
    const back = () => {
        router.push("/profile");
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex items-center mb-6">
                    <FaUserEdit className="text-4xl text-blue-500 mr-4" /> {/* Edit icon */}
                    <h1 className="text-2xl font-bold">{loading ? "Loading..." : "Edit Your Profile"}</h1>
                </div>
                <button
                        onClick={back}
                        className="my-5 w-full md:w-auto bg-white hover:bg-slate-100 text-slate-500 font-bold py-2 px-4 rounded"
                    >
                        Back
                    </button>

                <label htmlFor="fullname" className="block text-gray-700">Full Name</label>
                <input
                    type="text"
                    id="fullname"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleFullname}
                    defaultValue={currentData.fullname}
                />

                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleEmail}
                    defaultValue={currentData.email}
                />

                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleUsername}
                    defaultValue={currentData.username}
                />

                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handlePassword}
                />

                <button
                    onClick={onSave}
                    type="submit"
                    disabled={buttonDisabled}
                    className={`w-full py-2 px-4 text-white font-bold rounded ${buttonDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
                >Save
                </button>
            </div>
        </div>
    );
}
