import Appointment from "../models/Appointment.js";
import Doctor from '../models/Doctor.js'
const bookAppointment = async (req, res) => {
    try {
      const { doctor: doctorId, date, time, reason } = req.body;
      
      // Check if doctor exists
      const doctor = await Doctor.findById(doctorId).populate({
        path: 'user',
        select: 'isApproved'
      });
      
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }
      
      // Check if doctor is approved
      if (!doctor.user.isApproved) {
        return res.status(400).json({
          success: false,
          message: 'Cannot book appointment with unapproved doctor'
        });
      }
      
      // Check if appointment already exists for the same doctor, date and time
      const appointmentExists = await Appointment.findOne({
        doctor: doctorId,
        date: new Date(date).toISOString().split('T')[0],
        time,
        status: { $ne: 'cancelled' }
      });
      
      if (appointmentExists) {
        return res.status(400).json({
          success: false,
          message: 'This time slot is already booked'
        });
      }
      
      // Create appointment
      const appointment = await Appointment.create({
        patient: req.user._id,
        doctor: doctorId,
        date,
        time,
        reason,
        fee: doctor.fee,
        status: 'pending'
      });
      
      res.status(201).json({
        success: true,
        data: appointment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };

export {bookAppointment}