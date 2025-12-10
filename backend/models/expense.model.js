import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    store: { type: String },
    amount: { type: Number },
    category: { type: String },
    items: { type: Array },
    description: { type: String },
    transactionType: { type: String, default: "expense" },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);