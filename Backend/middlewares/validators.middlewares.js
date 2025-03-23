import {body, validationResult} from 'express-validator';


const validatorRegister = [
    body('name', 'Name is required').notEmpty().trim(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('role').optional().isIn(['patient', 'doctor', 'admin']),
    body('phone').optional().trim(),
    body('address').optional().trim(),
    body('adminCode').optional().trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    }
  ];


  const validateLogin = [
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password is required').notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    }
  ];

  const validateDoctorProfile = [
    body('specialization', 'Specialization is required').notEmpty().trim(),
    body('experience', 'Experience must be a number').isNumeric(),
    body('fee', 'Consultation fee must be a number').isNumeric(),
    body('availability').optional().isArray(),
    body('bio').optional().trim(),
    body('education').optional().isArray(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    }
  ];

  const validateAppointment = [
    body('doctor', 'Doctor ID is required').notEmpty().isMongoId(),
    body('date', 'Valid date is required').isISO8601().toDate(),
    body('time', 'Time is required').notEmpty(),
    body('reason', 'Reason for appointment is required').notEmpty().trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    }
  ]; 

  export {validatorRegister, validateLogin,validateDoctorProfile,validateAppointment};