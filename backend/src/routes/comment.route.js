import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { createComment, deleteComment, getComments } from '../controlers/comments.controler.js';


const router = express.Router();
// Public Routes
router.get("/post/:postId",getComments)

// Protected Routes
router.post("/post/:postId",protectRoute,createComment)
router.delete("/:postId",protectRoute,deleteComment)

export default router
