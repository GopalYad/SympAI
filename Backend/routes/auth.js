import express from 'express';


import { register,login,getProfile}  from '../controllers/authControllers.js';
import { validatorRegister, validateLogin } from '../middlewares/validators.middlewares.js';
import  protect  from '../middlewares/authorization.middlewares.js';
const router = express.Router();


//public routes
router.post('/register',validatorRegister, register);
router.post('/login',validateLogin, login);

//protected routes
router.get('/profile',protect,getProfile);


export default router;