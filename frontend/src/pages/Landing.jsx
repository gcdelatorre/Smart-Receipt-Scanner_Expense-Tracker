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
        <div className="flex flex-col items-center justify-between gap-4 py-4 px-6 min-h-[calc(100vh-4rem)]">
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <h1 className="text-4xl font-bold tracking-tight">Expense Tracker</h1>
                <p className="text-slate-500 max-w-md text-center">
                    Track your expenses, scan receipts effortlessly, and manage your budget all in one place.
                </p>

                <div className="flex gap-4 items-center">
                    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                size="lg"
                                className="bg-slate-900 hover:bg-slate-800"
                            >
                                Login
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Login</DialogTitle>
                                <DialogDescription>
                                    Enter your credentials to access your account
                                </DialogDescription>
                            </DialogHeader>
                            <LoginForm onSwitchToSignup={openSignup} onLoginSuccess={() => setLoginOpen(false)} />
                        </DialogContent>
                    </Dialog>

                    <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="lg">
                                Sign Up
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create Account</DialogTitle>
                                <DialogDescription>
                                    Get started with a new account today
                                </DialogDescription>
                            </DialogHeader>
                            <SignupForm onSwitchToLogin={openLogin} onSignupSuccess={() => setSignupOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
