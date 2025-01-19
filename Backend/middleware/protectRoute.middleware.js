import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/env.config.js';
import User from '../models/user.model.js';

export const protectRoute=async(req,res,next)=>{

    try{
        const accessToken=req.cookies.accessToken;
        if(!accessToken) return res.status(400).json({error:"invalid accessToken"});
        try{
            const decoded=jwt.verify(accessToken,ENV_VARS.ACCESS_TOKEN_SECRET);
            const user=await User.findById(decoded.userId).select('-password');
            if(!user) return res.status(400).json({error:"User not found"});    
            req.user=user;
            next();
        }catch(err){
            if(err.name==='TokenExpiredError'){
                return res.status(400).json({error:"Token Expired"});
            }
            throw err;
        }
    }catch(err){
        console.log("Error in protectRoute middleware", err.message);
        res.status(500).json({ error:"Internal Server Error" });
    }
}

export const adminRoute=(req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next();}
        else{
            return res.status(400).json({error:"Not authorized as an admin"});
        }
}