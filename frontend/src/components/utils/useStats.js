import { ArrowUpRight, ArrowDownRight, PiggyBank, TrendingUp, Wallet, ArrowDown, CircleSlash, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTransactions } from "./fetchTransaction";

export function useStats() {
    const [incomeStats, setIncomeStats] = useState([]);
    const [expenseStats, setExpenseStats] = useState([]);

    const refresh = async () => {
        const res1 = await fetch("/api/income").then(r => r.json());
        const res2 = await fetch("/api/expenses").then(r => r.json());

        setIncomeStats(res1.data);
        setExpenseStats(res2.data);
    };

    useEffect(() => {
        refresh();
        fetchTransactions()
    }, [refresh]);

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

    // total expense this month
    const totalExpenseThisMonth = expenseStats
        .filter(exp => new Date(exp.date) >= startOfThisMonth && new Date(exp.date) <= endOfThisMonth)
        .reduce((acc, exp) => acc + exp.amount, 0);

    // total expense last month
    const totalExpenseLastMonth = expenseStats
        .filter(exp => new Date(exp.date) >= startOfLastMonth && new Date(exp.date) <= endOfLastMonth)
        .reduce((acc, exp) => acc + exp.amount, 0);

    // compare
    const change = totalExpenseLastMonth === 0
        ? 100
        : ((totalExpenseThisMonth - totalExpenseLastMonth) / totalExpenseLastMonth) * 100;

    // declare label
    const changeLabel = `${change >= 0 ? "+" : ""}${change.toFixed(1)}% from last month`;


    // total income this month
    const totalIncomeThisMonth = incomeStats
        .filter(inc => new Date(inc.date) >= startOfThisMonth && new Date(inc.date) < endOfThisMonth)
        .reduce((acc, inc) => acc + inc.amount, 0);

    const incomeProgress = totalIncomeThisMonth
        ? Math.max(((totalIncomeThisMonth - totalExpenseThisMonth) / totalIncomeThisMonth) * 100, 0)
        : 0;

    // determine if it has data
    const hasExpense = totalExpenseThisMonth > 0
    const hasIncome = totalIncomeThisMonth > 0
    const hasData = hasExpense || hasIncome

    const defaultLabel = "No data yet"
    const defaultVariant = "secondary"
    const defaultProgressColor = "bg-gray-300"

    const stats = [
        {
            title: "Total Balance",
            value: `$${totalBalance.toFixed(2)}`,
            changeLabel: hasData ? changeLabel : defaultLabel,
            changeVariant: hasData ? (change >= 0 ? "success" : "destructive") : defaultVariant,
            changeIcon: hasData ? (change >= 0 ? ArrowUpRight : ArrowDownRight) : CircleSlash,
            icon: PiggyBank,
            accent: "bg-indigo-50 text-indigo-700",
            progress: change,
            progressColor: hasData ? (change >= 30 ? "bg-indigo-500" : "bg-rose-500") : defaultProgressColor,
        },
        {
            title: "Monthly Income",
            value: `$${totalIncomeThisMonth.toFixed(2)}`,
            changeLabel: hasIncome ? (incomeProgress >= 30 ? "On track" : "Income nearly used") : defaultLabel,
            changeVariant: hasIncome ? (incomeProgress >= 30 ? "default" : "destructive") : defaultVariant,
            changeIcon: hasIncome ? (incomeProgress >= 30 ? ArrowUpRight : ArrowDownRight) : CircleSlash,
            icon: TrendingUp,
            accent: "bg-green-50 text-green-700",
            progress: incomeProgress,
            progressColor: hasIncome ? (incomeProgress >= 30 ? "bg-green-500" : "bg-rose-500") : defaultProgressColor,
        },
        {
            title: "Monthly Expenses",
            value: `$${totalExpenseThisMonth.toFixed(2)}`,
            changeLabel: `${totalExpenseThisMonth} vs budget`,
            changeVariant: "destructive",
            changeIcon: ArrowDownRight,
            icon: Wallet,
            accent: "bg-rose-50 text-rose-700",
            progress: 46,
            progressColor: "bg-rose-500",
        },
    ];

    return { stats, refresh }
}

