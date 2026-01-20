import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../contexts/AuthContext";

export default function SignupForm({ onSwitchToLogin, onSignupSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(formData);
            if (onSignupSuccess) {
                onSignupSuccess();
            }
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 py-2">
            <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name (Optional)</Label>
                    <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-10 border-input/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-muted-foreground ml-1">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="h-10 border-input/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30"
                        placeholder="johndoe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="h-10 border-input/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30"
                        placeholder="••••••••"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Have an account?{" "}
                <button
                    onClick={onSwitchToLogin}
                    className="text-slate-600 hover:underline font-medium"
                    type="button"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
