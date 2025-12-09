import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CircleDot,
  Info,
  LayoutDashboard,
  PiggyBank,
  Plus,
  Receipt,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { Avatar } from "./components/ui/avatar";
import AddEntryModal from "./components/AddEntryModal";
import TransactionsPage from "./pages/Transactions";
import AnalyticsPage from "./pages/Analytics";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

function SpendingTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm text-sm">
      <p className="font-semibold text-slate-900">{item.payload.day}</p>
      <p className="text-slate-600">${item.value.toLocaleString()}</p>
    </div>
  );
}

function SpendingChart() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-slate-800">Spending Analytics</p>
          <p className="text-sm text-slate-500">This Week</p>
        </div>
        <Button variant="secondary" size="sm" className="h-10 rounded-xl">
          This Week
        </Button>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartPoints} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
              width={50}
            />
            <Tooltip content={<SpendingTooltip />} cursor={{ stroke: "#cbd5e1" }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#4338ca" }}
              fill="url(#lineGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, path }) {
  return (
    <Link
      to={path}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-indigo-50 text-indigo-700 shadow-inner"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

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
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6 lg:px-8">
        <aside className="hidden w-64 flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 lg:flex">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <CircleDot className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">Orbit</p>
                <p className="text-xs text-slate-500">Budget &amp; Finance</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  active={isActive(item.path)}
                />
              ))}
            </div>
          </div>

          <Card className="border-0 bg-indigo-600 text-white shadow-lg shadow-indigo-100">
            <CardContent className="flex items-center gap-3 p-4">
              <Avatar className="h-12 w-12 bg-indigo-900 text-white border">AD</Avatar>
              <div className="flex-1 space-y-0.5">
                <p className="text-sm font-semibold text-slate-900 leading-tight">Alex Doe</p>
                <p className="text-xs text-slate-500 leading-tight">alex@example.com</p>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1 space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{pageTitle}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input placeholder="Search transactions..." className="pl-11" />
              </div>
              <Button className="h-11 rounded-xl px-4" onClick={() => setShowAdd(true)}>
                <Plus className="h-5 w-5" />
                Add New
              </Button>
            </div>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                      <Card key={stat.title}>
                        <CardHeader className="flex items-start justify-between space-y-0">
                          <div>
                            <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
                            <div className="mt-3 flex items-center gap-2 text-2xl font-semibold text-slate-900">
                              {stat.value}
                            </div>
                            <Badge variant={stat.changeVariant} className="mt-2">
                              <stat.changeIcon className="mr-1 h-4 w-4" />
                              {stat.changeLabel}
                            </Badge>
                          </div>
                          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.accent}`}>
                            <stat.icon className="h-5 w-5" />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Progress value={stat.progress} colorClass={stat.progressColor} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid gap-5 lg:grid-cols-12">
                    <Card className="lg:col-span-8">
                      <CardContent className="pt-6">
                        <SpendingChart />
                      </CardContent>
                    </Card>

                    <Card className="lg:col-span-4">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-slate-900">Budgets</CardTitle>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                          Edit
                        </button>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        {budgets.map((budget) => (
                          <div key={budget.label} className="space-y-2">
                            <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                              <span>{budget.label}</span>
                              <span className="text-slate-500">
                                ${budget.used} / ${budget.total}
                              </span>
                            </div>
                            <Progress
                              value={(budget.used / budget.total) * 100}
                              colorClass={budget.color}
                            />
                          </div>
                        ))}

                        <div className="rounded-2xl bg-indigo-50 px-4 py-4 text-sm text-indigo-800">
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5">
                              <Info className="h-4 w-4" />
                            </span>
                            <span>You're close to hitting your limit on Entertainment!</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
    </div>
  );
}
