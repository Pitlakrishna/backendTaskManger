import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }) // timestamps will add newly created user time is going to add

export default mongoose.model("users", userSchema)