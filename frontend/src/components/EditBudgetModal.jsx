import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function EditBudgetModal({ open, onClose, categoryBudgets }) {
    const [payload, setPayload] = useState([]);

    // When modal opens, populate payload with current budgets
    useEffect(() => {
        if (open && categoryBudgets) {
            setPayload(categoryBudgets.map(b => ({ ...b })));
        }
    }, [open, categoryBudgets]);

    const handleChange = (index, field, value) => {
        const updated = [...payload];
        updated[index][field] = field === "amount" ? Number(value) : value;
        setPayload(updated);
    };

    const handleSubmit = async () => {
        // Do your API call or state update here with `payload
        console.log("Updated budgets:", payload);

        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Edit Budgets</h2>
                    <Button variant="secondary" size="icon" onClick={onClose}>✕</Button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    {payload.map((budget, index) => (
                        <div key={budget.category} className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Category</label>
                                <input
                                    type="text"
                                    value={budget.category}
                                    onChange={(e) => handleChange(index, "category", e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Amount</label>
                                <input
                                    type="number"
                                    value={budget.amount}
                                    onChange={(e) => handleChange(index, "amount", e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </div>
            </div>
        </div>
    );
}
