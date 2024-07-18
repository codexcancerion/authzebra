"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import lunarify from "@/app/lib/lunaris";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/lib/LoadingSpinner";
import { BrowserMultiFormatReader } from '@zxing/library';
import { useZxing } from 'react-zxing';

export default function AuthZebraPage({ params }: { params: { id : string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [failedVerify, setFailedVerify] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [idLuna, setIdLuna] = useState("");
    const [aak, setAAK] = useState("");
    const [loginData, setLoginData] = useState({
      email: '',
      password: ''
    });


    useEffect(()=>{
        setIdLuna(lunarify(params.id, false, 1234))
    }, [params.id])

    
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: cameraRef } = useZxing({
    onDecodeResult(result: any) {
      handleScanResult(result.getText());
    },
    onError(err: any) {
      console.error(err);
    },
  });

  const handleProceed = (e: any) => {
    e.preventDefault();
    verifyAAK();
  };

  const handleAAK = (e: any) => {
    setAAK(e.target.value);
  };

  const verifyAAK = async () => {
    console.log(aak);
    try {
      setLoading(true);
      setFailedVerify(false);
      const response = await axios.post("/api/users/verifyaak", { id: idLuna, aakLuna: aak });
      console.log("Verification success", response.data);
      toast.success("Verification success");

      loginData.email = response.data.data.email;
      loginData.password = response.data.data.password;

      setVerificationSuccess(response.data.success);
      onLogin();
    } catch (error: any) {
      setFailedVerify(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", { ...loginData, login: false, recover: true });
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile/edit");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
  };

  const handleScanFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result) {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = async () => {
            const codeReader = new BrowserMultiFormatReader();
            try {
              const result = await codeReader.decodeFromImageElement(img);
              handleScanResult(result.getText());
            } catch (err) {
              console.error(err);
            }
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanResult = (text: string) => {
    if (!scanned) {
      setScanned(true);
      setAAK(text);
    //   window.location.href = `/forgotpassword/authzebra/${text}`;
    }
  };

  const handleTryAgain = ()=>{
    window.location.href= "/forgotpassword/authzebra/"+params.id
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Auth Zebra</h1>
        {verificationSuccess ? (
                <h1 className="text-2xl font-bold mb-6 text-center">Verification success. Wait while we do the rest for you. You will be redirected after a few moment</h1>
            ):(
                !scanned && !verificationSuccess ? (
                    <>
                    <p className="mb-4 text-center">
                        Scan QR Code or Upload QR Code Image
                    </p>
                    <video ref={cameraRef} style={{ width: '100%' }} />
                    <input type="file" accept="image/*" onChange={handleScanFile} />
                    </>
                ) : (
                    !failedVerify ? (
                        <>
                            <p className="mb-4 text-center">
                                Got your code
                            </p>
                            <button
                                    type="submit"
                                    onClick={verifyAAK}
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Proceed
                                </button>
                            </>
                    ):(
                        <>
                            <p className="mt-4 text-red-500">Oh no! Verification failed. Might try again?</p>
                            <button
                                type="submit"
                                onClick={handleTryAgain}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Try again
                            </button>
                        </>
                    )
                )
        )}
        
        {!verificationSuccess &&
            <p className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">Log in here</Link>
            </p>
        }
      </div>
    </div>
  );
}
