"use client"
import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import lunarify from "../lib/lunaris";
import LoadingSpinner from "../lib/LoadingSpinner";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [emailFound, setEmailFound] = useState(false);
    const [failedEmail, setFailedEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: ""
    });
    

    const handleEmail = (e: any) => {
        setUser({ ...user, email: e.target.value });
    };

    // const lunarEmail = lunarify(user.email, true, process.env.LUNARSECRET);
    
    const handleProceed = async (e:any) => {
        e.preventDefault();
        try {
            console.log(user)
            setLoading(true);
            setEmailFound(false)
            const response = await axios.post("/api/users/findByEmail", user);
            console.log("Found success", response.data);
            toast.success("Found success");
            router.push("/forgotpassword/authzebra/"+lunarify(response.data.data._id, true, 1234));
        } catch (error: any) {
            setFailedEmail(true)
            console.log("Found failed", error.message);
            toast.error(error.message);
            setEmailFound(false)
            setLoading(false)
        } 
        finally {
            setLoading(false);
        }
    };
    

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Forgot Your Password?</h1>

                <p className="mb-4 text-center">
                    Enter the email address associated with your account. You will be asked later to upload or scan the QR Authentication Code we have sent you when you first created your account
                </p>

                <form className="space-y-4" onSubmit={handleProceed}>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={handleEmail}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your email"
                        />
                    </div>

                    <button
                        type="submit"
                        // onClick={handleProceed}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Proceed
                    </button>
                </form>

                    
                <p className="mt-4 text-red-500">{failedEmail ? "Email not found. Try again" : ""}</p>

                <p className="mt-4 text-center text-sm">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
}
