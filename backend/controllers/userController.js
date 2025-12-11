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

