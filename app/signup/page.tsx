"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "../lib/LoadingSpinner";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        username: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Sign up success", response.data);
            toast.success("Sign up success");
            router.push("/login");
        } catch (error:any) {
            console.log("Sign up failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.fullname.length > 0 && user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const handleChange = (e:any) => {
        const { id, value } = e.target;
        setUser({ ...user, [id]: value });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6">{loading ? "Loading..." : "Sign Up"}</h1>

                <label htmlFor="fullname" className="block text-gray-700">Full Name</label>
                <input
                    type="text"
                    id="fullname"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleChange}
                />

                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleChange}
                />

                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleChange}
                />

                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleChange}
                />

                <button
                    onClick={onSignup}
                    className={`w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded ${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "Incomplete Info" : "Sign Up"}
                </button>

                <p className="mt-4 text-center">
                    Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
