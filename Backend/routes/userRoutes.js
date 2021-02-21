import express from 'express'
import {authUser,getUserProfile,registerUser,updateUserProfile} from '../controller/userControllers.js'
import {protect} from '../middleware/authMiddle.js'
const router = express.Router()

router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/').post(registerUser)

export default router;