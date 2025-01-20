import { ENV_VARS } from '../config/env.config.js';
import stripe from '../lib/stripe.js'
export const createCheckoutSession=async(req,res)=>{
    try{
        const {products,couponCode}=req.body;
        if(!Array.isArray(products)|| products.length===0){
            return res.status(400).json({error:"Invalid or empty products array"})
        }
        let totalAmount=0;

        const lineItems=products.map((product)=>{
            const amount= Math.round(product.price*100)
            totalAmount+=amount * product.quantity

            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:product.name,
                        images:[product.image],
                    },
                    unit_amount:amount
                }
            }
        })
        let coupon=null;
        if(couponCode){
            coupon=await coupon.findOne({code:couponCode,userId:req.user._id,isActive:true})
            if(coupon){
                totalAmount-=Math.round(totalAmount*coupon.discountPercentage/100)
            }
        }
        const session=await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:lineItems,
            mode:"payment",
            success_url:`${ENV_VARS.CLIENT_URL}/success?seesion_id=(CHECKOUT_SESSION_ID)`,
            cancel_url:`${ENV_VARS.CLIENT_URL}/purchase-cancel`,
            discounts:coupon?[{
                coupon:await createStripeCoupon(coupon.discountPercentage)
            }]:[],
            metadata:{
                userId:req.user._id.toString(),
                couponCode:couponCode || ""          
              }
        })
    }catch(err){
        console.log('Error in createCheckoutSession Controller',err.message);
        res.status(500).json({error:'internal server error'})
    }

}