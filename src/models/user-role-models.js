import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "user"
    },
    permissions: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const UserRole = mongoose.model("user_role", userRoleSchema);

export default UserRole;