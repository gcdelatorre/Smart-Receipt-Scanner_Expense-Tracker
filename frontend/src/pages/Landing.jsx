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
import { useTheme } from "next-themes"
import {
    CheckCircle2,
    ArrowRight,
    ShieldCheck,
    BarChart3,
    PieChart,
    Zap,
    User,
    Mail,
    Lock,
    Eye,
    ChevronRight,
    MousePointerClick,
    LayoutDashboard,
    List,
    Sun,
    Moon,
} from "lucide-react"
import lightLogo from "/TrackWise-Logo-removebg-preview.png"
import darkLogo from "/logo-dark-mode.png"

export default function Landing() {
    const { setTheme, resolvedTheme } = useTheme();
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

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <img
                            src={resolvedTheme === 'dark' ? darkLogo : lightLogo}
                            alt="TrackWise Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="transition-colors hover:text-primary">Features</a>
                        <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="transition-colors hover:text-primary">How it Works</a>
                        <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="transition-colors hover:text-primary">About</a>
                    </nav>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full w-9 h-9"
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                        >
                            {resolvedTheme === 'dark' ? (
                                <Sun className="h-5 w-5 text-amber-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-slate-700" />
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={openLogin} className="hidden sm:inline-flex">Login</Button>
                        <Button size="sm" onClick={openSignup}>Get Started</Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* 1. HERO SECTION */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-8 max-w-4xl mx-auto">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground mb-4">
                                <Zap className="w-3 h-3 mr-1 text-primary fill-primary" /> Simplified Finance Tracking
                            </div>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                                Track your expenses, <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-primary">
                                    Your way.
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Whether you want to snap a receipt or log it manually, TrackWise gives you the tools to stay on top of your finances with zero friction.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button size="lg" className="h-12 px-8 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all font-semibold" onClick={openSignup}>
                                    Start Tracking Free <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-xl border-2 hover:bg-secondary/50 transition-all font-semibold" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>
                                    See How It Works
                                </Button>
                            </div>

                            {/* Dashboard Preview Mockup (Real Screenshots) */}
                            <div className="mt-16 relative rounded-2xl border bg-card/50 p-2 shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-10">
                                <div className="rounded-xl border bg-background overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none z-10" />
                                    <div className="border-b px-4 py-2 flex items-center justify-between bg-muted/30">
                                        <div className="flex gap-1.5 focus:outline-none">
                                            <div className="w-3 h-3 rounded-full bg-rose-500/40" />
                                            <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                                        </div>
                                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Live Preview</div>
                                        <div className="w-12 h-1" />
                                    </div>
                                    <img
                                        src={resolvedTheme === 'dark' ? '/screenshots/Screenshot 2026-01-29 042258.png' : '/screenshots/Screenshot 2026-01-29 042321.png'}
                                        alt="TrackWise Dashboard"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. PROBLEM -> SOLUTION SECTION */}
                <section id="about" className="py-24 bg-muted/30 border-y">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">Modern expense tracking that fits your lifestyle.</h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                                        <div className="h-10 w-10 shrink-0 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold italic">?</div>
                                        <div>
                                            <p className="font-semibold text-rose-600 dark:text-rose-400">The Challenge</p>
                                            <p className="text-muted-foreground">Managing money shouldn't be a second job. Traditional methods often feel restrictive or time-consuming when life gets busy.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                        <CheckCircle2 className="h-10 w-10 shrink-0 text-emerald-500" />
                                        <div>
                                            <p className="font-semibold text-emerald-600 dark:text-emerald-400">The Solution</p>
                                            <p className="text-muted-foreground">TrackWise offers total flexibility. Choose between instant AI receipt scanning for busy days, or precise manual entry for total control over your records.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/30 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-1 border">
                                    <img
                                        src={resolvedTheme === 'dark' ? '/screenshots/Screenshot 2026-01-29 042347.png' : '/screenshots/Screenshot 2026-01-29 042335.png'}
                                        alt="Transactions History"
                                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-2xl shadow-xl border animate-bounce duration-[3000ms]">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <BarChart3 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground whitespace-nowrap">Monthly Savings</p>
                                            <p className="text-sm font-bold text-foreground">+₱12,450.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. KEY BENEFITS SECTION */}
                <section className="py-24">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Focus on the outcome, not the data entry.</h2>
                        <div className="grid sm:grid-cols-3 gap-8 text-left">
                            <div className="space-y-4 p-6 rounded-2xl border bg-card">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">Flexible Entry</h3>
                                <p className="text-muted-foreground">Choose the method that works for you. Log expenses manually in seconds or use AI scanning for instant results.</p>
                            </div>
                            <div className="space-y-4 p-6 rounded-2xl border bg-card">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">Automated Insights</h3>
                                <p className="text-muted-foreground">Our AI assists your manual logs and scans by automatically categorizing spending for a clearer financial picture.</p>
                            </div>
                            <div className="space-y-4 p-6 rounded-2xl border bg-card">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">Total Privacy</h3>
                                <p className="text-muted-foreground">Your data belongs to you. We focus on a secure, single-user experience that puts your privacy above everything else.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. HOW IT WORKS SECTION */}
                <section id="how-it-works" className="py-24 bg-muted/30 border-t">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-20">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Simple as 1, 2, 3.</h2>
                            <p className="text-muted-foreground">From pocket to dashboard in three easy steps.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 relative">
                            {/* Connector Line */}
                            <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-muted-foreground/20" />

                            <div className="relative space-y-6">
                                <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xl z-20 relative">1</div>
                                <h3 className="text-lg font-bold">Choose your path</h3>
                                <p className="text-sm text-muted-foreground">Snap a photo of a receipt or enter your transaction details manually in seconds.</p>
                            </div>
                            <div className="relative space-y-6">
                                <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xl z-20 relative">2</div>
                                <h3 className="text-lg font-bold">Automatic Sync</h3>
                                <p className="text-sm text-muted-foreground">Our AI extracts data from your receipts, while manual entries are instantly organized by category.</p>
                            </div>
                            <div className="relative space-y-6">
                                <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xl z-20 relative">3</div>
                                <h3 className="text-lg font-bold">Review & Reflect</h3>
                                <p className="text-sm text-muted-foreground">Browse your full transaction history and see everything come together in beautiful, actionable charts.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. FEATURE HIGHLIGHTS */}
                <section id="features" className="py-24">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            <div className="flex flex-col gap-3">
                                <Zap className="w-8 h-8 text-primary" />
                                <h4 className="font-bold">Flexible Logging</h4>
                                <p className="text-sm text-muted-foreground">Choice between instant AI receipt scanning or precise manual entry for every transaction.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <PieChart className="w-8 h-8 text-emerald-500" />
                                <h4 className="font-bold">AI Categorization</h4>
                                <p className="text-sm text-muted-foreground">Smart algorithms that automatically sort your transactions into logical buckets, however you log them.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <List className="w-8 h-8 text-primary" />
                                <h4 className="font-bold">Transaction History</h4>
                                <p className="text-sm text-muted-foreground">A searchable, organized log of every cent you spend. Filter, edit, and manage your records with ease.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <BarChart3 className="w-8 h-8 text-emerald-500" />
                                <h4 className="font-bold">Visual Analytics</h4>
                                <p className="text-sm text-muted-foreground">Beautiful high-contrast charts that make your financial story easy to read and act upon.</p>
                            </div>
                            <div id="security" className="flex flex-col gap-3">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                                <h4 className="font-bold">Privacy First</h4>
                                <p className="text-sm text-muted-foreground">Single-user focused. No bank syncing or third-party data tracking. You own 100% of your data.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Globe className="w-8 h-8 text-emerald-500" />
                                <h4 className="font-bold">Global Readiness</h4>
                                <p className="text-sm text-muted-foreground">Switch between currencies and formatting preferences. Perfect for international students and travelers.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. TRUST & CREDIBILITY */}
                <section className="py-24 bg-muted/10 border-t">
                    <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                        <blockquote className="text-2xl sm:text-3xl font-medium italic text-muted-foreground leading-relaxed">
                            "Efficiency is the foundation of consistency. We built TrackWise to remove the friction of manual tracking so you can focus on your goals."
                        </blockquote>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-4">
                            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" /> 100% Privacy Focused
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                <Lock className="w-5 h-5 text-primary" /> No Bank Sync Required
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                <User className="w-5 h-5 text-primary" /> Single User Experience
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. FINAL CALL TO ACTION */}
                <section className="py-24 border-t">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-3xl bg-primary px-8 py-16 sm:px-16 text-center text-primary-foreground space-y-10 shadow-2xl shadow-primary/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <LayoutDashboard className="w-64 h-64 rotate-12" />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Ready to track smarter?</h2>
                                <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
                                    Start logging your expenses in seconds—whether by hand or with a quick scan. Setup takes less than a minute.
                                </p>
                                <Button size="lg" variant="secondary" className="h-14 px-10 text-xl font-bold rounded-2xl" onClick={openSignup}>
                                    Get Started for Free
                                </Button>
                                <p className="text-xs text-primary-foreground/60">No credit card required. Always free.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t bg-muted/20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="space-y-4">
                            <img
                                src={resolvedTheme === 'dark' ? darkLogo : lightLogo}
                                alt="TrackWise Logo"
                                className="h-8 w-auto object-contain"
                            />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                A minimalist personal expense tracker built for clarity and control. Perfect for first-time budgeters.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Product</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-primary">Features</a></li>
                                <li><a href="#security" onClick={(e) => scrollToSection(e, 'security')} className="hover:text-primary">Security</a></li>
                                <li><a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-primary">Pricing (Always Free)</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Legal</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Support</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-12 mt-12 border-t text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} TrackWise. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* MODALS */}
            <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogContent className="sm:max-w-[400px] border-none shadow-2xl bg-card/95 backdrop-blur-sm">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
                        <DialogDescription className="text-center font-medium">
                            Continue your journey to financial freedom
                        </DialogDescription>
                    </DialogHeader>
                    <LoginForm onSwitchToSignup={openSignup} onLoginSuccess={() => setLoginOpen(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                <DialogContent className="sm:max-w-[400px] border-none shadow-2xl bg-card/95 backdrop-blur-sm">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Create Account</DialogTitle>
                        <DialogDescription className="text-center font-medium">
                            Start tracking your expenses in seconds
                        </DialogDescription>
                    </DialogHeader>
                    <SignupForm onSwitchToLogin={openLogin} onSignupSuccess={() => setSignupOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

function Globe(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}

