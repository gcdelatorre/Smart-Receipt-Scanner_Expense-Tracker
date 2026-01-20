import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginForm({ onSwitchToSignup, onLoginSuccess }) {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(emailOrUsername, password);
            if (onLoginSuccess) {
                onLoginSuccess();
            }
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 py-2">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="emailOrUsername" className="text-sm font-medium text-muted-foreground ml-1">Email or Username</Label>
                    <Input
                        id="emailOrUsername"
                        type="text"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                        className="h-10 border-input/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30"
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-muted-foreground ml-1">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-10 border-input/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30"
                        placeholder="••••••••"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <button
                    onClick={onSwitchToSignup}
                    className="text-slate-600 hover:underline font-medium"
                    type="button"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
