import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { activateToast } from "../Toast/ActivateToast";

export default function SignupForm({ onSwitchToLogin, onSignupSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
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
        try {
            setLoading(true);

            await register(formData);
            activateToast("success", "Account created successfully!");
            if (onSignupSuccess) {
                onSignupSuccess();
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

                activateToast('error', "Registration failed. Please try again.");
            }
            else {
                const message = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again'
                activateToast('error', message)
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 py-2">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-10 border-input/50 focus:border-primary/50 focus:ring-primary/20 bg-muted/30"
                        placeholder="John Doe"
                    />
                    {fieldErrors.name && (<p className="text-xs font-medium text-destructive">{fieldErrors.name}</p>)}
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
                    {fieldErrors.username && (<p className="text-xs font-medium text-destructive">{fieldErrors.username}</p>)}
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
                    {fieldErrors.email && (<p className="text-xs font-medium text-destructive">{fieldErrors.email}</p>)}
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
                    {fieldErrors.password && (<p className="text-xs font-medium text-destructive">{fieldErrors.password}</p>)}
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
