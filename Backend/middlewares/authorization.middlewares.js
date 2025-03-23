import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect =async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}
//check authorize role
const authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `User role '${req.user.role}' is not authorized to access this route`
        });
      }
      next();
    };
  };
//check doctor approval status
const checkDoctorApproval = async (req, res, next) => {
    if (req.user.role === 'doctor' && !req.user.isApproved) {
      return res.status(403).json({
        success: false,
        message: 'Your account is pending approval by admin'
      });
    }
    next();
  };   

export {protect,authorize,checkDoctorApproval}