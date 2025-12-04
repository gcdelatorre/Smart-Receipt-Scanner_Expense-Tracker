import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './config/db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import router from './routes/expenseRoutes.js';
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/api/expenses", router)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });


import { extractTextFromImage, categorizeExpense } from "./services/gemini.js";

app.post("/api/expenses/upload", upload.single("image"), async (req, res) => {
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
});


const startServer = async () => {
    try {
        await connectDB();
        console.log("DB Connected");
    } catch (err) {
        console.error("DB connection failed", err.message);
    } finally {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
};
startServer();