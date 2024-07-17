
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbconfig/dbconfig";
import {getIdFromCookies} from "@/app/helpers/getIdFromCookies"

connect()


export async function GET(request: NextRequest){
    try {
        const userId = await getIdFromCookies(request)
        
        return NextResponse.json({
            message: "Cookie Found",
            id: userId
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}