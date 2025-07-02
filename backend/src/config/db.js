import mongoose from 'mongoose'
import { ENV } from './env.js'

export const connectDB = async () => {
    try {
     await mongoose.connect(ENV.MONGO_URI)
     console.log("Successfully Connected Mongo DB")        
    } catch (error) {
        console.log('Error to Connecting Mongo DB')
        process.exit(1)
    }
}