import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: false },
    overallBudget: { type: Number, default: 0 },
    categoryBudgets: {
        type: Array,
        default: []
    },
    lastBudgetReset: { type: Date, default: Date.now },
    settingsPreferences: {
        currency: { type: String, default: "USD" },
        dateFormat: { type: String, default: "MM/DD/YYYY" },
        numberFormat: { type: String, default: "Standard" },
        privacyMode: { type: Boolean, default: false }
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);