import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 256,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: [String],
        default: ["user"],
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

export default User;