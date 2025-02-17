import express from 'express'
import { createUser, getProfile, loginUser, logoutUser, refreshToken } from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/protectRoute.middleware.js'

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser) 
router.post('/logout', logoutUser)
router.post('/refresh-token', refreshToken)
router.get('/profile',protectRoute,getProfile)

export default router