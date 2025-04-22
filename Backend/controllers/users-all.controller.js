import { user_model } from "../models/user.model.js"; // Update the path and model name if needed

export const getAllUsers = async (req, res) => {
    try {
        // Fetch user details from the database
        const users = await user_model.find({});

        // Format each user record for frontend display
        const formattedUsers = users.map((user) => ({
            username: user.username || 'N/A',
            firstName: user.firstName || 'N/A',
            lastName: user.lastName || 'N/A',
            AdharNumber: user.AdharNumber || 'N/A',
            email: user.email || '',
            phone: user.phone || '',
            userType: user.userType || 'User',
            address: user.address || '',
            userImg: user.userImg || 'default-user.jpg', // Use default image if none
            createdAt: user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : 'N/A',
            updatedAt: user.updatedAt
                ? new Date(user.updatedAt).toLocaleString()
                : 'N/A'
        }));

        // Send formatted response
        res.status(200).json(formattedUsers);

    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Error fetching user details" });
    }
};
