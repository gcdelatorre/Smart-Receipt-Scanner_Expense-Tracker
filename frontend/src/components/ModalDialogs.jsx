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
import { incomeCategories, expenseCategories } from "./utils/categories";
import { Upload } from "lucide-react";
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
        setCategoriesSelection(incomeCategories)
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

    const [categoriesSelection, setCategoriesSelection] = useState([])
    const [payload, setPayload] = useState({
        amount: "",
        store: "",
        category: "",
        description: "",
        date: ""
    })

    useEffect(() => {
        setCategoriesSelection(expenseCategories)
    }, [])

    const handleChange = (e) => {
        setPayload(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {
        if (!payload.amount || !payload.category || !payload.date) return;

        try {
            const res = await fetch("/api/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            setPayload({ amount: "", store: "", category: "", description: "", date: "" })
            onOpenChange(false)

        } catch (err) {
            console.log(err) // maybe add an toast component soon
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [&>button[data-state]]:hidden">
                <DialogTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-rose-600" />
                    Add Expense
                </DialogTitle>

                <DialogDescription asChild>
                    <form className="space-y-4 pt-4">

                        {/* recept area ui */}
                        <Field label="Automatic Receipt Scanner">
                            <div className="flex flex-col gap-3">
                                {/* Upload area */}
                                <label
                                    htmlFor="receipt"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-slate-400 hover:bg-slate-100"
                                >
                                    <Upload className="mb-2 h-6 w-6 text-slate-500" />
                                    <p className="text-sm font-medium text-slate-700">
                                        Upload receipt
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        PNG, JPG, or JPEG
                                    </p>
                                </label>

                                <input
                                    id="receipt"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />

                                {/* OR separator */}
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-200" />
                                    <span className="text-xs font-medium text-slate-500">OR</span>
                                    <div className="h-px flex-1 bg-slate-200" />
                                </div>

                                {/* Manual entry hint */}
                                <p className="text-center text-xs text-slate-500">
                                    Skip receipt and enter expense details manually
                                </p>
                            </div>
                        </Field>

                        <Field label="Amount">
                            <Input onChange={handleChange} name="amount" type="number" step="0.01" placeholder="0.00" />
                        </Field>

                        <CategorySelection
                            name="category"
                            categories={categoriesSelection}
                            onChange={handleChange}
                        />

                        <Field label="Store">
                            <Input name="store" placeholder="Optional" onChange={handleChange} />
                        </Field>

                        <Field label="Note">
                            <Input
                                onChange={handleChange}
                                name="description"
                                placeholder="Optional" />
                        </Field>

                        <Field label="Date">
                            <Input name="date" type="date" onChange={handleChange} />
                        </Field>

                        <Actions onCancel={() => onOpenChange(false)} saveLabel="Save Expense" submit={handleSubmit} />
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

/* =====================================================
   ADD BUDGET MODAL
===================================================== */
export function AddBudgetModal({ open, onOpenChange, expenseCategories, onSave }) {
    const [overallBudget, setOverallBudget] = useState(0);
    const [categoryBudgets, setCategoryBudgets] = useState([
        { category: "", amount: 0 },
    ]);

    const handleAddCategory = () => {
        setCategoryBudgets([...categoryBudgets, { category: "", amount: 0 }]);
    };

    const handleCategoryChange = (index, value) => {
        const newCategories = [...categoryBudgets];
        newCategories[index].category = value;
        setCategoryBudgets(newCategories);
    };

    const handleAmountChange = (index, value) => {
        const newCategories = [...categoryBudgets];
        newCategories[index].amount = value;
        setCategoryBudgets(newCategories);
    };

    const handleSave = () => {
        // Send data to backend / Mongoose model
        onSave(overallBudget, categoryBudgets);
        onOpenChange(false); // close modal
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [&>button[data-state]]:hidden">
                <DialogTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                    Set Budget
                </DialogTitle>

                <form className="space-y-4 pt-4" onSubmit={(e) => e.preventDefault()}>
                    {/* Overall Budget */}
                    <Field label="Overall Budget">
                        <Input
                            type="number"
                            placeholder="Monthly budget"
                            value={overallBudget}
                            onChange={(e) => setOverallBudget(Number(e.target.value))}
                        />
                    </Field>

                    {/* Dynamic Category + Amount rows */}
                    {categoryBudgets.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4">
                            <Field label="Category">
                                <CategorySelection
                                    categories={expenseCategories}
                                    name={`category-${index}`}
                                    value={item.category}
                                    onChange={(value) => handleCategoryChange(index, value)}
                                />
                            </Field>

                            <Field label="Amount">
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={item.amount}
                                    onChange={(e) =>
                                        handleAmountChange(index, Number(e.target.value))
                                    }
                                />
                            </Field>
                        </div>
                    ))}

                    <Button type="button" variant="default" onClick={handleAddCategory}>
                        Add Category
                    </Button>

                    <Actions
                        onCancel={() => {
                            onOpenChange(false);
                            setCategoryBudgets([{ category: "", amount: 0 }]);
                            setOverallBudget(0);
                        }}
                        saveLabel="Save Budget"
                        onSave={handleSave}
                    />

                </form>
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
