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

        const existingCategoryTotal = user.categoryBudgets.reduce((acc, cat) => acc + cat.amount, 0);

        const newCategoryTotal = (req.body.categoryBudgets || []).reduce((acc, cat) => acc + Number(cat.amount), 0);

        if (existingCategoryTotal + newCategoryTotal > newOverallBudget) {
            return res.status(400).json({
                success: false,
                message: `Cannot add categories. Total would exceed overall budget of ${newOverallBudget}.`
            });
        }

        user.overallBudget = newOverallBudget

        if (req.body.categoryBudgets) {
            user.categoryBudgets.push(...req.body.categoryBudgets.map(c => ({ ...c, amount: Number(c.amount) })));
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

