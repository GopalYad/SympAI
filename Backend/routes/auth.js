import express from 'express';


import { register,login}  from '../controllers/authControllers.js';
import { validatorRegister, validateLogin } from '../middlewares/validators.middlewares.js';
const router = express.Router();


//public routes
router.post('/register',validatorRegister, register);
router.post('/login',validateLogin, login);

export default router;