import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import doctorRoutes from './routes/doctor.routes.js'
const Port=process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//user routes
// - `POST /api/auth/register` - Register a new user (patient/doctor)
// - `POST /api/auth/login` - Login and get token
// - `GET /api/auth/profile` - Get current user's profile
// - `PUT /api/auth/profile` - Update user profile
app.use('/api/auth', authRoutes)


// - `GET /api/doctors` - Get all approved doctors
// - `GET /api/doctors/:id` - Get doctor by ID
// - `POST /api/doctors/apply` - Doctor application (for doctor users)
// - `PUT /api/doctors/profile` - Update doctor profile (for doctor users)
// - `POST /api/doctors/:id/reviews` - Add a review for a doctor (for patients)
app.use('/api/doctors', doctorRoutes);

connectDB()
app.listen(Port, () => {    
    console.log(`Server is running on port ${Port}`)
})
