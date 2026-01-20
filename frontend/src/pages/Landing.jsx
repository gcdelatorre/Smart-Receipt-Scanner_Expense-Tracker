import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from "../components/auth/LoginForm"
import SignupForm from "../components/auth/SignupForm"

export default function Landing() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    const openLogin = () => {
        setSignupOpen(false);
        setLoginOpen(true);
    }

    const openSignup = () => {
        setLoginOpen(false);
        setSignupOpen(true);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
            {/* Navbar Placeholder / Branding */}
            <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                        E
                    </div>
                    <span className="text-xl font-bold tracking-tight">Expensify</span>
                </div>
                <div className="flex gap-4">
                    {/* Auth buttons will go here via the layout or just handled in hero */}
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 max-w-4xl mx-auto">
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
                        Master Your Money, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-primary">
                            Effortlessly.
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Track expenses, scan receipts with AI, and gain effortless insights into your financial life.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                        <DialogTrigger asChild>
                            <Button
                                size="lg"
                                className="h-12 px-8 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 bg-primary hover:bg-primary/90"
                            >
                                Login
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[400px] border-none shadow-2xl bg-card/95 backdrop-blur-sm">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
                                <DialogDescription className="text-center">
                                    Continue your journey to financial freedom
                                </DialogDescription>
                            </DialogHeader>
                            <LoginForm onSwitchToSignup={openSignup} onLoginSuccess={() => setLoginOpen(false)} />
                        </DialogContent>
                    </Dialog>

                    <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 px-8 text-lg border-2 hover:bg-secondary/50 transition-all duration-200"
                            >
                                Get Started
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[400px] border-none shadow-2xl bg-card/95 backdrop-blur-sm">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-center">Create Account</DialogTitle>
                                <DialogDescription className="text-center">
                                    Start tracking your expenses in seconds
                                </DialogDescription>
                            </DialogHeader>
                            <SignupForm onSwitchToLogin={openLogin} onSignupSuccess={() => setSignupOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Feature Pills/Social Proof */}
                <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2 justify-center p-3 rounded-full bg-secondary/50 backdrop-blur">
                        <span>✨ AI Receipt Scanning</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center p-3 rounded-full bg-secondary/50 backdrop-blur">
                        <span>📊 Visual Analytics</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center p-3 rounded-full bg-secondary/50 backdrop-blur">
                        <span>🛡️ Secure Cloud Sync</span>
                    </div>
                </div>
            </main>

            <footer className="py-6 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Expense Tracker. All rights reserved.
            </footer>
        </div>
    )
}

