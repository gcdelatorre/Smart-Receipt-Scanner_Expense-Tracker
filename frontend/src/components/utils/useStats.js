import { ArrowUpRight, ArrowDownRight, PiggyBank, TrendingUp, Wallet, ArrowDown, CircleSlash, Circle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { fetchTransactions } from "./fetchTransaction";
import { fetchUserBudget } from "./fetchUser";

export function useStats(refreshTrigger) {
    const [incomeStats, setIncomeStats] = useState([]);
    const [expenseStats, setExpenseStats] = useState([]);
    const [overallBudget, setOverallBudget] = useState(0)

    const refresh = useCallback(async () => {
        const res1 = await fetch("/api/income").then(r => r.json());
        const res2 = await fetch("/api/expenses").then(r => r.json());

        setIncomeStats(res1.data);
        setExpenseStats(res2.data);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await refresh();
            const budget = await fetchUserBudget();
            setOverallBudget(budget);
            await fetchTransactions();
        };

        fetchData();
    }, [refresh, refreshTrigger]);

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

    const expenseProgress = overallBudget
        ? Math.max(((overallBudget - totalExpenseThisMonth) / overallBudget) * 100, 0)
        : 0;

    // percentage for expense spend until budget is hit
    const expensePercentage = overallBudget
        ? Math.min((totalExpenseThisMonth / overallBudget) * 100, 100)
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
            changeLabel: hasExpense ? (`${expensePercentage.toFixed(1)}% of budget used`) : defaultLabel,
            changeVariant: "destructive",
            changeIcon: hasExpense ? ArrowDownRight : CircleSlash,
            icon: Wallet,
            accent: "bg-rose-50 text-rose-700",
            progress: expenseProgress,
            progressColor: hasExpense ? "bg-rose-500" : defaultProgressColor,
        },
    ];

    return { stats, refresh }
}