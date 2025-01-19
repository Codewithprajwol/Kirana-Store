import express from 'express'
import { protectRoute } from '../middleware/protectRoute.middleware.js';
import { getCoupon } from '../controllers/coupon.controller.js';

const router=express.Router()

router.get('/',protectRoute,getCoupon)
router.get('/validate',protectRoute,validateCoupon)


export default router;