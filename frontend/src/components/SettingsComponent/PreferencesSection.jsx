import { usePreferences } from "@/hooks/usePreferences";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Globe, Clock, Hash } from "lucide-react";
import { CURRENCIES } from "@/constants/currencies";

export default function PreferencesSection({ preferencesRef }) {
    const {
        currency,
        dateFormat,
        numberFormat,
        updatePreferences
    } = usePreferences();

    const handleUpdate = (key, value) => {
        updatePreferences({ [key]: value });
    };

    return (
        <section ref={preferencesRef} id="preferences" className="space-y-6 scroll-mt-8">
            <div>
                <h3 className="text-lg font-semibold text-foreground">Preferences</h3>
                <p className="text-sm text-muted-foreground mt-1">Customize your localization and data viewing.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" />
                        Primary Currency
                    </Label>
                    <Select value={currency} onValueChange={(val) => handleUpdate('currency', val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                            {CURRENCIES.map((c) => (
                                <SelectItem key={c.code} value={c.code}>
                                    {c.name} ({c.symbol})
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
                    <Select value={dateFormat} onValueChange={(val) => handleUpdate('dateFormat', val)}>
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
                    <Select value={numberFormat} onValueChange={(val) => handleUpdate('numberFormat', val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="standard">1,234.56 (Standard)</SelectItem>
                            <SelectItem value="continental">1.234,56 (Continental)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
}
