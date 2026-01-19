import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function EditBudgetModal({ open, onClose, categoryBudgets, overallBudget, onUpdate }) {
    const [payload, setPayload] = useState([]);
    const [editableOverallBudget, setEditableOverallBudget] = useState(0);
    const [error, setError] = useState(null);

    // When modal opens, populate payload with current budgets
    useEffect(() => {
        if (open && categoryBudgets) {
            setPayload(categoryBudgets.map(b => ({ ...b })));
            setEditableOverallBudget(overallBudget || 0);
            setError(null); // Reset error on open
        }
    }, [open, categoryBudgets, overallBudget]);

    const handleCategoryChange = (index, field, value) => {
        const updated = [...payload];
        updated[index][field] = field === "amount" ? Number(value) : value;
        setPayload(updated);
    };

    const handleDelete = (index) => {
        const updated = [...payload];
        updated.splice(index, 1);
        setPayload(updated);
    }

    const handleSubmit = async () => {
        setError(null);
        try {
            await api.put('/user/budget', {
                overallBudget: editableOverallBudget,
                categoryBudgets: payload
            });
            
            onUpdate(); // Trigger data refresh in parent
            onClose();  // Close modal on success
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update budgets.');
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-6">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Edit Budgets</h2>
                </div>

                <div className="space-y-4">
                    {/* Overall Budget Input */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Overall Budget</label>
                        <input
                            type="number"
                            value={editableOverallBudget}
                            onChange={(e) => setEditableOverallBudget(Number(e.target.value))}
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Category Budgets */}
                    {payload.map((budget, index) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Category</label>
                                <input
                                    type="text"
                                    value={budget.category}
                                    onChange={(e) => handleCategoryChange(index, "category", e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Amount</label>
                                <input
                                    type="number"
                                    value={budget.amount}
                                    onChange={(e) => handleCategoryChange(index, "amount", e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 w-5 " onClick={() => handleDelete(index)}>
                                &#x2715;
                            </Button>
                        </div>
                    ))}
                </div>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </div>
            </div>
        </div>
    );
}
