import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
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
connectDB()
app.listen(Port, () => {    
    console.log(`Server is running on port ${Port}`)
})
