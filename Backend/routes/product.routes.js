import express from 'express'
import { adminRoute, protectRoute } from '../middleware/protectRoute.middleware.js';
import { createProduct, deleteProduct,getProductDetails, getAllProducts, getFeaturedProducts, getProductsByCategory, getProductsBySearch, getRecommendedProducts, toggleFeaturedProducts, updateProduct } from '../controllers/product.controller.js';


const router=express.Router();

router.get('/',protectRoute,adminRoute,getAllProducts);
router.get('/featured',getFeaturedProducts);
router.get('/recommendations',getRecommendedProducts);
router.get('/category/:category',getProductsByCategory);
router.get('/search',getProductsBySearch)
router.get('/:productId',getProductDetails)

router.post('/',protectRoute,adminRoute,createProduct);
router.patch('/:id',protectRoute,adminRoute,toggleFeaturedProducts);
router.patch('/update/:id',protectRoute,adminRoute,updateProduct);
router.delete('/:id',protectRoute,adminRoute,deleteProduct);
export default router;