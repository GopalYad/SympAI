import express from 'express'
import { getDoctor,getDoctors,appplyDoctor } from '../controllers/doctorControllers.js'
const router = express.Router()

//users routes
router.get('/', getDoctors)
router.get('/:id', getDoctor)


//Doctor routes only
router.get('/apply',appplyDoctor)
export default router;