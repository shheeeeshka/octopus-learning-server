import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    friendId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined", "blocked"],
        default: "pending",
    },
}, { timestamps: true });

const Friend = mongoose.model("friend", friendSchema);

export default Friend;