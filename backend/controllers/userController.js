import { findUserById, updateBudgets, updateUserSettingsPreferences } from "../services/userService.js"

// get current user
export const getUser = async (req, res) => {
    try {
        const user = await findUserById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        res.status(200).json({ success: true, data: user, message: "Successfully Retrieved Data" })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// Update user's overall and category budgets
export const updateUserBudgets = async (req, res) => {
    try {
        const { overallBudget, categoryBudgets } = req.body;
        const updatedUser = await updateBudgets(req.user._id, { overallBudget, categoryBudgets });

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User budgets updated successfully"
        });
    } catch (err) {
        // Catch specific errors from the service to send a proper client error
        if (err.status) {
            return res.status(err.status).json({ success: false, message: err.message });
        }
        // Generic server error
        res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
};

export const updateUserSettingsPreferences = async (req, res) => {
    try {
        const { currency, dateFormat, numberFormat } = req.body
        const userId = req.user._id

        const updatedUser = await updateUserSettingsPreferences(userId, { currency, dateFormat, numberFormat })

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User settings preferences updated successfully"
        })
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ success: false, message: err.message });
        }
        res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
}