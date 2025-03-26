import express from 'express'
import { authorize } from '../middlewares/authorization.middlewares.js';
import { validateAppointment } from '../middlewares/validators.middlewares.js';
import { bookAppointment } from '../controllers/appointmentController.js';
const router = express.Router()

//patients routes only
router.post('/',authorize('patient'),validateAppointment,bookAppointment)
export default router;



