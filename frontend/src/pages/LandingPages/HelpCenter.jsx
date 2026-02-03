import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import lightLogo from "/TrackWise-Logo-removebg-preview.png"
import darkLogo from "/logo-dark-mode.png"
import Footer from "@/components/layout/Footer"

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline"
            >
                {question}
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
            </button>
            <div
                className={cn(
                    "overflow-hidden text-sm transition-all duration-300 ease-in-out text-muted-foreground",
                    isOpen ? "max-h-96 pb-4" : "max-h-0"
                )}
            >
                {answer}
            </div>
        </div>
    );
};

export default function HelpCenter() {
    const { setTheme, resolvedTheme } = useTheme();

    const faqs = [
        {
            question: "Is TrackWise completely free?",
            answer: "Yes! TrackWise is currently 100% free to use for personal expense tracking. We believe financial clarity should be accessible to everyone."
        },
        {
            question: "How do I scan a receipt?",
            answer: "Simply navigate to the dashboard -> transactions, click the 'Add Expense' button, and choose the 'Receipt Scanner' tab. Upload your image, and our AI will extract the details for you."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use industry-standard encryption protocols to protect your data. Your financial information is never shared with third parties for marketing purposes."
        },
        {
            question: "Can I export my data?",
            answer: "Currently, we are working on an export feature (CSV/PDF) which will be available in the next update."
        },
        {
            question: "How do I reset my password?",
            answer: "You can change your password from the Settings menu once logged in. If you've forgotten your password, please use the 'Forgot Password' link on the login screen."
        }
    ];

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
                <div className="max-w-2xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Help Center</h1>
                        <p className="text-muted-foreground text-lg">Frequently asked questions and support resources.</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-semibold mb-6">Common Questions</h2>
                        <div className="space-y-2">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <p className="text-muted-foreground">Still need help?</p>
                        <Link to="/contact-us">
                            <Button>Contact Support</Button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}