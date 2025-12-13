import { Button } from "./ui/button";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function ViewTransactionModal({ open, onClose, selectedTransactionType }) {
    if (!open) return null;


    // placeholder for income are, category, amount, note, date
    // placeholder for expense are, category, amount, store, items, note, date
    // render differently based on transaction type that is passed in as prop from parent transaction page

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

                    {/* Transaction Info Placeholder */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-semibold bg-slate-100 h-4 w-32 rounded"></p>
                                <p className="text-xs text-slate-400 bg-slate-100 h-3 w-24 rounded"></p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-700">Amount</p>
                            <p className="font-semibold bg-slate-100 h-5 w-20 rounded"></p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-700">Store</p>
                            <p className="bg-slate-100 h-4 w-32 rounded"></p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-700">Description</p>
                            <p className="bg-slate-100 h-4 w-full rounded"></p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-700">Note</p>
                            <p className="bg-slate-100 h-4 w-full rounded"></p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex justify-end gap-2">
                        <Button onClick={onClose}>Edit</Button>
                        <Button variant="secondary" onClick={onClose}>Delete</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
