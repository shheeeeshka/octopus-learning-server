import Friend from "../models/friend-model.js";

class FriendService {
    async sendFriendRequest(userId = "", friendId = "") {
        const existingRequest = await Friend.findOne({ userId, friendId });

        if (existingRequest) {
            throw new Error("Friend request already sent.");
        }

        const friendRequest = await Friend.create({ userId, friendId });
        return friendRequest;
    }

    async acceptFriendRequest(userId = "", friendId = "") {
        const friendRequest = await Friend.findOneAndUpdate(
            { userId: friendId, friendId: userId, status: "pending" },
            { status: "accepted" },
            { new: true },
        );

        if (!friendRequest) {
            throw new Error("No pending friend request found.");
        }

        return friendRequest;
    }
}

export default new FriendService();