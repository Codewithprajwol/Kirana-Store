import { ENV_VARS } from "../config/env.config.js";
import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/auth.utils.js";
import jwt from 'jsonwebtoken';

export const createUser=async(req,res)=>{
    try{
        const {username,password,email}=req.body;
        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.status(404).json({error:"user already exists"})
        }
        const user=await User.create({username,password,email})
        await generateTokenAndSetCookie(user._id,res)
        res.status(201).json({user:{
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        },message:"user created Successfully"})

    }catch(err){
        console.log("Error in signup controller", err.message);
		res.status(500).json({ message: err.message });
    }

}

export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(404).json({error:"user not found"});
        if(await user.comparePassword(password)){
            generateTokenAndSetCookie(user._id,res);
            res.status(200).json({user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            },message:'user logged in successfully'})
        }else{
            res.status(401).json({error:"Invalid credentials"})
        }

    }catch(err){
        console.log("Error in login controller", err.message);
        res.status(500).json({ message: err.message });
    }
}

export const logoutUser=async(req,res)=>{
try{
    const refreshToken=req.cookies.refreshToken;
    if(refreshToken){
        const decoded=jwt.verify(refreshToken,ENV_VARS.REFRESH_TOKEN_SECRET);
        await redis.del(`refresh_token:${decoded.userId}`);
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message:"logged out successfully"})

}catch(err){
    console.log("Error in logout controller", err.message);
        res.status(500).json({ message: "Internal Server error" });

}
}

export const getProfile=async(req,res)=>{
    try{
        res.json(req.user)
    }catch(err){
        console.log('Error in getProfile Controller',err.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}