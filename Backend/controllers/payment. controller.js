import { ENV_VARS } from '../config/env.config.js';
import stripe from '../lib/stripe.js';
import Coupon from '../models/coupon.model.js';
import Order from '../models/order.model.js';


export const checkAmountForCouponGeneration=async(req,res)=>{
    try{
        const {products}=req.body
        const user=req.user;
        let totalAmount=0;
        const existingCoupon=await Coupon.findOne({userId:user._id})
        products.map((product)=>{
            totalAmount+=product.price * product.quantity
        })
        if(!existingCoupon && totalAmount >=200){
            await createNewCoupon(req.user._id);
        }
        else if(existingCoupon && totalAmount<200){
            await Coupon.findOneAndDelete({userId:user._id}) 
        }
        res.status(200).json({totalAmount})
    }catch(err){
       console.log('Error in checkAmountForCouponGeneration Controller',err.message);
         res.status(500).json({error:"Internal Server Error"})
    }
}

export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;
        console.log(products,couponCode)
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }
        let totalAmount = 0;

        const lineItems = products.map((product) => {
            const amount = Math.round(product.price * 100);
            totalAmount += product.price * product.quantity;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount,
                },
                quantity: product.quantity || 1,
            };
        });

        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
            if (coupon) {
                totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100);
            }
        }
        console.log(coupon)

        let session;
        try {
            const successUrl = `${ENV_VARS.CLIENT_URL}/purchase-success?session_id={{CHECKOUT_SESSION_ID}}`;
            const cancelUrl = `${ENV_VARS.CLIENT_URL}/purchase-cancel`;
            if (successUrl.length > 2048 || cancelUrl.length > 2048) {
                throw new Error("Generated URL exceeds 2048 characters");
            }

            session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: "payment",
                success_url: successUrl,
                cancel_url: cancelUrl,
                discounts: coupon ? [{
                    coupon: await createStripeCoupon(coupon.discountPercentage)
                }] : [],
                metadata: {
                    userId: req.user._id.toString(),
                    couponCode: couponCode || " ",
                    products: JSON.stringify(
                        products.map((p) => ({
                            id: p._id,
                            quantity: p.quantity,
                            price: p.price,
                        }))
                    ),
                },
            });
        } catch (err) {
            console.log('Error creating Stripe session', err.message);
            return res.status(500).json({ error: 'Error creating Stripe session' });
        }

        res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });

    } catch (err) {
        console.log('Error in createCheckoutSession Controller', err.message);
        res.status(500).json({ error: 'internal server error' });
    }
};

export const checkoutSuccess=async(req,res)=>{
    try{
        const {sessionId}=req.body;
        const formattedSessionId=sessionId.slice(1,-1)
        const session = await stripe.checkout.sessions.retrieve(formattedSessionId);

        if(session.payment_status==="paid"){
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate({
                    code:session.metadata.couponCode,
                    userId:session.metadata.userId,
                },{
                    isActive:false,
                })
            }

        }
        // create a new Order
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
        console.log('Error in checkoutSuccess controller',err)
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