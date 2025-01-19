import express from 'express'
import { protectRoute } from '../middleware/protectRoute.middleware.js';

const router=express.Router();

router.get('/',protectRoute,getAllCartItems);
router.post('/',protectRoute,addToCart);
router.delete('/',protectRoute,deleteAllFromCart);

export default router;