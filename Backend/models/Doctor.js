import mongoose from 'mongoose';


const DoctorSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      specialization: {
        type: String,
        required: [true, 'Specialization is required'],
        trim: true
      },
      experience: {
        type: Number,
        required: [true, 'Years of experience is required']
      },
      fee: {
        type: Number,
        required: [true, 'Consultation fee is required']
      },
      availability: [
        {
          day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
          },
          startTime: {
            type: String,
            required: true
          },
          endTime: {
            type: String,
            required: true
          }
        }
      ],
      bio: {
        type: String,
        trim: true
      },
      education: [
        {
          degree: {
            type: String,
            required: true
          },
          college: {
            type: String,
            required: true
          },
          year: {
            type: Number,
            required: true
          }
        }
      ],
      rating: {
        type: Number,
        default: 0
      },
      numberOfReviews: {
        type: Number,
        default: 0
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          rating: {
            type: Number,
            required: true
          },
          comment: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    },
    {
      timestamps: true
    }
  );


const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;