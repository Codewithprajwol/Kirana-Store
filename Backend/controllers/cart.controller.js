export const addToCart=async(req,res)=>{
    const{productId}=req.body;
    try{
            const existingProduct=user.cartItems.find(item=>item.product._id===productId)
            if(existingProduct){
                existingProduct.quantity+=1;
            }else{
                user.cartItems.push({product:productId});
                await user.save();
            }
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
            user.cartItems.filter(item=>item.product._id!==productId)
        }
        await user.save()
        res.json(user.cartItems)

    }catch(err){
        console.log('Error in deleteAllFromCart',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}