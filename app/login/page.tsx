"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingSpinner from "../lib/LoadingSpinner";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    

    const onLogin = async () => {
        try {
            setLoading(true);
            setFailedLogin(false)
            const response = await axios.post("/api/users/login", {...user, login: true, recover: false});
            console.log("Login success", response.data);
            window.location.href = "/dashboard"
            // router.push("/dashboard");
            // toast.success("Login success");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
            setFailedLogin(true)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const handleEmail = (e: any) => {
        setUser({ ...user, email: e.target.value });
    };

    const handlePassword = (e: any) => {
        setUser({ ...user, password: e.target.value });
    };

    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6">{loading ? "Loading..." : "Log in"}</h1>

                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleEmail}
                />

                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handlePassword}
                />

                <button
                    type="submit"
                    onClick={onLogin}
                    className={`w-full py-2 px-4 text-white font-bold rounded ${buttonDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
                    disabled={buttonDisabled}
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>
                <p className="mt-4 text-red-500">{failedLogin ? "Login Failed. Check email and password" : ""}</p>

                <div className="mt-4 text-center">
                    <p>
                        <Link href="/forgotpassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
                    </p>
                    <p className="mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
        
        </>
    );
}
