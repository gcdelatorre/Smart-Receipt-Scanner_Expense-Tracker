import { ArrowUpRight, ArrowDownRight, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export function useStats() {
    const [incomeStats, setIncomeStats] = useState([]);
    const [expenseStats, setExpenseStats] = useState([]);

    useEffect(() => {
        fetch("/api/income").then(res => res.json()).then(data => setIncomeStats(data.data));
        fetch("/api/expenses").then(res => res.json()).then(data => setExpenseStats(data.data));
    }, []);

    // process value
    const totalExpense = expenseStats.reduce((acc, expense) => acc + expense.amount, 0);
    const totalIncome = incomeStats.reduce((acc, income) => acc + income.amount, 0)
    const totalBalance = totalIncome - totalExpense;

    // process for labels
    const now = new Date();

    // Current month range
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // last day of this month

    // Last month range
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of last month

    const totalThisMonth = expenseStats
        .filter(exp => new Date(exp.date) >= startOfThisMonth && new Date(exp.date) <= endOfThisMonth)
        .reduce((acc, exp) => acc + exp.amount, 0);

    const totalLastMonth = expenseStats
        .filter(exp => new Date(exp.date) >= startOfLastMonth && new Date(exp.date) <= endOfLastMonth)
        .reduce((acc, exp) => acc + exp.amount, 0);

    const change = totalLastMonth === 0
        ? 100 // or just show "new" 
        : ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;

    const changeLabel = `${change >= 0 ? "+" : ""}${change.toFixed(1)}% from last month`;






    const stats = [
        {
            title: "Total Balance",
            value: `$${totalBalance.toFixed(2)}`,
            changeLabel: changeLabel,
            changeVariant: change >= 0 ? "success" : "destructive" ,
            changeIcon: change >= 0 ? ArrowUpRight : ArrowDownRight,
            icon: PiggyBank,
            accent: "bg-indigo-50 text-indigo-700",
            progress: change,
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

