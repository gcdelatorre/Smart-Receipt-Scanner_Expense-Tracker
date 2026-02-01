import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import helmet from 'helmet';
import { mongoSanitize } from './middleware/mongoSanitize.js';

import ExpenseRouter from './routes/expenseRoutes.js';
import IncomeRouter from './routes/incomeRoutes.js';
import UserRouter from './routes/userRoutes.js';
import AuthRouter from './routes/authRoutes.js';
import TransactionRouter from './routes/transactionRoutes.js';
import ProfileRouter from './routes/profileRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const app = express();

app.set('trust proxy', 1)

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/expenses", ExpenseRouter);
app.use("/api/income", IncomeRouter);
app.use("/api/user", UserRouter);
app.use("/api/transactions", TransactionRouter);
app.use("/api/profile", ProfileRouter);

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