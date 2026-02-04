import { useState, useCallback, useMemo, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import { useAuth } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/sonner";
// Login and Signup pages removed in favor of modals on Landing page
import Landing from "./pages/Landing";
import PrivacyPolicy from "./pages/LandingPages/PrivacyPolicy";
import TermsOfService from "./pages/LandingPages/TermsOfService";
import CookiePolicy from "./pages/LandingPages/CookiePolicy";
import HelpCenter from "./pages/LandingPages/HelpCenter";
import ContactUs from "./pages/LandingPages/ContactUs";

import BudgetResetDialog from "./components/dashboard/BudgetResetDialog";

export default function App() {

  const [refreshKey, setRefreshKey] = useState(0);
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { stats } = useStats(isAuthenticated ? refreshKey : null);
  const location = useLocation();
  const pathname = location.pathname;
  const [showResetDialog, setShowResetDialog] = useState(false);

  useEffect(() => {
    if (user?.budgetReset) {
      setShowResetDialog(true);
      // Optional: Clear the flag from the user object in context if we wanted to be extra safe,
      // but since it's a one-time server response, local state handling is sufficient.
    }
  }, [user]);

  const isActive = useCallback((path) => {
    if (path === "/") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  }, [pathname]);

  const pageTitle = useMemo(() => {
    if (pathname === "/transactions") return "Transactions";
    if (pathname === "/analytics") return "Analytics";
    return "Dashboard";
  }, [pathname]);

  const triggerRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const userInfo = useMemo(() => {
    return user ? { username: user.username || user.name, email: user.email } : null;
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />

      {!isAuthenticated && (
        <>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contact-us" element={<ContactUs />} />
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}

      {isAuthenticated && (
        <>
          <BudgetResetDialog open={showResetDialog} onOpenChange={setShowResetDialog} />
          <div className="min-h-screen bg-[hsl(var(--background))] text-foreground">
            <div className="mx-auto flex max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-0">
              <Sidebar navItems={navItems} isActive={isActive} />

              <main className="relative flex-1 space-y-6 pb-24 lg:pb-6 overflow-x-hidden">

                <HeaderBar pageTitle={pageTitle} onRefresh={triggerRefresh} />

                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <>
                        <StatsGrid stats={stats} />

                        <div className="grid gap-5 lg:grid-cols-12">
                          <Card className="lg:col-span-8">
                            <CardContent className="pt-6">
                              <SpendingChart refreshTrigger={refreshKey} />
                            </CardContent>
                          </Card>

                          <div className="lg:col-span-4">
                            <BudgetsCard refreshTrigger={refreshKey} />
                          </div>
                        </div>
                      </>
                    }
                  />
                  <Route path="/transactions" element={<TransactionsPage key={refreshKey} refreshTrigger={refreshKey} onRefresh={triggerRefresh} />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  {/* Redirect unknown authenticated routes to dashboard */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>
            <MobileNav
              navItems={navItems}
              isActive={isActive}
              onLogout={handleLogout}
              user={userInfo}
            />
          </div>
        </>
      )}
    </>
  );
}
