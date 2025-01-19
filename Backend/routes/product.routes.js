import express from 'express'
import { adminRoute, protectRoute } from '../middleware/protectRoute.middleware';


const router=express.Router();

router.get('/',protectRoute,adminRoute,getAllProducts);
router.get('/featured',getFeaturedProducts);
// router.get('/recommendations',getRecomendedProducts);
// router.get('/category/:category',getProductsByCategory);

router.post('/',protectRoute,adminRoute,createProduct);
// router.patch('/:id',protectRoute,adminRoute,toggleFeaturedProducts);
// router.delete('/:id',protectRoute,adminRoute,deleteProduct);
export default router;