import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGOURL!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log('MongoDB connected successfully')
        })

        connection.on('error', (err)=>{
            console.log('MongDB connection error, Please make sure MongoDB is running. ' + err)
            process.exit
        })
    } catch (error) {
        console.log("Something went wrong on DB Connect")
        console.log(error)
    };
}