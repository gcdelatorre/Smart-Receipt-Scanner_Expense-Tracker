import { Link } from "react-router-dom"

export default function Landing() {
    return (
        <div className="flex flex-colitems-center justify-between gap-4 py-4 px-6">
            <h1 className="text-2xl font-bold">Landing Page</h1>

            <div className="flex gap-4 items-center">
                <Link
                    to="/login"
                    className="rounded-md border border-slate-900 px-6 py-2 hover:bg-slate-900 hover:text-white transition"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="text-slate-600 hover:underline"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    )
}