import { useCurrency } from "@/hooks/useCurrency";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Globe, Clock, Hash } from "lucide-react";
import { CURRENCIES } from "@/constants/currencies";
import { useState } from "react";

export default function PreferencesSection({ preferencesRef }) {
    const { currency, changeCurrency } = useCurrency();


    const handleCurrencyChange = (value) => {
        changeCurrency(value);
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
                        < Globe className="w-3.5 h-3.5" />
                        Primary Currency
                    </Label>
                    <Select defaultValue={currency} onValueChange={handleCurrencyChange}>
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
    );
}