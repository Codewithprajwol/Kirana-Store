import { redis } from "../lib/redis.js";
import Product from "../models/product.mode"

export const getFeaturedProducts=async(req,res)=>{
    try{
        let featuredProducts=await redis.get('featuredProducts')
        if(featuredProducts){
            return res.status(200).json({featuredProducts})
        }
        featuredProducts=await Product.find({isFeatured:true}).lean()
        if(!featuredProducts){
            return res.status(404).json({error:"no featured product found"});

        }
        await redis.set('featuredProducts',JSON.stringify(featuredProducts))
        res.status(200).json({featuredProducts});
    }catch(err){
        console.log("Error in getFeaturedProducts",err.message);
        res.status(500).json({error:"Internal Server Error"});

    }
}

export const getAllProducts=async(req,res)=>{
    try{
        const allProducts=await Product.find({});
        if(!allProducts){
            return res.status(404).json({error:"no product found"});

        }
        res.status(200).json({allProducts});

    }catch(err){
        console.log('Error in getAllProducts',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const createProduct=async(req,res)=>{
    try{
        
    }catch(err){
        console.log('Error in createProduct',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}