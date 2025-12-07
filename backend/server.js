import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './config/db.js';

import ExpenseRouter from './routes/expenseRoutes.js';
import IncomeRouter from './routes/incomeRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/api/expenses", ExpenseRouter)
app.use("/api/income", IncomeRouter)

    
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