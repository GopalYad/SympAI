import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please enter a valid email'
        ]
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
      },
      role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: 'patient'
      },
      phone: {
        type: String,
        trim: true
      },
      address: {
        type: String,
        trim: true
      },
      isApproved: {
        type: Boolean,
        default: function() {
          return this.role !== 'doctor'; 
        }
      }
    },
    {
      timestamps: true
    }
  );

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Method to compare passwords
  UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model('User', UserSchema);

export default User;