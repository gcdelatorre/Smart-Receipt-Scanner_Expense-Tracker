import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "./ui/dialog";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import api from "../services/api";
import { activateToast } from "./Toast/ActivateToast";
import { useCurrency } from "../hooks/useCurrency";

export default function ViewTransactionModal({ open, onClose, transactionToView, onRefresh, onEdit }) {

    const { format } = useCurrency();

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
        const apiEndpoint = transactionToView.transactionType === 'expense' ? `/expenses/${transactionToView._id}` : `/income/${transactionToView._id}`;
        try {
            await api.delete(apiEndpoint);
            onClose();
            if (onRefresh) {
                onRefresh();
            }
            activateToast("success", "Transaction deleted successfully");
        } catch (err) {
            activateToast("error", "Failed to delete transaction. Please try again.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-card text-card-foreground border-border">
                <DialogHeader>
                    <DialogTitle className="text-foreground">Transaction Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${transactionToView.transactionType === "income" ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"}`}>
                            {transactionToView.transactionType === "income" ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownRight className="h-6 w-6" />}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{transactionToView.transactionType === "income" ? "Income" : "Expense"}</p>
                            <p className="text-2xl font-bold text-foreground">{format(transactionToView.amount)}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 px-1">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Category</p>
                            <p className="text-sm font-medium text-foreground mt-1">{transactionToView.category || "N/A"}</p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Date</p>
                            <p className="text-sm font-medium text-foreground mt-1">{formattedDate(transactionToView.date)}</p>
                        </div>

                        {transactionToView.transactionType === "expense" && (
                            <div className="col-span-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Store</p>
                                <p className="text-sm font-medium text-foreground mt-1">{transactionToView.store || "N/A"}</p>
                            </div>
                        )}

                        {transactionToView.description && (
                            <div className="col-span-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Note</p>
                                <p className="text-sm font-medium text-foreground mt-1 leading-relaxed">{transactionToView.description}</p>
                            </div>
                        )}

                        {transactionToView.transactionType === "expense" && transactionToView.items && transactionToView.items.length > 0 && (
                            <div className="col-span-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Items</p>
                                <p className="text-sm font-medium text-foreground mt-1">{formattedItems(transactionToView.items)}</p>
                            </div>
                        )}
                    </div>
                </div>


                <DialogFooter className="grid grid-cols-2 gap-3 pt-6 border-t border-border">
                    <Button variant="ghost" onClick={handleDelete} className="text-destructive hover:bg-destructive/10">Delete</Button>
                    <Button onClick={onEdit} className="rounded-xl">Edit Details</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
