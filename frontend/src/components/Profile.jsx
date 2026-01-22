import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Pencil, Save, X } from "lucide-react"; // Make sure to install lucide-react
import api from "@/services/api";
import { activateToast } from "./Toast/ActivateToast";

export default function Profile({ openProfile, setOpenProfile }) {
    const [ifEdit, setIfEdit] = useState(false);
    const { user, setUser } = useAuth();

    const [payload, setPayload] = useState({ name: "", username: "", email: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload(prev => ({ ...prev, [name]: value }));
    }

    const handleIfEdit = () => {
        if (!ifEdit) {
            // Initialize payload with current user data when entering edit mode
            setPayload({ name: user?.name || "", username: user?.username || "", email: user?.email || "" });
        }
        setIfEdit(!ifEdit);
    };

    const handleSave = async () => {
        try {
            const res = await api.put('/profile/update', payload);
            // update/setUser to update the user in the AuthContext
            setUser(res.data.data);
            setIfEdit(false);
            activateToast("success", "Profile updated successfully");
        } catch (err) {
            activateToast("error", "Failed to update profile. Please try again.");
        }
    }

    const handleOpenChange = (val) => {
        setOpenProfile(val);
        if (!val) setIfEdit(false);
    }

    return (
        <Dialog open={openProfile} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[400px] p-0 border-none shadow-xl bg-card overflow-hidden">

                {/* 1. BANNER */}
                <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative">
                    <DialogHeader className="absolute top-4 left-4">
                        <DialogTitle className="text-slate-800 dark:text-slate-100 text-lg font-semibold tracking-tight">
                            {ifEdit ? "Edit Profile" : "Profile"}
                        </DialogTitle>
                    </DialogHeader>
                </div>

                {/* 2. AVATAR SECTION */}
                <div className="px-6 relative">
                    <div className="-mt-12 mb-4 relative inline-block group">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className={`w-24 h-24 rounded-full border-[4px] border-card shadow-sm object-cover bg-background ${ifEdit ? 'opacity-80' : ''}`}
                            />
                        ) : (
                            <Avatar className="w-24 h-24 border-[4px] border-card shadow-sm text-3xl">
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </Avatar>
                        )}
                    </div>

                    {/* IDENTITY HEADER: Only visible in View Mode */}
                    {!ifEdit && (
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                                <p className="text-sm text-muted-foreground font-medium">@{user?.username}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleIfEdit}>
                                <Pencil className="w-3.5 h-3.5 mr-2" /> Edit
                            </Button>
                        </div>
                    )}
                </div>

                {/* 3. DYNAMIC BODY CONTENT */}
                <div className="px-6 pb-6">
                    {ifEdit ? (
                        /* EDIT MODE: Show ALL fields as inputs */
                        <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
                            <div className="space-y-1.5">
                                <Label>Full Name</Label>
                                <Input name="name" value={payload.name} onChange={handleChange} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Username</Label>
                                <Input name="username" value={payload.username} onChange={handleChange} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Email</Label>
                                <Input name="email" value={payload.email} onChange={handleChange} type="email" />
                            </div>

                            <div className="flex justify-end gap-2 mt-2 pt-4 border-t">
                                <Button variant="ghost" size="sm" onClick={handleIfEdit}>
                                    <X className="w-4 h-4 mr-2" /> Cancel
                                </Button>
                                <Button size="sm" onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" /> Save
                                </Button>
                            </div>
                        </div>
                    ) : (
                        /* VIEW MODE: Show ONLY contact info (No redundancy) */
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                                <div className="p-2 bg-background rounded-full shadow-sm">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-medium text-muted-foreground uppercase">Email</p>
                                    <p className="text-sm font-medium truncate">{user?.email}</p>
                                </div>
                            </div>
                            {/* You can add Bio, Location, or Join Date here later */}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
