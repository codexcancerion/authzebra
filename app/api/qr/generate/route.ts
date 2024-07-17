
import { NextRequest, NextResponse } from "next/server";
import qrcode from 'qrcode';

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {aak} = reqBody;

        let qrLink

        //generate qr code
        try {
            const response = await qrcode.toDataURL(aak);
            qrLink = response;
        } catch (error) {
            console.log(error);
        }


        const response = NextResponse.json({
            message: "Generate Successful",
            success: true,
            qrLink: qrLink
        })

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

