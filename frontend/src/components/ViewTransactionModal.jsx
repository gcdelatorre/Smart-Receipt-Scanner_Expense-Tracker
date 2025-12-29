import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "./ui/dialog";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function ViewTransactionModal({ open, onClose, transactionToView, onRefresh, onEdit }) {

    const formattedDate = (dateStr) => {
        const d = new Date(dateStr);
        const options = { month: "short", day: "numeric", year: "numeric" };
        return d.toLocaleDateString(undefined, options);
    }

    const formattedItems = (items) => {
        if (!items || items.length === 0) return "N/A";
        return items.map((item) => item.name).join(", ");
    }

    if (!open || !transactionToView) return null;

    const handleDelete = async () => {
        const apiEndpoint = transactionToView.transactionType === 'expense' ? `/api/expenses/${transactionToView._id}` : `/api/incomes/${transactionToView._id}`;
        try {
            await fetch(apiEndpoint, {
                method: "DELETE",
            })

            onClose()
            if (onRefresh) {
                onRefresh();
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-3 py-4">
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
                            {transactionToView.items && transactionToView.items.length > 0 &&
                                <div>
                                    <p className="text-base font-semibold text-slate-700">Items</p>
                                    <p className="text-sm text-slate-500">{formattedItems(transactionToView.items)}</p>
                                </div>
                            }
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


                <DialogFooter className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" onClick={handleDelete}>Delete</Button>
                    <Button onClick={onEdit}>Edit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
