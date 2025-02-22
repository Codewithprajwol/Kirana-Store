import stripe from '../lib/stripe.js'

export const createStripeCoupon=async(discountPercentage)=>{
    const coupon=await stripe.coupons.create({
        percent_off:discountPercentage,
        duration:"once",
    })
    return coupon.id;
}

export async function createNewTOken(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}