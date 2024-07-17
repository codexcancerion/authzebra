
import { NextRequest, NextResponse } from "next/server";

import { randomBytes } from 'crypto';
import jwt from "jsonwebtoken";
import { deleteRecovery } from "@/app/helpers/deleteRecoveryFromCookies";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {_id} = reqBody;


        //create token data
        const tokenData = {
            id: _id,
            token: randomBytes(64).toString('hex')
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKENSECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Saved to cookie successful",
            success: true
        })
        response.cookies.set("recover", token, {
            httpOnly: true,
        })

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

