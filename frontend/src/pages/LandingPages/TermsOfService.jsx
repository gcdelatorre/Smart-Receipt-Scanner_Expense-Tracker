import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import lightLogo from "/TrackWise-Logo-removebg-preview.png"
import darkLogo from "/logo-dark-mode.png"
import Footer from "@/components/layout/Footer"

export default function TermsOfService() {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* SIMPLIFIED HEADER */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <img
                                src={resolvedTheme === 'dark' ? darkLogo : lightLogo}
                                alt="TrackWise Logo"
                                className="h-8 w-auto object-contain hover:opacity-80 transition-opacity"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full w-9 h-9"
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                        >
                            {resolvedTheme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
                        </Button>
                        <Link to="/">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 py-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
                        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="lead text-lg text-muted-foreground">
                            Welcome to TrackWise. By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">1. Use of Service</h3>
                        <p className="text-muted-foreground mb-4">
                            You act as the user of the account and are responsible for maintaining the confidentiality of your credentials. You agree to accept responsibility for all activities that occur under your account.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">2. User Conduct</h3>
                        <p className="text-muted-foreground mb-4">
                            You agree not to use the service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You are prohibited from violating or attempting to violate the security of the service.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">3. Intellectual Property</h3>
                        <p className="text-muted-foreground mb-4">
                            The service and its original content, features, and functionality are and will remain the exclusive property of TrackWise and its licensors.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">4. Termination</h3>
                        <p className="text-muted-foreground mb-6">
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">5. Changes to Terms</h3>
                        <p className="text-muted-foreground">
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}
