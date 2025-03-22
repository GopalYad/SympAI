import express from 'express'
import 'dotenv/config'


import connectDB from './config/db.js'
const Port=process.env.PORT || 5000
const app = express()

connectDB()
app.listen(Port, () => {    
    console.log(`Server is running on port ${Port}`)
})
