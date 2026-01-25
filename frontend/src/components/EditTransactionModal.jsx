import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import api from "../services/api";
import { activateToast } from "./Toast/ActivateToast";

export default function EditTransactionModal({ open, onClose, transactionToEdit, onRefresh }) {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (transactionToEdit) {
            // Format date to YYYY-MM-DD for the input field
            const date = new Date(transactionToEdit.date);
            const formattedDate = date.toISOString().split('T')[0];

            setFormData({
                ...transactionToEdit,
                date: formattedDate,
            });
        }
    }, [transactionToEdit]);


    if (!open || !transactionToEdit) return null;

    const isExpense = transactionToEdit.transactionType === 'expense';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const apiEndpoint = isExpense ? `/expenses/${transactionToEdit._id}` : `/income/${transactionToEdit._id}`;

        try {
            // Convert amount to number
            const submitData = {
                ...formData,
                amount: Number(formData.amount)
            };

            await api.put(apiEndpoint, submitData);
            if (onRefresh) {
                onRefresh();
            }
            onClose();
            activateToast("success", "Transaction updated successfully");
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "An error occurred while updating the transaction";
            activateToast("error", errorMessage);
            console.error("Error submitting form:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">

                    <div className="space-y-1.5">
                        <label htmlFor="amount" className="text-sm font-semibold text-foreground">Amount</label>
                        <Input type="number" name="amount" id="amount" value={formData.amount || ''} onChange={handleChange} className="bg-background border-border h-11" />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="category" className="text-sm font-semibold text-foreground">Category</label>
                        <Input type="text" name="category" id="category" value={formData.category || ''} onChange={handleChange} className="bg-background border-border h-11" />
                    </div>

                    {isExpense && (
                        <div className="space-y-1.5">
                            <label htmlFor="store" className="text-sm font-semibold text-foreground">Store</label>
                            <Input type="text" name="store" id="store" value={formData.store || ''} onChange={handleChange} className="bg-background border-border h-11" />
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label htmlFor="description" className="text-sm font-semibold text-foreground">Note</label>
                        <textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} rows="3" className="flex w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"></textarea>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="date" className="text-sm font-semibold text-foreground">Date</label>
                        <Input type="date" name="date" id="date" value={formData.date || ''} onChange={handleChange} className="bg-background border-border h-11" />
                    </div>


                    <DialogFooter className="grid grid-cols-2 gap-3 pt-4">
                        <Button variant="ghost" type="button" onClick={onClose} disabled={loading} className="rounded-xl">Cancel</Button>
                        <Button type="submit" disabled={loading} className="rounded-xl">{loading ? "Saving..." : "Save Changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
