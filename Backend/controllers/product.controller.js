import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

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
        const{name,description,price,isFeatured,category}=req.body
        let {image}=req.body;

        let cloudinaryResponse=null;

        if(image){
            await cloudinary.uploader.upload(image,{folder:'products'})
        }
        
         const product=await Product.create({
            name,
            description,
            price,
            image,
            isFeatured,
            category
         })
         res.status(201).json({success:true,messge:'product created successfully',product:{
            name:product.name,
            description:product.description,
            price:product.price,
            image:product.image,
            isFeatured:product.isFeatured,
            category:product.category
         }})
    }catch(err){
        console.log('Error in createProduct',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}