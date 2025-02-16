import express from 'express'
import { protectRoute } from '../middleware/protectRoute.middleware.js';
import { checkAmountForCouponGeneration, checkoutSuccess, createCheckoutSession } from '../controllers/payment. controller.js';

const router=express.Router();

router.post('/create-checkout-session',protectRoute,createCheckoutSession)
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.post('/checkAmount',protectRoute,checkAmountForCouponGeneration)

export default router;