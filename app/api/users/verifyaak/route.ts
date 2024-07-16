import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import lunarify from "../../../lib/lunaris";

connect()

export async function POST(request: NextRequest){
    
    
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {id, aakLuna} = reqBody;
        const _id = id
        const user = await User.findOne({_id}).select("-fullname -username");

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        //decypher aaklune
        const aakDeluna = lunarify(aakLuna, false, 1234)
        const recoveryKeyDeluna = aakDeluna.slice(0, 64);

        console.log(aakDeluna)
        console.log(recoveryKeyDeluna)
        console.log(user.recovery_key)
        const matched = recoveryKeyDeluna === user.recovery_key;
        console.log(matched)

        if(matched) {

            const response = NextResponse.json({
                message: "Recovery Successful",
                success: matched,
                data: user
            })
            return response;
        } else {
            const response = NextResponse.json({
                message: "Recovery Failed",
                success: matched
            })
            return response;
        }

        
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

