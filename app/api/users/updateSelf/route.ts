import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, fullname, email, username, password } = reqBody;
        console.log("1")
        
        console.log(_id + fullname + email + username + password)

        // Check if user exists
        const user = await User.findOne(_id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        console.log("2")

        // Update user details
        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.username = username || user.username;

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
        }
        console.log("3")

        const updatedUser = await user.save();
        console.log("4")

        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            updatedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
