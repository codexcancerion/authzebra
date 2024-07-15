"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import lunarify from "@/app/lib/lunaris";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AuthZebraPage({ params }: { params: { id : string } }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    // const [emailLuna, setEmailLuna] = useState("");
    const [idLuna, setIdLuna] = useState("");
    // const [keyLuna, setKeyLuna] = useState("");
    const [aak, setAAK] = useState("");
    const [loginData, setLoginData] = useState({
      email: '',
      password: ''
    })
//     const [user, setUser] = useState({
//       username: '',
//       email: '',
//       _id: '',
//       fullname: '',
//       password: ''
//   });

    
    // setIdLuna(lunarify(params.id, false, 1234))
    // console.log(idLuna)

    useEffect(()=>{
        setIdLuna(lunarify(params.id, false, 1234))
    }, [params.id])

    
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
            const response = await axios.post("/api/users/verifyaak", {id:idLuna, aakLuna: aak});
            
            console.log("Verification success", response.data);
            toast.success("Verification success");

            loginData.email = response.data.data.email
            loginData.password = response.data.data.password


            setVerificationSuccess(response.data.success)
            onLogin()
        } catch (error: any) {
            setLoading(false)
        } 
        finally {
            setLoading(false);
        }
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
                <h1 className="text-2xl font-bold mb-6 text-center">{verificationSuccess?"Verification success":""}</h1>
                

                <p className="mb-4 text-center">
                    Enter the Alternative Authentication Key
                </p>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="aak" className="block text-gray-700">Email</label>
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
                </form>

                <p className="mt-4 text-center text-sm">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
}
