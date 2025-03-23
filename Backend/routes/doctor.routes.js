import express from 'express'
import { getDoctor,getDoctors,applyDoctor,updateDoctorProfile } from '../controllers/doctorControllers.js'
import { validateDoctorProfile } from '../middlewares/validators.middlewares.js'
import { protect,authorize,checkDoctorApproval } from '../middlewares/authorization.middlewares.js'
const router = express.Router()

//users routes
router.get('/', getDoctors)
router.get('/:id', getDoctor)


//Doctor routes only
router.post('/apply', protect, authorize('doctor'), validateDoctorProfile, applyDoctor);
router.put('/profile', protect, authorize('doctor'), checkDoctorApproval, validateDoctorProfile, updateDoctorProfile);
export default router;