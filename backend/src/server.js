import express from 'express'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'

import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import notificationRoutes from './routes/notifications.route.js'


import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { arcjetMiddleware } from './middleware/arcjet.middleware.js'

const app = express();

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(arcjetMiddleware)



app.get("/",(req,res) => res.send("Hello from Server"))

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/notifications",notificationRoutes)

// Error handling middleware
app.use((err,req,res) => {
    console.error("Unhandled error:",err)
    res.status(500).json({err: error.message || "Internal Server Error"})
});


const startServer = async() => {
    try {
        await connectDB()
       
        if(ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => console.log("Server Running on PORT:",ENV.PORT))
        }

    } catch (error) {
        console.error("Failed to Start Server",error.message)
        process.exit(1)
    }
} 

startServer()

// export for vercel
export default app
