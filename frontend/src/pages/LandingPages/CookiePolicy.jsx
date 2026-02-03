import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import lightLogo from "/TrackWise-Logo-removebg-preview.png"
import darkLogo from "/logo-dark-mode.png"
import Footer from "@/components/layout/Footer"

export default function CookiePolicy() {
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
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Cookie Policy</h1>
                        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="lead text-lg text-muted-foreground">
                            This Cookie Policy explains how TrackWise uses cookies and similar technologies to recognize you when you visit our application.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">1. What are Cookies?</h3>
                        <p className="text-muted-foreground mb-4">
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">2. Why We Use Cookies</h3>
                        <p className="text-muted-foreground mb-4">
                            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Application to operate, and we refer to these as "essential" or "strictly necessary" cookies.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                            <li><strong>Essential Cookies:</strong> Required for the app to function (e.g., keeping you logged in).</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how you use the app so we can improve it.</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings (like dark mode or currency).</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">3. Your Control</h3>
                        <p className="text-muted-foreground mb-6">
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your browser controls to accept or refuse cookies.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">4. Updates to this Policy</h3>
                        <p className="text-muted-foreground">
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons.
                        </p>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}
