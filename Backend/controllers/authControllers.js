import 'dotenv/config';

import User from "../models/User.js";
import generateToken from '../utils/token.js';
export const register = async (req, res) => { 
    try {
        const {name, email, password, role, phone, address,adminCode} = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }


    let finalRole = role || 'patient';
    let isApproved = role !== 'doctor';
    
    // If admin role is requested, check the admin code
    if (role === 'admin') {
      // Check if the admin code is valid
      if (adminCode !== process.env.ADMIN_SECRET_CODE) {
        return res.status(401).json({
          success: false,
          message: 'Invalid admin registration code'
        });
      }
      
      // If code is valid, allow admin registration
      isApproved = true;
    }

        const user = await User.create(
            {name, 
            email, 
            password, 
            role :finalRole, 
             phone,
            address,
            isApproved
        });

        const token = generateToken(user._id);


        res.status(201).json({
            success: true,
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              isApproved: user.isApproved,
              token
            }
          });
        res.status(201).json({user});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
          });
    }
    
}


export default register;