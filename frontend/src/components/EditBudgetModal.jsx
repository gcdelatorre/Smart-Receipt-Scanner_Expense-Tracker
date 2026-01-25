import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import api from "../services/api";
import { activateToast } from "./Toast/ActivateToast";

export default function EditBudgetModal({ open, onClose, categoryBudgets, overallBudget, onUpdate }) {
    const [payload, setPayload] = useState([]);
    const [editableOverallBudget, setEditableOverallBudget] = useState(0);

    // When modal opens, populate payload with current budgets
    useEffect(() => {
        if (open && categoryBudgets) {
            setPayload(categoryBudgets.map(b => ({ ...b })));
            setEditableOverallBudget(overallBudget || 0);
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
        try {
            await api.put('/user/budget', {
                overallBudget: editableOverallBudget,
                categoryBudgets: payload
            });

            onUpdate(); // Trigger data refresh in parent
            onClose();  // Close modal on success
            activateToast("success", "Budget updated successfully");
        } catch (err) {
            activateToast("error", err.response?.data?.message || "Failed to update budgets.");
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl p-6 text-card-foreground">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground">Edit Budgets</h2>
                    <p className="text-sm text-muted-foreground">Modify your existing budget allocations.</p>
                </div>

                <div className="space-y-5">
                    {/* Overall Budget Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">Overall Monthly Budget</label>
                        <input
                            type="number"
                            value={editableOverallBudget}
                            onChange={(e) => setEditableOverallBudget(Number(e.target.value))}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>

                    <div className="h-px bg-border" />

                    {/* Category Budgets */}
                    <div className="max-h-[300px] overflow-y-auto pr-1 space-y-4">
                        {payload.map((budget, index) => (
                            <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3 p-3 rounded-xl bg-muted/20 border border-border/50">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">Category</label>
                                    <input
                                        type="text"
                                        value={budget.category}
                                        onChange={(e) => handleCategoryChange(index, "category", e.target.value)}
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">Amount</label>
                                    <input
                                        type="number"
                                        value={budget.amount}
                                        onChange={(e) => handleCategoryChange(index, "amount", e.target.value)}
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                                <Button variant="ghost" size="icon" className="mb-0.5 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(index)}>
                                    <span className="text-lg">&#x2715;</span>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-border pt-6">
                    <Button variant="ghost" onClick={onClose} className="rounded-xl">Cancel</Button>
                    <Button onClick={handleSubmit} className="rounded-xl px-6">Save Changes</Button>
                </div>
            </div>
        </div>
    );
}
