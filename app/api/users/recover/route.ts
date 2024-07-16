import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {id} = reqBody;

        const user = await User.findOne({id}).select("-fullname -email -username");

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        const response = NextResponse.json({
            message: "Recovery Successful",
            success: true,
            data: user
        })

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

