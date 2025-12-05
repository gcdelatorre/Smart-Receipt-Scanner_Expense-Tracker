import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractTextFromImage, categorizeExpense } from "../services/gemini.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

export const uploadExpense = async (req, res) => {
    try {
        const filePath = req.file.path;

        const text = await extractTextFromImage(filePath);
        const structured = await categorizeExpense(text);

        return res.json({
            success: true,
            receiptText: text,
            extracted: structured,
            imageUrl: `/uploads/${req.file.filename}`
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export { upload };
