import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema(
    {
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
      },
      reason: {
        type: String,
        required: [true, 'Reason for appointment is required'],
        trim: true
      },
      notes: {
        type: String,
        trim: true
      },
      prescriptions: [
        {
          medicine: {
            type: String,
            required: true
          },
          dosage: {
            type: String,
            required: true
          },
          duration: {
            type: String,
            required: true
          },
          instructions: {
            type: String
          }
        }
      ],
      fee: {
        type: Number,
        required: true
      },
      isPaid: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true
    }
  );

 const Appointment = mongoose.model('Appointment',AppointmentSchema) 

 export default Appointment