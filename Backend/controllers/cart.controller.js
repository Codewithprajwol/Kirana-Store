import Product from '../models/product.model.js'
export const getAllCartItems=async(req,res)=>{
    try{
        const productIds = req.user.cartItems.map(item => item.product);
        const products=await Product.find({_id:{$in:productIds}})
        
        const cartItems=products.map((product)=>{
            const item=req.user.cartItems.find((cartItem)=>cartItem.product.equals(product._id));
            return {...product.toJSON(),quantity:item.quantity}
    })
    res.status(200).json({item:cartItems})
    }catch(err){
        console.log('Error in getCartProducts controller',err.message)
        res.status(500).json({message:"server Error", error:err.message})
    }
}
export const addToCart=async(req,res)=>{
    const{productId}=req.body;
    const user=req.user;
    try{
            const existingProduct=user.cartItems.find(item=>item.product.equals(productId))
            if(existingProduct){
                existingProduct.quantity+=1;
            }else{
                user.cartItems.push({product:productId});
            }
            await user.save();
            res.json({message:"Product added to cart successfully"});

    }catch(err){
        console.log('Error in addToCart',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const deleteAllFromCart=async(req,res)=>{
    try{
        const {productId}=req.body;
        const user=req.user;
        if(!productId){
            user.cartItems=[];
        }else{
            user.cartItems.filter(item=>item.product!==productId)
        }
        await user.save()
        res.json(user.cartItems)

    }catch(err){
        console.log('Error in deleteAllFromCart',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const updateQuantity=async(req,res)=>{
    try{
        const{id:productId}=req.params;
        const {quantity}=req.body;
        const user=req.user;

        const existingProduct=user.cartItems.find(item=>item.product===productId)
        if(existingProduct){
            if(quantity===0){
                user.cartItems=user.cartItems.filter((item)=>item.product!==productId);
                await user.save();
                return res.json(user.cartItems)
            }
            existingProduct.quantity=quantity;
            await user.save()
            res.json(user.cartItems)
        }else{
          res.status(404).json({message:"Product not found"});
        }

    }catch(err){
        console.log('Error in updateController controller',err.message);
        res.status(500).json({error:'Internal Server Error'})
    }
}

