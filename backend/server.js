import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './config/db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import Expense from './models/expense.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create expense route
app.post("/", async (req, res) => {
  const { store, amount, category, items, date, userId, imageUrl } = req.body;
  try {
    const newExpense = await Expense.create({
      store, amount, category, items, date, userId, imageUrl
    });
    res.status(200).json({
      success: true,
      data: newExpense,
      message: "Expense Created Successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Connected to Port ${PORT}`);
});
