import express from 'express';


import  register  from '../controllers/authControllers.js';
const router = express.Router();


//public routes
router.post('/register', register);
router.post('/login', (req, res) => {
    res.send('Login');
})

export default router;