import { Card, CardContent, CardTransactionHistory } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "../components/ui/select";
import { Receipt, ArrowUpRight, ArrowDownRight, ChevronRight, ArrowUpDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import SearchTransaction from "../components/ui/SearchTransaction";
import ViewTransactionModal from "../components/ViewTransactionModal";
import EditTransactionModal from "../components/EditTransactionModal";
import api from "../services/api";

export default function TransactionsPage({ onRefresh, refreshTrigger, onAdd }) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState(undefined);
    const [order, setOrder] = useState(undefined);
    const [filter, setFilter] = useState(undefined);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showViewModal, setShowViewModal] = useState(false);
    const [transactionToViewId, setTransactionToViewId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState(null);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("/transactions", {
                params: { page, limit, sortBy, order, filter }
            })
            if (response.data.success) {
                setTransactions(response.data.data)
                setTotalPages(response.data.pagination.totalPages)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }, [page, limit, sortBy, order, filter]);

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions, refreshTrigger])

    const handleRefresh = useCallback(() => {
        fetchTransactions();
        if (onRefresh) onRefresh();
    }, [fetchTransactions, onRefresh]);

    const transactionToView = transactions.find(t => t._id === transactionToViewId);

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        const options = { month: "short", day: "numeric", year: "numeric" };
        return d.toLocaleDateString(undefined, options);
    };

    const handleOpenEditModal = (transaction) => {
        setTransactionToEdit(transaction);
        setShowEditModal(true);
    };

    const toggleOrder = () => {
        setOrder(prev => prev === "asc" ? "desc" : "asc");
    };

    const transactionElements = transactions.map((transaction) => {
        const isIncome = transaction.transactionType === "income";
        const amountColor = isIncome ? "text-green-500" : "text-rose-500";
        const Icon = isIncome ? ArrowUpRight : ArrowDownRight;

        return (
            <Card
                key={transaction._id || transaction.id}
                className="mb-2 pt-2 hover:bg-secondary/50 transition cursor-pointer shadow-sm shadow-black/5"
            >
                <CardTransactionHistory className="flex justify-between items-center">
                    <div className="flex items-center content-center gap-3">
                        {/* Icon */}
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${isIncome
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-rose-500/10 text-rose-600"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col">
                            <p className="text-medium font-medium text-foreground">
                                {transaction.category || "Transaction"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {formatDate(transaction.date)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className={`font-semibold ${amountColor}`}>
                            {isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </p>
                        <button onClick={() => {
                            setShowViewModal(true)
                            setTransactionToViewId(transaction._id)
                        }}>
                            <ChevronRight className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                            Overview
                        </p>
                        <h1 className="text-2xl font-semibold text-foreground leading-snug">
                            Transactions
                        </h1>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Recent activity across your accounts.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">

                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="w-[140px] h-10 bg-card">
                                <SelectValue placeholder="Filter by Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expense</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[120px] h-10 bg-card">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="createdAt">Date</SelectItem>
                                    <SelectItem value="amount">Amount</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 bg-card"
                            onClick={toggleOrder}
                            title={order === "asc" ? "Ascending" : "Descending"}
                        >
                            <ArrowUpDown className={`h-4 w-4 transition-transform ${order === "asc" ? "rotate-180" : ""}`} />
                        </Button>
                    </div>
                </div>

                {/* Transactions List */}
                {transactions.length > 0 ? (
                    <div className="space-y-4">
                        <div>{transactionElements}</div>

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between pt-4 pb-8">
                            <Button
                                variant="outline"
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="w-24"
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-slate-500">
                                Page {page} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="w-24"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
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
                        </CardContent>
                    </Card>
                )}
            </div>

            <ViewTransactionModal
                open={showViewModal}
                onClose={() => {
                    setShowViewModal(false);
                    setTransactionToViewId(null);
                }}
                transactionToView={transactionToView}
                onRefresh={handleRefresh}
                onEdit={() => handleOpenEditModal(transactionToView)}
            />

            <EditTransactionModal
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
                transactionToEdit={transactionToEdit}
                onRefresh={handleRefresh}
            />
        </>
    );
}