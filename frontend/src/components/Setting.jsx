import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Shield, Settings, Monitor, Trash2, Globe, Clock, Hash, Moon } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CURRENCIES } from "@/constants/currencies"

// --- PREVIEW COMPONENTS (Using raw Tailwind for missing shadcn components) ---
const Separator = () => <div className="h-[1px] w-full bg-slate-200 my-6" />;
const Switch = () => (
    <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out">
        <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
    </div>
);

// Custom ScrollArea that provides a ref to its viewport
const ScrollArea = ({ children, className, containerRef }) => (
    <div
        ref={containerRef}
        className={`overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent ${className}`}
    >
        {children}
    </div>
);
// ----------------------------------------------------------------------------

export default function Setting({ openSettings, setOpenSettings }) {
    const [activeSection, setActiveSection] = useState("security");

    // Refs for sections
    const securityRef = useRef(null);
    const preferencesRef = useRef(null);
    const displayRef = useRef(null);
    const scrollAreaRef = useRef(null);

    // Manual scroll function
    const scrollToSection = (sectionId) => {
        const refs = {
            security: securityRef,
            preferences: preferencesRef,
            display: displayRef
        };

        const targetRef = refs[sectionId];
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveSection(sectionId);
        }
    };

    // Auto-highlight logic removed as requested


    return (
        <Dialog open={openSettings} onOpenChange={setOpenSettings}>
            <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden border-none shadow-2xl h-[600px] flex flex-col">
                <div className="flex flex-1 h-full overflow-hidden">

                    {/* LEFT SIDEBAR - Fixed width, no scroll */}
                    <aside className="w-64 bg-slate-50/50 border-r border-slate-100 flex flex-col p-4 gap-2">
                        <DialogHeader className="px-2 mb-4">
                            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                <Settings className="w-5 h-5 text-indigo-600" />
                                Settings
                            </DialogTitle>
                        </DialogHeader>

                        <nav className="space-y-1">
                            <Button
                                variant="ghost"
                                onClick={() => scrollToSection("security")}
                                className={cn(
                                    "w-full justify-start gap-3 transition-all duration-200",
                                    activeSection === "security"
                                        ? "bg-white shadow-sm text-indigo-600 font-semibold"
                                        : "text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                <Shield className={cn("w-4 h-4", activeSection === "security" ? "text-indigo-600" : "text-slate-400")} />
                                Security
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => scrollToSection("preferences")}
                                className={cn(
                                    "w-full justify-start gap-3 transition-all duration-200",
                                    activeSection === "preferences"
                                        ? "bg-white shadow-sm text-indigo-600 font-semibold"
                                        : "text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                <Globe className={cn("w-4 h-4", activeSection === "preferences" ? "text-indigo-600" : "text-slate-400")} />
                                Preferences
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => scrollToSection("display")}
                                className={cn(
                                    "w-full justify-start gap-3 transition-all duration-200",
                                    activeSection === "display"
                                        ? "bg-white shadow-sm text-indigo-600 font-semibold"
                                        : "text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                <Monitor className={cn("w-4 h-4", activeSection === "display" ? "text-indigo-600" : "text-slate-400")} />
                                Display & UI
                            </Button>
                        </nav>
                    </aside>

                    {/* RIGHT CONTENT - Only scrollable area */}
                    <div className="flex-1 flex flex-col bg-white overflow-hidden">
                        <ScrollArea containerRef={scrollAreaRef} className="p-8">
                            <div className="max-w-xl mx-auto space-y-12 pb-12">

                                {/* 1. SECURITY SECTION */}
                                <section ref={securityRef} id="security" className="space-y-6 scroll-mt-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">Security</h3>
                                        <p className="text-sm text-slate-500 mt-1">Manage your password and account security.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Current Password</Label>
                                            <Input type="password" placeholder="••••••••" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>New Password</Label>
                                            <Input type="password" placeholder="••••••••" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Confirm New Password</Label>
                                            <Input type="password" placeholder="••••••••" />
                                        </div>
                                        <Button className="w-full sm:w-auto">Update Password</Button>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-4">
                                        <Button variant="ghost" className="justify-start gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-0 h-auto font-medium">
                                            <Trash2 className="w-4 h-4" />
                                            Delete Account
                                        </Button>
                                    </div>
                                </section>

                                <Separator />

                                {/* 2. PREFERENCES SECTION */}
                                <section ref={preferencesRef} id="preferences" className="space-y-6 scroll-mt-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">Preferences</h3>
                                        <p className="text-sm text-slate-500 mt-1">Customize your localization and data viewing.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                < Globe className="w-3.5 h-3.5" />
                                                Primary Currency
                                            </Label>
                                            <Select defaultValue="USD">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select currency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {CURRENCIES.map((currency) => (
                                                        <SelectItem key={currency.code} value={currency.code}>
                                                            {currency.name} ({currency.symbol})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5" />
                                                Date Format
                                            </Label>
                                            <Select defaultValue="mdy">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select format" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                <Hash className="w-3.5 h-3.5" />
                                                Number Format
                                            </Label>
                                            <Select defaultValue="standard">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select format" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="standard">1,234.56</SelectItem>
                                                    <SelectItem value="continental">1.234,56</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </section>

                                <Separator />

                                {/* 3. DISPLAY & UI SECTION */}
                                <section ref={displayRef} id="display" className="space-y-6 scroll-mt-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">Display & UI</h3>
                                        <p className="text-sm text-slate-500 mt-1">Adjust how the application looks on your screen.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label className="text-base">Dark Mode</Label>
                                                <p className="text-sm text-slate-500">Switch between light and dark themes.</p>
                                            </div>
                                            <Switch />
                                        </div>

                                        <div className="flex items-center justify-between border-t pt-6">
                                            <div className="space-y-0.5">
                                                <Label className="text-base flex items-center gap-2">
                                                    <Moon className="w-3.5 h-3.5" />
                                                    Privacy Mode
                                                </Label>
                                                <p className="text-sm text-slate-500">Hide sensitive amounts from the dashboard.</p>
                                            </div>
                                            <Switch />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
