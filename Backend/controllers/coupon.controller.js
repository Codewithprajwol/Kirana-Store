import Coupon from "../models/coupon.model.js"

export const getCoupon=async(req,res)=>{
    try{
        const coupon=await Coupon.findOne({userId:req.user._id,isActive:true})
        res.json(coupon || null)
    }catch(err){
        console.log('Errorin getCoupon controller',err.message);
        res.status(500).json({error:'Internal Server Error'});
    }
}

export const validateCoupon=async(req,res)=>{
    try{
       const {code}=req.body;
       const coupon=await Coupon.findOne({code:code,userId:req.user._id,isActive:true})

       if(!coupon){
        return res.status(404).json({message:"coupon not found"})
       }
       if(coupon.expirationDate< new Date()){
        coupon.isActive=false;
        await coupon.save();
        return res.status(404).json({message:"coupon Expired"});
       }
       res.json({
        message:"coupon is valid",
        coupon:coupon
       })
    }catch(err){
        console.log('Error in validateCopuon Controller',err.message)
        res.status(500).json({error:'Internal Server Error'});
    }
}

