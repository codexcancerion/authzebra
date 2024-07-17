"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import lunarify from "@/app/lib/lunaris";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/lib/LoadingSpinner";
import {QrReader} from 'react-qr-reader';

export default function AuthZebraPage({ params }: { params: { aak : string } }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [failedVerify, setFailedVerify] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    // const [emailLuna, setEmailLuna] = useState("");
    const [idLuna, setIdLuna] = useState("");
    // const [keyLuna, setKeyLuna] = useState("");
    const [aak, setAAK] = useState("");
    const [loginData, setLoginData] = useState({
      email: '',
      password: ''
    })


    useEffect(()=>{
        setAAK(params.aak)
        verifyAAK()
    }, [params.aak])

    
    // useEffect(()=>{
    //     console.log("AAK effect"+aak);
    //     verifyAAK()
    // }, [aak])


    const verifyAAK = async ()=>{
        // router.push("/forgotpassword/authzebra");
        try {
            const response = await axios.get("/api/recover/account");
            setIdLuna(response.data.id)
        } catch (error: any) {
            setFailedVerify(true)
            setLoading(false)
        } 
        finally {
            setLoading(false);
        }

        try {
            setLoading(true);
            setFailedVerify(false)
            console.log(idLuna)
            console.log(aak)
            const response = await axios.post("/api/users/verifyaak", {id:idLuna, aakLuna: aak});
            
            console.log("Verification success", response.data);
            toast.success("Verification success");

            loginData.email = response.data.data.email
            loginData.password = response.data.data.password


            setVerificationSuccess(response.data.success)
            onLogin()
        } catch (error: any) {
            setFailedVerify(true)
            setLoading(false)
        } 
        finally {
            setLoading(false);
        }
    }

    
    if (loading) {
        return <LoadingSpinner />;
    }
    
    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", {...loginData, login: false, recover: true});
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile/edit");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
        }
    };

    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Auth Zebra</h1>
                <h1 className="text-1xl font-bold mb-6 text-center">{verificationSuccess?"Verification success":""}</h1>
                
                    <p className="mt-4 text-center text-sm">
                        Just one more step
                    </p>

                    <button
                        type="submit"
                        onClick={verifyAAK}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Proceed
                    </button>
                
                
                
                <p className="mt-4 text-red-500">{failedVerify ? "Oh no! Verification failed" : ""}</p>

                <p className="mt-4 text-center text-sm">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
}
