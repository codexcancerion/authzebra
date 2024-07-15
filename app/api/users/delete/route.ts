import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id } = reqBody;

        // Check if user exists
        const user = await User.findById(_id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Delete user
        await User.findByIdAndDelete(_id);

        const response = NextResponse.json({
            message: "User deleted successfully",
            success: true
        });

        
        response.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
