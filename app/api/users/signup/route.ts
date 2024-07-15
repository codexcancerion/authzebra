import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import lunarify from "../../../lib/lunaris";
import { randomBytes } from 'crypto';

const generateRandomString = () => {
  return randomBytes(32).toString('hex');
};

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {fullname, email, username, password} = reqBody

        //check if user exist
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"},
                {status: 400})
        }

        //hash password with bcrypt
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        // const hashedPassword = await lunarify(password, true, 1234)

        const newRecoveryKey = generateRandomString();
        
        const aak = lunarify(newRecoveryKey+email, true, 1234);

        //New user
        const newUser = new User({
            fullname,
            email,
            username,
            password: hashedPassword,
            recovery_key: newRecoveryKey,
            aak: aak
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
        
    }
}