import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import lunarify from "../../../lib/lunaris";
import { randomBytes } from 'crypto';
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password, login, recover} = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        var isPasswordValid = false;
        //compare password
        if(login) {
            isPasswordValid = await bcryptjs.compare(password, user.password);
            console.log(password)
            console.log(user.password)
            if(!isPasswordValid){
                return NextResponse.json({error: "Password is incorrect"}, {status: 400})
            }
        }

        //create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            aak: user.aak,
            token: randomBytes(64).toString('hex')
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKENSECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })        
        response.cookies.set("recover", "", {
            httpOnly: true, expires: new Date(0)
        });

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

