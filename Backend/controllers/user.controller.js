import User from "../models/user.model.js";

export const createUser=async(req,res)=>{
    try{
        const {username,password,email}=req.body;
        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.status(404).json({error:"user already exists"})
        }
        const user=await User.create({username,password,email})
        res.status(201).json({user,message:"user created Successfully"})

    }catch(err){
        console.log("Error in signup controller", err.message);
		res.status(500).json({ message: err.message });
    }

}

export const loginUser=async(req,res)=>{}

export const logoutUser=async(req,res)=>{}