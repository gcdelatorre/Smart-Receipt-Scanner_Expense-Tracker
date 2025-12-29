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

export default function EditTransactionModal({ open, onClose, transactionToEdit, onRefresh }) {
    const [formData, setFormData] = useState({});

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
        const apiEndpoint = isExpense ? `/api/expenses/${transactionToEdit._id}` : `/api/incomes/${transactionToEdit._id}`;

        try {
            const response = await fetch(apiEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                if (onRefresh) {
                    onRefresh();
                }
                onClose();
            } else {
                // Handle error
                const errorData = await response.json();
                console.error("Failed to update transaction:", errorData.message);
                // Optionally, display an error message to the user
            }
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div>
                        <label htmlFor="amount" className="text-sm font-medium text-slate-700">Amount</label>
                        <Input type="number" name="amount" id="amount" value={formData.amount || ''} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="category" className="text-sm font-medium text-slate-700">Category</label>
                        <Input type="text" name="category" id="category" value={formData.category || ''} onChange={handleChange} />
                    </div>

                    {isExpense && (
                        <div>
                            <label htmlFor="store" className="text-sm font-medium text-slate-700">Store</label>
                            <Input type="text" name="store" id="store" value={formData.store || ''} onChange={handleChange} />
                        </div>
                    )}

                    <div>
                        <label htmlFor="description" className="text-sm font-medium text-slate-700">Note</label>
                        <textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} rows="3" className="flex w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"></textarea>
                    </div>

                    <div>
                        <label htmlFor="date" className="text-sm font-medium text-slate-700">Date</label>
                        <Input type="date" name="date" id="date" value={formData.date || ''} onChange={handleChange} />
                    </div>


                    <DialogFooter className="grid grid-cols-2 gap-2">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
