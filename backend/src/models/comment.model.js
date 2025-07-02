import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
            maxLength: 280
        },
        likes: {
            type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        }
    },
    {timestamps: true}
)