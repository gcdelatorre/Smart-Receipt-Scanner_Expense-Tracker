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
import { useTheme } from "next-themes"
import SecuritySection from "./SettingsComponent/SecuritySection"
import PreferencesSection from "./SettingsComponent/PreferencesSection"

// --- PREVIEW COMPONENTS (Using raw Tailwind for missing shadcn components) ---
const Separator = () => <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800 my-6" />;

const Switch = ({ checked, onChange }) => (
    <div
        onClick={() => onChange(!checked)}
        className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
            checked ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
        )}
    >
        <span className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
        )} />
    </div>
);

// Custom ScrollArea that provides a ref to its viewport
const ScrollArea = ({ children, className, containerRef }) => (
    <div
        ref={containerRef}
        className={`overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent ${className}`}
    >
        {children}
    </div>
);
// ----------------------------------------------------------------------------

export default function Setting({ openSettings, setOpenSettings }) {
    const { theme, setTheme } = useTheme();
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
            <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden border-none shadow-2xl h-[600px] flex flex-col bg-background text-foreground">
                <div className="flex flex-1 h-full overflow-hidden">

                    {/* LEFT SIDEBAR - Fixed width, no scroll */}
                    <aside className="w-64 bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800 flex flex-col p-4 gap-2">
                        <DialogHeader className="px-2 mb-4 text-left">
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
                                        ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 font-semibold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                                        ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 font-semibold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                                        ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 font-semibold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                <Monitor className={cn("w-4 h-4", activeSection === "display" ? "text-indigo-600" : "text-slate-400")} />
                                Display & UI
                            </Button>
                        </nav>
                    </aside>

                    {/* RIGHT CONTENT - Only scrollable area */}
                    <div className="flex-1 flex flex-col bg-background overflow-hidden">
                        <ScrollArea containerRef={scrollAreaRef} className="p-8">
                            <div className="max-w-xl mx-auto space-y-12 pb-12">

                                <SecuritySection securityRef={securityRef} />

                                <Separator />

                                {/* 2. PREFERENCES SECTION */}
                                <PreferencesSection preferencesRef={preferencesRef} />

                                <Separator />

                                {/* 3. DISPLAY & UI SECTION */}
                                <section ref={displayRef} id="display" className="space-y-6 scroll-mt-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Display & UI</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Adjust how the application looks on your screen.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label className="text-base">Dark Mode</Label>
                                                <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
                                            </div>
                                            <Switch
                                                checked={theme === 'dark'}
                                                onChange={(val) => setTheme(val ? 'dark' : 'light')}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between border-t dark:border-slate-800 pt-6">
                                            <div className="space-y-0.5">
                                                <Label className="text-base flex items-center gap-2">
                                                    <Moon className="w-3.5 h-3.5" />
                                                    Privacy Mode
                                                </Label>
                                                <p className="text-sm text-muted-foreground">Hide sensitive amounts from the dashboard.</p>
                                            </div>
                                            <Switch checked={false} onChange={() => { }} />
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
