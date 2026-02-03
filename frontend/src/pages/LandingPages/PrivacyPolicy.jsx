import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import lightLogo from "/TrackWise-Logo-removebg-preview.png"
import darkLogo from "/logo-dark-mode.png"
import Footer from "@/components/layout/Footer"

export default function PrivacyPolicy() {
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
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
                        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="lead text-lg text-muted-foreground">
                            At TrackWise, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our expense tracking services.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">1. Information We Collect</h3>
                        <p className="text-muted-foreground mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                            <li>Account information (name, email, password)</li>
                            <li>Financial data (transaction records, budget limits)</li>
                            <li>Uploaded receipt images and extracted data</li>
                            <li>Usage preferences (theme, currency settings)</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">2. How We Use Your Information</h3>
                        <p className="text-muted-foreground mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process your transactions and budget analytics</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Detect and prevent fraud</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">3. Data Security</h3>
                        <p className="text-muted-foreground mb-6">
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted in transit and at rest.
                        </p>

                        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">4. Contact Us</h3>
                        <p className="text-muted-foreground">
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@trackwise.app" className="text-primary hover:underline">privacy@trackwise.app</a>.
                        </p>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}
