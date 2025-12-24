import { createUser, findUserById } from "../services/userService.js"

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

export const updateUser = async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "User Not Found" });

        const newOverallBudget = Number(req.body.overallBudget ?? user.overallBudget);
        user.overallBudget = newOverallBudget;

        if (req.body.categoryBudgets) {
            const validCategoryBudgets = req.body.categoryBudgets.filter(
                (budget) => budget.category && Number(budget.amount) >= 0
            );

            const newCategoryTotal = validCategoryBudgets.reduce((acc, cat) => acc + Number(cat.amount), 0);

            if (newCategoryTotal > newOverallBudget) {
                return res.status(400).json({
                    success: false,
                    message: `Category budgets total (${newCategoryTotal}) cannot exceed overall budget of ${newOverallBudget}.`
                });
            }
            user.categoryBudgets = validCategoryBudgets.map(c => ({ ...c, amount: Number(c.amount), usedAmount: c.usedAmount || 0 }));
        }

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User Updated Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

