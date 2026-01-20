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
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
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
