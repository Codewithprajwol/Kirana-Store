import mongoose from 'mongoose'
import { ENV_VARS } from './env.config.js'

export const connectDb = async (req,res) => {
    try{
    const conn=await mongoose.connect(ENV_VARS.MONGO_URL);
    console.log("Database connected",conn.connection.host)
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}