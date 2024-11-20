import mongoose from "mongoose";
import { type } from "os";

const taskSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export default mongoose.model('tasks', taskSchema)
