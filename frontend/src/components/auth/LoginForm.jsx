import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { activateToast } from "../Toast/ActivateToast";

export default function LoginForm({ onSwitchToSignup, onLoginSuccess }) {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(emailOrUsername, password);
            activateToast("success", "Welcome back!");
            if (onLoginSuccess) {
                onLoginSuccess();
            }

            navigate("/dashboard");
            setFieldErrors({});
        } catch (err) {
            if (err.response?.status === 400 && err.response.data?.errors) {
                const errors = {};
                err.response.data.errors.forEach(e => {
                    const fieldName = e.path[e.path.length - 1];
                    errors[fieldName] = e.message;
                });
                setFieldErrors(errors);
                
                activateToast('error', "Login failed. Please try again.");
            }
            else {
                const message = err.response?.data?.message || err.response?.data?.error || 'Failed to login'
                activateToast('error', message)
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 py-2">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="emailOrUsername" className="text-sm font-medium text-muted-foreground ml-1">Email or Username</Label>
                    <Input
                        id="emailOrUsername"
                        name="emailOrUsername"
                        type="text"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                        className="h-10 border-input/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30"
                        placeholder="john@example.com"
                    />
                    {fieldErrors.emailOrUsername && <span className="text-xs font-medium text-destructive">{fieldErrors.emailOrUsername}</span>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-muted-foreground ml-1">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-10 border-input/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30"
                        placeholder="••••••••"
                    />
                    {fieldErrors.password && <span className="text-xs font-medium text-destructive">{fieldErrors.password}</span>}
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
