import express from 'express'
import { protectRoute } from '../middleware/protectRoute.middleware.js';
import { addToCart, deleteAllFromCart, deleteItemFromCart, getAllCartItems, updateQuantity } from '../controllers/cart.controller.js';

const router=express.Router();

router.get('/',protectRoute,getAllCartItems);
router.post('/',protectRoute,addToCart);
router.get('/deletecart',protectRoute,deleteAllFromCart);
router.delete('/:id',protectRoute,deleteItemFromCart);
router.put('/:productId',protectRoute,updateQuantity)

export default router;