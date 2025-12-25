import { Button } from "./ui/button";
import { ArrowUpRight, ArrowDownRight, ReceiptText } from "lucide-react";

export default function ViewTransactionModal({ open, onClose, transactionToView }) {

    const formattedDate = (dateStr) => {
        const d = new Date(dateStr);
        const options = { month: "short", day: "numeric", year: "numeric" };
        return d.toLocaleDateString(undefined, options);
    }

    const formattedItems = (items) => {
        items.map((items) => items.name).join(", ");
    }

    if (!open) return null;

    const handleDelete = async () => {
        try {
            await fetch(`/api/expenses/${transactionToView._id}`, {
                method: "DELETE",
            })

            onClose()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
                <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Transaction Details</h2>
                        <Button variant="secondary" size="icon" onClick={onClose}>
                            ✕
                        </Button>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${transactionToView.transactionType === "income" ? "bg-green-100" : "bg-rose-100"}`}>
                                {transactionToView.transactionType === "income" ? <ArrowUpRight variant="success" className="h-5 w-5 text-green-500" /> : <ArrowDownRight variant="destructive" className=" text-rose-500 h-5 w-5" />}
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-semibold text-xl">{transactionToView.transactionType === "income" ? "Income" : "Expense"}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-base font-semibold text-slate-700">Category</p>
                            <p className="text-sm text-slate-500">{transactionToView.category || "N/A"}</p>
                        </div>

                        <div>
                            <p className="text-base font-semibold text-slate-700">Amount</p>
                            <p className="text-sm text-slate-500">${transactionToView.amount.toFixed(2)}</p>
                        </div>

                        {transactionToView.transactionType === "expense" && (
                            <>
                                <div>
                                    <p className="text-base font-semibold text-slate-700">Store</p>
                                    <p className="text-sm text-slate-500">{transactionToView.store || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-slate-700">Items</p>
                                    <p className="text-sm text-slate-500">{formattedItems(transactionToView.items) || "N/A"}</p>
                                </div>
                            </>
                        )}

                        <div>
                            <p className="text-sm font-medium text-slate-700">Note</p>
                            <p className="text-sm text-slate-500">{transactionToView.description || "N/A"}</p>
                        </div>

                        <div>
                            <p className="text-base font-semibold text-slate-700">Date</p>
                            <p className="text-sm text-slate-500">{formattedDate(transactionToView.date)}</p>
                        </div>
                    </div>


                    {/* Footer */}
                    <div className="mt-6 flex justify-end gap-2">
                        <Button onClick={onClose}>Edit</Button>
                        <Button variant="secondary" onClick={handleDelete}>Delete</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
