import express from 'express'
import { getDoctor,getDoctors } from '../controllers/doctorControllers.js'
const router = express.Router()

//users routes
router.get('/', getDoctors)
router.get('/:id', getDoctor)

export default router;