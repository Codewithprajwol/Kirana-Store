import express from 'express'
import { adminRoute, protectRoute } from '../middleware/protectRoute.middleware.js';
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, toggleFeaturedProducts } from '../controllers/product.controller.js';


const router=express.Router();

router.get('/',protectRoute,adminRoute,getAllProducts);
router.get('/featured',getFeaturedProducts);
router.get('/recommendations',getRecommendedProducts);
router.get('/category/:category',getProductsByCategory);

router.post('/',protectRoute,adminRoute,createProduct);
router.patch('/:id',protectRoute,adminRoute,toggleFeaturedProducts);
router.delete('/:id',protectRoute,adminRoute,deleteProduct);
export default router;