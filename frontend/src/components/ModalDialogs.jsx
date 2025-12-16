import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wallet, DollarSign, Save, X } from "lucide-react";

/* =====================================================
   ADD INCOME MODAL
===================================================== */
export function AddIncomeModal({ open, onOpenChange }) {
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
                            <Input type="number" step="0.01" placeholder="0.00" />
                        </Field>

                        <Field label="Category">
                            <Input placeholder="Salary, Freelance, Bonus" />
                        </Field>

                        <Field label="Date">
                            <Input type="date" />
                        </Field>

                        <Field label="Note">
                            <Input placeholder="Optional" />
                        </Field>

                        <Actions onCancel={() => onOpenChange(false)} saveLabel="Save Income" />
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
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

function Actions({ onCancel, saveLabel }) {
    return (
        <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" type="button" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
            </Button>
            <Button>
                <Save className="mr-2 h-4 w-4" />
                {saveLabel}
            </Button>
        </div>
    );
}
