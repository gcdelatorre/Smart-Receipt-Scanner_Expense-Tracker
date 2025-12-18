import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wallet, DollarSign, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import CategorySelection from "./CategorySelection";
import { categories } from "./utils/categories";
import { Description } from "@radix-ui/react-dialog";

/* =====================================================
   ADD INCOME MODAL
===================================================== */
export function AddIncomeModal({ open, onOpenChange }) {

    const [categoriesSelection, setCategoriesSelection] = useState([])
    const [payload, setPayload] = useState({
        amount: "",
        category: "",
        description: "",
        date: ""
    })

    const handleChange = (e) => {
        setPayload(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const notEmpty = !payload.amount || !payload.category || !payload.date

    const handleSubmit = async () => {

        if (!payload.amount || !payload.category || !payload.date) {
            return // maybe add an toast component soon
        }

        try {
            const res = await fetch("/api/income/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!res.ok) {
                console.log("something went wrong")
            }

            setPayload({ amount: "", category: "", description: "", date: "" })
            onOpenChange(false)

        } catch (err) {
            console.log(err) // maybe add an toast component soon
        }
    }

    useEffect(() => {
        setCategoriesSelection(categories)
    }, [])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [&>button[data-state]]:hidden">
                <DialogTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-emerald-600" />
                    Add Income
                </DialogTitle>

                <DialogDescription asChild>
                    <form className="space-y-4 pt-4">
                        <Field label="Amount">
                            <Input
                                onChange={handleChange}
                                name="amount"
                                type="number"
                                placeholder="0.00"
                            />
                        </Field>

                        <CategorySelection
                            name="category"
                            categories={categoriesSelection}
                            onChange={handleChange}
                        />

                        <Field label="Date">
                            <Input onChange={handleChange} name="date" type="date" />
                        </Field>

                        <Field label="Note">
                            <Input
                                onChange={handleChange}
                                name="description"
                                placeholder="Optional"
                            />
                        </Field>

                        <Actions submit={handleSubmit} saveLabel="Save Income" notEmpty={notEmpty} onCancel={() => onOpenChange(false)} />
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}


/* =====================================================
   ADD EXPENSE MODAL
===================================================== */
export function AddExpenseModal({ open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [&>button[data-state]]:hidden">
                <DialogTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-rose-600" />
                    Add Expense
                </DialogTitle>

                <DialogDescription asChild>
                    <form className="space-y-4 pt-4">
                        <Field label="Amount">
                            <Input type="number" step="0.01" placeholder="0.00" />
                        </Field>

                        <Field label="Category">
                            <Input placeholder="Food, Transport, Bills" />
                        </Field>

                        <Field label="Store">
                            <Input placeholder="Optional" />
                        </Field>

                        <Field label="Date">
                            <Input type="date" />
                        </Field>

                        <Field label="Receipt">
                            <Input type="file" accept="image/*" />
                        </Field>

                        <Actions onCancel={() => onOpenChange(false)} saveLabel="Save Expense" />
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

/* =====================================================
   ADD BUDGET MODAL
===================================================== */
export function AddBudgetModal({ open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [&>button[data-state]]:hidden">
                <DialogTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                    Set Budget
                </DialogTitle>

                <DialogDescription asChild>
                    <form className="space-y-4 pt-4">
                        <Field label="Overall Budget">
                            <Input type="number" placeholder="Monthly budget" />
                        </Field>

                        <Field label="Category">
                            <Input placeholder="Food, Rent, Utilities" />
                        </Field>

                        <Field label="Amount">
                            <Input type="number" placeholder="0.00" />
                        </Field>

                        <Actions onCancel={() => onOpenChange(false)} saveLabel="Save Budget" />
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

/* =====================================================
   REUSABLE PIECES (LOCAL)
===================================================== */

function Field({ label, children }) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>
            {children}
        </div>
    );
}

function Actions({ onCancel, saveLabel, submit, notEmpty }) {
    return (
        <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" type="button" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
            </Button>
            <Button onClick={submit} disabled={notEmpty}>
                <Save className="mr-2 h-4 w-4" />
                {saveLabel}
            </Button>
        </div>
    );
}
