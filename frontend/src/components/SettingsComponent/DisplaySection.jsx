import { Label } from "@/components/ui/label";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePreferences } from "@/hooks/usePreferences";
import { cn } from "@/lib/utils";

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

export default function DisplaySection({ displayRef }) {

    const { theme, setTheme } = useTheme();
    const { privacyMode, changePrivacyMode } = usePreferences();

    return (
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
                    <Switch checked={privacyMode} onChange={(val) => changePrivacyMode(val)} />
                </div>
            </div>
        </section>
    )
}