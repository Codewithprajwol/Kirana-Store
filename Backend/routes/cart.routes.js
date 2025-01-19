import express from 'express'
import { protectRoute } from '../middleware/protectRoute.middleware.js';
import { addToCart, deleteAllFromCart, getAllCartItems, updateQuantity } from '../controllers/cart.controller.js';

const router=express.Router();

router.get('/',protectRoute,getAllCartItems);
router.post('/',protectRoute,addToCart);
router.delete('/',protectRoute,deleteAllFromCart);
router.put('/:id',protectRoute,updateQuantity)

export default router;