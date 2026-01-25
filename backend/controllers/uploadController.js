import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractTextFromImage, categorizeExpense } from "../services/gemini.js";
import { createExpense } from '../services/expenseService.js';
import User from '../models/user.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

export const createExpenseFromReceipt = async (req, res) => {
    try {

        const filePath = req.file.path;

        const text = await extractTextFromImage(filePath);
        const structured = await categorizeExpense(text);



        const expenseAmount = Number(structured.amount);
        const category = structured.category;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User Not Found" });

        const categoryBudget = user.categoryBudgets.find(cat => cat.category === category);

        if (categoryBudget) {
            if (categoryBudget.usedAmount + expenseAmount > categoryBudget.amount) {
                return res.status(400).json({
                    success: false,
                    message: `Expense exceeds budget for category: ${category}`
                });
            }

            await User.updateOne(
                { _id: userId, "categoryBudgets.category": category },
                { $inc: { "categoryBudgets.$.usedAmount": expenseAmount } }
            );
        }


        res.json({
            success: true,
            data: structured
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export { upload };
