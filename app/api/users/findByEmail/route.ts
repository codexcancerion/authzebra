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
        const {email} = reqBody;

        const user = await User.findOne({email}).select("-password -recovery_key -aak");

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const response = NextResponse.json({
            message: "Found Successful",
            success: true,
            data: user
        })

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

