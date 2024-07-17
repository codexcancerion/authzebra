"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import lunarify from "@/app/lib/lunaris";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/lib/LoadingSpinner";
import {QrReader} from 'react-qr-reader';

export default function AuthZebraPage() {
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


    // useEffect(()=>{
    //     setIdLuna(lunarify(params.id, true, 1234))
    //     console.log(idLuna)
    // }, [params.id])

    
    // useEffect(()=>{
    //     console.log("AAK effect"+aak);
    //     verifyAAK()
    // }, [aak])

    
    const handleProceed = (e:any) => {
        e.preventDefault()
        verifyAAK()
    }

    const handleAAK = (e: any) => {
        setAAK(e.target.value)
    }

    const verifyAAK = async ()=>{
        // router.push("/forgotpassword/authzebra");
        try {
            setLoading(true);
            setFailedVerify(false)
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

    
    
    const handleScanFile = (result:any) => {
        if (result && !scanned) {
            setScanned(true)
            console.log(result.text);
            const text = result.text;
            setAAK(text)
            // console.log("AAK"+aak);
            // verifyAAK()
            const link = "/forgotpassword/authzebra/"+text;
            // console.log(link);
            window.location.href = (link);
            // router.push(link)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Auth Zebra</h1>
                <h1 className="text-2xl font-bold mb-6 text-center">{verificationSuccess?"Verification success":""}</h1>
                

                {/* <p className="mb-4 text-center">
                    Enter the Alternative Authentication Key
                </p>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="aak" className="block text-gray-700">AAK</label>
                        <input
                            type="text"
                            id="aak"
                            onChange={handleAAK}
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
                </form> */}

                <p className="mb-4 text-center">
                    Scan QR Code
                </p>
                
                {!scanned ? 
                    <QrReader
                    //   ref={qrRef}
                        // delay={100000}
                        style={{width: '100%'}}
                        onError={(error:any) => {console.log(error)}}
                        //   onScan={handleScanFile}
                        onResult={handleScanFile}
                    />
                    :
                    "Wait for validation"
                }
                
                
                <p className="mt-4 text-red-500">{failedVerify ? "Oh no! Verification failed" : ""}</p>

                <p className="mt-4 text-center text-sm">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
}
