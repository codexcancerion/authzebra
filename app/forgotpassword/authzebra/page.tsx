"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import lunarify from "@/app/lib/lunaris";

export default function AuthZebraPage({ params }: { params: { slug: string } }) {
    const [emailFound, setEmailFound] = useState(false);
    const [emailLuna, setEmailLuna] = useState("");
    const [keyLuna, setKeyLuna] = useState("");

    

    useEffect(()=>{
        setEmailLuna(lunarify(params.slug, false, 1234))
    }, [])

    const handleProceed = () => {
        window.location.href = "/login";
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Auth Zebra</h1>
                <h1 className="text-2xl font-bold mb-6 text-center">{emailLuna}</h1>

                <p className="mb-4 text-center">
                    Enter the Alternative Authentication Key
                </p>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="aak" className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            id="aak"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your AAK"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleProceed}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Proceed
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
}
