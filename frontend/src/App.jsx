import { ArrowDownRight, ArrowUpRight, BarChart3, LayoutDashboard, PiggyBank, Receipt, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AddEntryModal from "./components/AddEntryModal";
import TransactionsPage from "./pages/Transactions";
import AnalyticsPage from "./pages/Analytics";
import { Card, CardContent } from "./components/ui/card";
import Sidebar from "./components/layout/Sidebar";
import HeaderBar from "./components/layout/HeaderBar";
import MobileNav from "./components/layout/MobileNav";
import StatsGrid from "./components/dashboard/StatsGrid";
import BudgetsCard from "./components/dashboard/BudgetsCard";
import SpendingChart from "./components/dashboard/SpendingChart";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Transactions", icon: Receipt, path: "/transactions" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
];

const stats = [
  {
    title: "Total Balance",
    value: "$0.00",
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

const budgets = [
  { label: "Groceries", used: 350, total: 500, color: "bg-indigo-500" },
  { label: "Entertainment", used: 190, total: 200, color: "bg-amber-500" },
  { label: "Transportation", used: 50, total: 150, color: "bg-green-500" },
];

const chartPoints = [
  { day: "Mon", value: 1100 },
  { day: "Tue", value: 1650 },
  { day: "Wed", value: 1500 },
  { day: "Thu", value: 2450 },
  { day: "Fri", value: 1800 },
  { day: "Sat", value: 3200 },
  { day: "Sun", value: 2700 },
];

export default function App() {
  const [showAdd, setShowAdd] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = (path) => (path === "/" ? pathname === "/" : pathname.startsWith(path));
  const pageTitle =
    pathname === "/transactions"
      ? "Transactions"
      : pathname === "/analytics"
        ? "Analytics"
        : "Dashboard";

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-slate-900">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Sidebar navItems={navItems} isActive={isActive} />

        <main className="flex-1 space-y-6 pb-20 lg:pb-6">
          <HeaderBar pageTitle={pageTitle} onAdd={() => setShowAdd(true)} />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <StatsGrid stats={stats} />

                  <div className="grid gap-5 lg:grid-cols-12">
                    <Card className="lg:col-span-8">
                      <CardContent className="pt-6">
                        <SpendingChart data={chartPoints} />
                      </CardContent>
                    </Card>

                    <BudgetsCard budgets={budgets} />
                  </div>
                </>
              }
            />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <AddEntryModal open={showAdd} onClose={() => setShowAdd(false)} />
      <MobileNav navItems={navItems} isActive={isActive} />
    </div>
  );
}
