import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wallet, DollarSign, Save, X, Notebook, Check } from "lucide-react";
import { useState, useEffect } from "react";
import CategorySelection from "./CategorySelection";
import { incomeCategories, expenseCategories } from "./utils/categories";
import { Upload } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { fetchUserBudget } from "./utils/fetchUser";
import api from "../services/api";
import { activateToast } from "./Toast/ActivateToast";

/* =====================================================
   ADD INCOME MODAL
===================================================== */
export function AddIncomeModal({ open, onOpenChange, onIncomeAdded, onBack }) {

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
            activateToast("error", "Please fill in all required fields");
            return
        }

        try {
            await api.post("/income", payload);
            activateToast("success", "Income added successfully");

            setPayload({ amount: "", category: "", description: "", date: "" })
            onOpenChange(false);
            if (onIncomeAdded) {
                onIncomeAdded();
            }

        } catch (err) {
            activateToast("error", "Failed to add income. Please try again.");
        }
    }

    useEffect(() => {
        setCategoriesSelection(incomeCategories)
    }, [])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [&>button[data-state]]:hidden bg-card text-card-foreground border-border">
                <DialogTitle className="flex items-center gap-2 text-foreground">
                    <Wallet className="h-5 w-5 text-emerald-500" />
                    Add Income
                </DialogTitle>

                <DialogDescription asChild>
                    <form className="space-y-4 pt-4" onSubmit={(e) => e.preventDefault()}>
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

                        <Actions submit={handleSubmit} saveLabel="Save" notEmpty={notEmpty} onCancel={onBack} />
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

/* =====================================================
   ADD EXPENSE MODAL
===================================================== */
export function AddExpenseModal({ open, onOpenChange, onExpenseAdded, onBack }) {

    const [categoriesSelection, setCategoriesSelection] = useState([])
    const [payload, setPayload] = useState({
        amount: "",
        store: "",
        category: "",
        description: "",
        date: ""
    })

    const notEmpty = !payload.amount || !payload.category || !payload.date

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
        if (!payload.amount || !payload.category || !payload.date) {
            activateToast("error", "Please fill in all required fields");
            return;
        }

        try {
            await api.post("/expenses", payload);
            activateToast("success", "Expense added successfully");

            setPayload({ amount: "", store: "", category: "", description: "", date: "" })
            onOpenChange(false);
            if (onExpenseAdded) {
                onExpenseAdded();
            }

        } catch (err) {
            activateToast("error", "Failed to add expense. Can't exceed budget.");
        }
    }

    const [receiptFile, setReceiptFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const handleReceiptUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setReceiptFile(file);
        setUploading(true);
        setUploaded(false);

        try {
            const formData = new FormData();
            formData.append("image", file);
            const res = await api.post("/expenses/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { data } = res.data;
            setPayload({
                amount: data.amount,
                store: data.store,
                category: data.category,
                description: data.description,
                date: new Date(data.date).toISOString().split('T')[0]
            });
            setUploaded(true);
            activateToast("success", "Receipt processed successfully");
        } catch (err) {
            activateToast("error", "Failed to process receipt. Please try again.");
        } finally {
            setUploading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [&>button[data-state]]:hidden bg-card text-card-foreground border-border">
                <DialogTitle className="flex items-center gap-2 text-foreground">
                    <DollarSign className="h-5 w-5 text-rose-500" />
                    Add Expense
                </DialogTitle>

                <DialogDescription asChild>
                    <form className="space-y-4 pt-4" onSubmit={(e) => e.preventDefault()}>

                        {/* recept area ui */}
                        <Field label="Automatic Receipt Scanner">
                            <div className="flex flex-col gap-3">
                                {/* Upload area */}
                                <label
                                    htmlFor="receipt"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 px-4 py-6 text-center transition hover:border-primary/50 hover:bg-muted"
                                >
                                    <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                                    <p className="text-sm font-medium text-foreground">
                                        Upload receipt
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG, or JPEG
                                    </p>
                                </label>

                                <input
                                    id="receipt"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleReceiptUpload}
                                />

                                {receiptFile && (
                                    <div className="flex justify-between items-center">
                                        <Button variant="outline" size="sm" className="bg-card text-foreground w-fit justify-center flex content-center pointer-events-none">
                                            {uploading && <Spinner />}
                                            {uploaded && <Check className="text-emerald-500" />}

                                            {uploading && "Processing"}
                                            {uploaded && "Process Complete"}
                                        </Button>
                                        <p className="text-muted-foreground">{uploading && "Please wait..."}</p>
                                    </div>)
                                }

                                {/* OR separator */}
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-border" />
                                    <span className="text-xs font-medium text-muted-foreground">OR</span>
                                    <div className="h-px flex-1 bg-border" />
                                </div>

                                {/* Manual entry hint */}
                                <p className="text-center text-xs text-muted-foreground">
                                    Skip receipt and enter expense details manually
                                </p>
                            </div>
                        </Field>

                        <Field label="Amount">
                            <Input onChange={handleChange} name="amount" type="number" step="0.01" placeholder="0.00" value={payload.amount} />
                        </Field>

                        <CategorySelection
                            name="category"
                            categories={categoriesSelection}
                            onChange={handleChange}
                            value={payload.category}
                        />

                        <Field label="Store">
                            <Input name="store" placeholder="Optional" onChange={handleChange} value={payload.store} />
                        </Field>

                        <Field label="Note">
                            <Input
                                onChange={handleChange}
                                name="description"
                                placeholder="Optional"
                                value={payload.description} />
                        </Field>

                        <Field label="Date">
                            <Input name="date" type="date" onChange={handleChange} value={payload.date} />
                        </Field>

                        <Actions onCancel={onBack} saveLabel="Save" submit={handleSubmit} notEmpty={notEmpty} />
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

/* =====================================================
   ADD BUDGET MODAL
===================================================== */
export function AddBudgetModal({ open, onOpenChange, expenseCategories, onBudgetAdded, onBack }) {

    const [categoriesSelection, setCategoriesSelection] = useState([])
    const [overallBudget, setOverallBudget] = useState(0);
    const [categoryBudgets, setCategoryBudgets] = useState([
        { category: "", amount: 0 },
    ]);

    const notEmpty = !overallBudget || !overallBudget

    useEffect(() => {
        const getUserBudget = async () => {
            const { overallBudget, categoryBudgets } = await fetchUserBudget();
            setOverallBudget(overallBudget || 0);
            if (categoryBudgets && categoryBudgets.length > 0) {
                setCategoryBudgets(categoryBudgets);
            }
        };

        if (open) {
            getUserBudget();
        }
    }, [open]);

    useEffect(() => {
        setCategoriesSelection(expenseCategories)
    }, [expenseCategories])

    const handleOverallBudgetChange = (e) => {
        setOverallBudget(Number(e.target.value))
    }

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

    const handleSubmit = async () => {

        let payload;
        categoryBudgets.length === 0
            ? payload = { overallBudget }
            : payload = { overallBudget, categoryBudgets }

        try {
            await api.put("/user/budget", payload);
            activateToast("success", "Budget updated successfully");

            setOverallBudget(0)
            setCategoryBudgets([{ category: "", amount: 0 },]);
            onOpenChange(false);
            if (onBudgetAdded) {
                onBudgetAdded();
            }

        } catch (err) {
            activateToast("error", "Failed to update budget. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [&>button[data-state]]:hidden bg-card text-card-foreground border-border">
                <DialogTitle className="flex items-center gap-2 text-foreground">
                    <Wallet className="h-5 w-5 text-primary" />
                    Set Budget
                </DialogTitle>

                <form className="space-y-4 pt-4" onSubmit={(e) => e.preventDefault()}>
                    {/* Overall Budget */}
                    <Field label="Overall Budget">
                        <Input
                            type="number"
                            placeholder="Monthly budget"
                            value={overallBudget}
                            onChange={(e) => handleOverallBudgetChange(e)}
                        />
                    </Field>

                    {/* Dynamic Category + Amount rows */}
                    {categoryBudgets.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4">
                            <Field label="Category">
                                <CategorySelection
                                    categories={categoriesSelection}
                                    name={`category-${index}`}
                                    value={item.category}
                                    onChange={(e) => handleCategoryChange(index, e.target.value)}
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
                            onBack();
                            setCategoryBudgets([{ category: "", amount: 0 }]);
                            setOverallBudget(0);
                        }}
                        saveLabel="Save"
                        submit={handleSubmit}
                        notEmpty={notEmpty}
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
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
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
            <Button onClick={submit} disabled={notEmpty} type="button">
                <Save className="mr-2 h-4 w-4" />
                {saveLabel}
            </Button>
        </div>
    );
}
