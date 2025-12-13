import { Card, CardContent, CardTransactionHistory } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Receipt, PlusCircle, ArrowUpRight, ArrowDownRight, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTransactions } from "../components/utils/fetchTransaction";
import SearchTransaction from "../components/ui/SearchTransaction";
import ViewTransactionModal from "../components/ViewTransactionModal";

export default function TransactionsPage({ onRefresh, refreshTrigger, onAdd }) {
    const [transactionData, setTransactionData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTransactionType, setSelectedTransactionType] = useState(null);

    const fetchTransactionData = async () => {
        const data = await fetchTransactions();
        setTransactionData(data);
    };

    useEffect(() => {
        fetchTransactionData();
    }, [refreshTrigger]);

    const sortedTransactions = [...transactionData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        const options = { month: "short", day: "numeric", year: "numeric" };
        return d.toLocaleDateString(undefined, options);
    };

    const transactionElements = sortedTransactions.map((transaction) => {
        const isIncome = transaction.transactionType === "income";
        const amountColor = isIncome ? "text-green-500" : "text-rose-500";
        const Icon = isIncome ? ArrowUpRight : ArrowDownRight;

        return (
            <Card
                key={transaction._id || transaction.id}
                className="mb-2 pt-2 hover:bg-slate-50 transition cursor-pointer"
            >
                <CardTransactionHistory className="flex justify-between items-center">
                    <div className="flex items-center content-center gap-3">
                        {/* Icon */}
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${isIncome
                                ? "bg-green-100 text-green-500"
                                : "bg-rose-100 text-rose-500"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col">
                            <p className="text-medium font-medium">
                                {transaction.category || "Transaction"}
                            </p>
                            <p className="text-xs text-slate-400">
                                {formatDate(transaction.date)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className={`font-semibold ${amountColor}`}>
                            {isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </p>
                        <button onClick={() => {
                            setShowModal(true)
                            setSelectedTransactionType(transaction.transactionType)
                        }}>
                            <ChevronRight className="h-5 w-5 text-slate-900" />
                        </button>
                    </div>
                </CardTransactionHistory>
            </Card>
        );
    });

    return (
        <>
            <SearchTransaction />
            <div className="max-w-5xl mx-auto">
                {/* Overview Header */}
                <div className="space-y-1 mb-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                        Overview
                    </p>
                    <h1 className="text-2xl font-semibold text-slate-900 leading-snug">
                        Transactions
                    </h1>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Recent activity across your accounts.
                    </p>
                </div>

                {/* Transactions List */}
                {transactionData.length > 0 ? (
                    <div>{transactionElements}</div>
                ) : (
                    <Card className="border-dashed border-slate-200 bg-slate-50">
                        <CardContent className="flex flex-col items-center gap-3 text-sm text-slate-600 py-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 mb-2">
                                <Receipt className="h-6 w-6" />
                            </div>
                            <p className="text-lg font-semibold text-slate-800 text-center">
                                No recent transactions
                            </p>
                            <p className="text-center max-w-md">
                                You haven’t added any income or expenses yet. Add a new entry to
                                start tracking.
                            </p>
                            <Button className="rounded-xl px-4 mt-3" disabled>
                                <PlusCircle className="h-5 w-5" />
                                Add a transaction
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            <ViewTransactionModal
                open={showModal}
                onClose={() => setShowModal(false)}
                selectedTransactionType={selectedTransactionType}
            />
        </>
    );
}