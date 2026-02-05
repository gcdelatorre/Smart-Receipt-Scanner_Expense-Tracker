import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shield, Settings, Monitor, Globe } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CURRENCIES } from "@/constants/currencies"
import SecuritySection from "./SettingsComponent/SecuritySection"
import PreferencesSection from "./SettingsComponent/PreferencesSection"
import DisplaySection from "./SettingsComponent/DisplaySection"

// --- PREVIEW COMPONENTS (Using raw Tailwind for missing shadcn components) ---
const Separator = () => <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800 my-6" />;


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
            <DialogContent className="w-full max-w-[95vw] sm:max-w-[850px] p-0 overflow-hidden border-none shadow-2xl h-[90vh] sm:h-[600px] flex flex-col bg-background text-foreground rounded-3xl">
                <div className="flex flex-col sm:flex-row flex-1 h-full overflow-hidden">

                    {/* SIDEBAR - Vertical on desktop, Horizontal scroll on mobile */}
                    <aside className="w-full sm:w-64 bg-slate-50/50 dark:bg-slate-900/50 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 flex flex-col p-4 gap-2 shrink-0">
                        <DialogHeader className="px-2 mb-2 sm:mb-4 text-left">
                            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                <Settings className="w-5 h-5 text-indigo-600" />
                                Settings
                            </DialogTitle>
                        </DialogHeader>

                        <nav className="flex flex-row sm:flex-col gap-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 no-scrollbar">
                            <Button
                                variant="ghost"
                                onClick={() => scrollToSection("security")}
                                className={cn(
                                    "shrink-0 sm:w-full justify-start gap-3 transition-all duration-200 whitespace-nowrap px-4 sm:px-3",
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
                                    "shrink-0 sm:w-full justify-start gap-3 transition-all duration-200 whitespace-nowrap px-4 sm:px-3",
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
                                    "shrink-0 sm:w-full justify-start gap-3 transition-all duration-200 whitespace-nowrap px-4 sm:px-3",
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
                        <ScrollArea containerRef={scrollAreaRef} className="p-4 sm:p-8">
                            <div className="max-w-xl mx-auto space-y-8 sm:space-y-12 pb-12">

                                <SecuritySection securityRef={securityRef} />

                                <Separator />

                                {/* 2. PREFERENCES SECTION */}
                                <PreferencesSection preferencesRef={preferencesRef} />

                                <Separator />

                                {/* 3. DISPLAY & UI SECTION */}
                                <DisplaySection displayRef={displayRef} />
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
