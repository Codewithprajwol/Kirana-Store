import stripe from '../lib/stripe.js'

export const createStripeCoupon=async(discountPercentage)=>{
    const coupon=await stripe.coupons.create({
        percent_off:discountPercentage,
        duration:"once",
    })
    return coupon.id;
}

export const createNewTOken(userId){
    
}
