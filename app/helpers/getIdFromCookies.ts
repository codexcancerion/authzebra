import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getIdFromCookies = (request: NextRequest) => {
    try {
        const token = request.cookies.get("recover")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKENSECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)   
    }
}