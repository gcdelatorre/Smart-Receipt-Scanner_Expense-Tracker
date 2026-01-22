import { getProfile, updateProfile as updateProfileService } from "../services/profileService.js";

export const updateProfile = async (req, res) => {
    try {
        const user = await updateProfileService(req.user._id, req.body);
        res.status(200).json({
            success: true,
            data: user,
            message: "Profile updated successfully"
        })
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}   
