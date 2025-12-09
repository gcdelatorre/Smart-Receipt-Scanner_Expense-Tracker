import { ArrowUpRight, ArrowDownRight, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export function useStats() {
    const [incomeStats, setIncomeStats] = useState([]);
    const [expenseStats, setExpenseStats] = useState([]);

    useEffect(() => {
        fetch("/api/income").then(res => res.json()).then(data => setIncomeStats(data.data));
        fetch("/api/expenses").then(res => res.json()).then(data => setExpenseStats(data.data));
    }, []);

    const totalExpense = expenseStats.reduce((acc, expense) => acc + expense.amount, 0);
    const totalIncome = incomeStats.reduce((acc, income) => acc + income.amount, 0)
    const totalBalance = totalIncome - totalExpense;

    const stats = [
        {
            title: "Total Balance",
            value: `$${totalBalance.toFixed(2)}`,
            changeLabel: "+2.5% from last month",
            changeVariant: "success",
            changeIcon: ArrowUpRight,
            icon: PiggyBank,
            accent: "bg-indigo-50 text-indigo-700",
            progress: 62,
            progressColor: "bg-indigo-500",
        },
        {
            title: "Monthly Income",
            value: "$0.00",
            changeLabel: "On track",
            changeVariant: "default",
            changeIcon: ArrowUpRight,
            icon: TrendingUp,
            accent: "bg-green-50 text-green-700",
            progress: 82,
            progressColor: "bg-green-500",
        },
        {
            title: "Monthly Expenses",
            value: "$0.00",
            changeLabel: "-$0 vs budget",
            changeVariant: "destructive",
            changeIcon: ArrowDownRight,
            icon: Wallet,
            accent: "bg-rose-50 text-rose-700",
            progress: 46,
            progressColor: "bg-rose-500",
        },
    ];

    return stats
}

