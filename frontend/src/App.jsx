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
import { navItems } from "./components/utils/navItems";
import { useStats } from "./components/utils/useStats";
import { budgets } from "./components/utils/budget";
import { chartPoints } from "./components/utils/chartPoints";
import AddNewButton from "./components/ui/AddNewButton";

export default function App() {

  const [showAdd, setShowAdd] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { stats } = useStats(refreshKey);
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = (path) => (path === "/" ? pathname === "/" : pathname.startsWith(path));
  const pageTitle =
    pathname === "/transactions"
      ? "Transactions"
      : pathname === "/analytics"
        ? "Analytics"
        : "Dashboard";

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

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
            <Route path="/transactions" element={<TransactionsPage key={refreshKey} refreshTrigger={refreshKey} onRefresh={triggerRefresh} />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <AddEntryModal open={showAdd} onClose={() => setShowAdd(false)} refreshTransaction={triggerRefresh} />
      <MobileNav navItems={navItems} isActive={isActive} onLogout={() => { }} user={{ username: "Alex Doe", email: "alex@example.com" }} />
    </div>
  );
}
