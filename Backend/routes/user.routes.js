import express from 'express'
import { createUser, loginUser, logoutUser } from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/protectRoute.middleware.js'

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser) 
router.post('/logout', logoutUser)

router.get('/',protectRoute,getProfile)

export default router