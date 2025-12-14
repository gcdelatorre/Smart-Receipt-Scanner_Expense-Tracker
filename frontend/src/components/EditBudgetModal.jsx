import { Button } from "./ui/button";

export default function EditBudgetModal({ open, onClose, categoryBudgets }) {

    const categoryElements = categoryBudgets.map((budget) => {
        return (
            <div key={budget.category} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-slate-700">Category</label>
                    <input
                        type="text"
                        placeholder="Category Name"
                        defaultValue={budget.category}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">Amount</label>
                    <input
                        type="number"
                        placeholder="$0.00"
                        defaultValue={budget.amount}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
        );
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Edit Budgets</h2>
                    <Button variant="secondary" size="icon" onClick={onClose}>
                        ✕
                    </Button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    {categoryElements}
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onClose}>Save</Button>
                </div>
            </div>
        </div>
    );
}
