import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, ArrowLeft, Mail, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import lightLogo from "/TrackWise-Logo-removebg-preview.png"
import darkLogo from "/logo-dark-mode.png"
import Footer from "@/components/layout/Footer"

export default function ContactUs() {
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

            {/* MAIN CONTENT - Centered Single Column */}
            <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6">
                <div className="max-w-lg w-full text-center space-y-10">

                    {/* Header & Subheader */}
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                            We'd love to hear from you. Click the card below to drop us an email directly.
                        </p>
                    </div>

                    {/* Gmail Card */}
                    <div
                        className="group block relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-card hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                        <div className="p-6 sm:p-8 flex flex-col items-center gap-6">
                            <div className="p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                <Mail className="w-10 h-10" />
                            </div>

                            <div className="space-y-2">
                                <div className="text-lg font-medium text-muted-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    Send an email to
                                </div>
                                <div className="text-lg sm:text-xl font-bold break-all">
                                    giancarlo.delatorre.dev@gmail.com
                                </div>
                            </div>

                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=giancarlo.delatorre.dev@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            >
                                Contact Us <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </div>

                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}