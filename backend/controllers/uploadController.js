import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractTextFromImage, categorizeExpense } from "../services/gemini.js";
import { createExpense } from '../services/expenseService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

export const createExpenseWithUpload = async (req, res) => {
    try {
        const filePath = req.file.path;

        const text = await extractTextFromImage(filePath);
        const structured = await categorizeExpense(text);

        const newExpense = await createExpense({ ...structured, imageUrl: `/uploads/${req.file.filename}`, userId: "64c1f0f9a4f12b3a5e123456"}) 
                                                                                                            // hardcoded userId for now
                                                                                                            // will add userId after i added user models or user accounts
                                                                                                            // and with authentication to input valid id
                                                                                                            // so that it can determine whose this expense if its theirs
        return res.json({
            success: true,
            data: newExpense
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export { upload };
