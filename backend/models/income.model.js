import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    amount: { type: Number },
    category: { type: String },
    description: { type: String },
    transactionType: { type: String, default: "income" },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Income", incomeSchema);