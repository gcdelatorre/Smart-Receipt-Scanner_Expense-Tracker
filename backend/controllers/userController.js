import { createUser, findUserById, updateBudgets } from "../services/userService.js"

// create new user
export const addUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(200).json({ success: true, data: newUser, message: "User Created Successfully" })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// get user
export const getUser = async (req, res) => {
    const user = await findUserById(req.params.id)
    if (!user) {
        return res.status(404).json({ success: false, message: "User Not Found" });
    }

    try {
        res.status(200).json({ success: true, data: user, message: "Successfully Retrieved Data" })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// Update user's overall and category budgets
export const updateUserBudgets = async (req, res) => {
    try {
        const { overallBudget, categoryBudgets } = req.body;
        const updatedUser = await updateBudgets(req.params.id, { overallBudget, categoryBudgets });

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

