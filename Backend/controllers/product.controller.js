import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const updateProduct=async(req,res)=>{
    try{
        const {name,description,price,isFeatured,category}=req.body;
        let {image}=req.body;
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({error:"product not found"});
        }
        let cloudinaryResponse=null;
        if(image){
            if(product.image){
                const publicId=product.image.split('/').pop().split('.')[0];
                try{
                    await cloudinary.uploader.destroy(`products/${publicId}`);
                    cloudinaryResponse= await cloudinary.uploader.upload(image,{folder:'products'})
                }catch(err){
                    console.log('errror checking image in cloudinary',err.message);
                }
            }
        }
        product.name=name;
        product.description=description;
        product.price=price;
        product.image= cloudinaryResponse?.secure_url;
        product.isFeatured=isFeatured;
        product.category=category;
        const updatedProduct=await product.save();
        await updateFeaturedProductsCache();
        res.json(updatedProduct);
    } catch(error){
        console.log('Error in updateProduct',error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getProductDetails=async(req,res)=>{
    try{
        const {productId}=req.params;
        const productDetail=await Product.findById(productId);
        if(!productDetail){
            return res.status(404).json({error:"product not found"});
        }
        res.json(productDetail);

    }catch(error){
        console.log('Error in getProductDetails',error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getProductsBySearch=async(req,res)=>{
    try{
        const searchTerm = req.query.search || ''; 

        let query = {}; // Start with an empty query object
    
        if (searchTerm || typeof searchTerm === 'string') { // If there is a search term
          query = {  // Build the query object based on the search term
            $or: [  // Use $or to search multiple fields
              { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in the name field
              { category: { $regex: searchTerm, $options: 'i' } }  // case-insensitive search in the category field
            ]
          };
        }
    
        const products = await Product.find(query); // Find products that match the query
    
        res.status(200).json(products); // Send the products as JSON

    }catch(err){
        console.log('Error in getProductsBySearch',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getFeaturedProducts=async(req,res)=>{
    try{
        let featuredProducts=await redis.get('featuredProducts')
        if(featuredProducts){
            return res.status(200).json(JSON.parse(featuredProducts))
        }
        featuredProducts=await Product.find({isFeatured:true}).lean()
        if(!featuredProducts){
            return res.status(404).json({error:"no featured product found"});

        }
        await redis.set('featuredProducts',JSON.stringify(featuredProducts))
        res.status(200).json(featuredProducts);
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
           cloudinaryResponse= await cloudinary.uploader.upload(image,{folder:'products'})
        }
        
         const product=await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            isFeatured,
            category,
         })
         res.status(201).json({success:true,messge:'product created successfully',product:{
            name:product.name,
            description:product.description,
            price:product.price,
            image:product.image,
            isFeatured:product.isFeatured,
            category:product.category,
            _id:product._id
         }})
    }catch(err){
        console.log('Error in createProduct',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getRecommendedProducts=async(req,res)=>{
    try{
        const products=await Product.aggregate([
            {$sample:{size:4}},
            {$project:{name:1,price:1,image:1,_id:1,description:1}
        }
        ])
        res.json({products})

    }catch(err){
        console.log('Error in getRecommendedProducts',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
    
}

export const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({error:"product not found"});
        }
        if(product.image){
            const publicId=product.image.split('/').pop().split('.')[0];
            console.log(publicId)
            // tdkc2ayv9kfnfdnhh0wv
            try{
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log('image deleted from cloudinary')
            }catch(err){
                console.log('errror deleting image from cloudinary',err.message);
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({success:true,message:'product deleted successfully'})
        console.log('product deleted successfully')

    }catch(err){
        console.log('Error in deleteProduct',err.message);
        res.status(500).json({error:"Internal Server Error ho hai"});
    }
}

export const getProductsByCategory=async(req,res)=>{
    try{
        const products=await Product.find({category:req.params.category});
        if(!products){
            return res.status(404).json({error:"no product found"});
        }
        res.json({products})
    }catch(err){
        console.log('Error in getProductsByCategory',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const toggleFeaturedProducts=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({error:"product not found"});
        }
        product.isFeatured=!product.isFeatured;
        const updatedProduct=await product.save();
        await updateFeaturedProductsCache();       
         res.json(updatedProduct);

    }catch(err){
        console.log('Error in toggleFeaturedProducts',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export async function updateFeaturedProductsCache(){
    try{
        let featured_products=await Product.find({isFeatured:true}).lean();
        await redis.set('featuredProducts',JSON.stringify(featured_products));
    }
    catch(err){
        console.log('Error in updateFeaturedProductsCache',err.message);
    }
}