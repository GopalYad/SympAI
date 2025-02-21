import express from 'express'
import { signupValidation } from '../middleware/AuthValidate.js'
import { signup } from '../controllers/AuthController.js'
const router = express.Router()
router.post('/login',(req,res)=>{
    res.send('login succesful')
})
router.post('/signup',signupValidation,signup)
export default router