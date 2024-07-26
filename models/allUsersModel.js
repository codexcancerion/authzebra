import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    recovery_key: {
        type: String,
    },    
    aak: {
        type: String,
    },
})

const AllUser = mongoose.models.users || mongoose.model("allusers", userSchema);

export default AllUser;