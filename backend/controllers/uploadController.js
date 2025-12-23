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
        const user = await User.findById("693aec9c08d1f6edd4c2ad5f");
        if (!user) return res.status(404).json({ success: false, message: "User Not Found" });

        const categoryBudget = user.categoryBudgets.find(cat => cat.category === category);

        if (!categoryBudget) {
            const newExpense = await createExpense({ ...structured, imageUrl: `/uploads/${req.file.filename}`, userId: "693aec9c08d1f6edd4c2ad5f" })
            // hardcoded userId for now
            // will add userId after i added user models or user accounts
            // and with authentication to input valid id
            // so that it can determine whose this expense if its theirs
            return res.json({
                success: true,
                data: newExpense
            });
        }

        if (categoryBudget.usedAmount + expenseAmount > categoryBudget.amount) {
            return res.status(400).json({
                success: false,
                message: `Expense exceeds budget for category: ${category}`
            });
        }

        await User.updateOne(
            { _id: "693aec9c08d1f6edd4c2ad5f", "categoryBudgets.category": category },
            { $inc: { "categoryBudgets.$.usedAmount": expenseAmount } }
        );

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export { upload };
