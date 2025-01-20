import { ENV_VARS } from '../config/env.config.js';
import stripe from '../lib/stripe.js';
import Coupon from '../models/coupon.model.js';
import Order from '../models/order.model.js';


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
                },
                quantity:product.quantity || 1
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
                couponCode:couponCode || "",
                products:JSON.stringify(
                    products.map((p)=>({
                        id:p._id,
                        quantity:p.quantity,
                        price:p.price
                    }))
                )     
              }
        })
        if(totalAmount >=20000){
            await createNewCoupon(req.user._id);
        }
        res.status(200).json({id:session.id,totalAmount:totalAmount/100});

    }catch(err){
        console.log('Error in createCheckoutSession Controller',err.message);
        res.status(500).json({error:'internal server error'})
    }
   
}

export const checkoutSuccess=async(req,res)=>{
    try{
        const {sessionId}=req.body;
        const session=await stripe.checkout.sessions.retrive(sessionId);

        if(session.payment_status="paid"){
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate({
                    code:session.metadata.couponCode,
                    userId:session.metadata.userId,
                },{
                    isActive:false,
                })
            }

        }
        //create a new Order
        const products=JSON.parse(session.metadata.products);
        const newOrder=new Order({
            user:session.metadata.userId,
            products:products.map((product)=>({
                product:product.id,
                quantity:product.quantity,
                price:product.price,
            })),
            totalAmount:session.amount_total/100,
            stripeSessionId:sessionId,
        })
        await newOrder.save()
        res.status(200).json({
            success:true,
            message:"payment successful, order created, and coupon created",
            orderId:newOrder._id
        })
    }catch(err){
        console.log('Error in checkoutSuccess controller',err.messsage)
        res.status(500).json({error:"Internal Server Error"})
    }
}

async function createStripeCoupon(discountPercentage){
    const coupon=await stripe.coupons.create({
        percent_off:discountPercentage,
        duration:"once",
    })
    return coupon.id;
}

async function createNewCoupon(userId){
    await Coupon.findOneAndDelete({userId});
    const newCoupon=new Coupon({
        code:"GIFT"+Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPercentage:10,
        expirationDate:new Date(Date.now()+30*24*60*60*1000),
        userId:userId,
    })
    await newCoupon.save();
    return newCoupon;
}