import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="grid gap-5">
            <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Overview
                </p>
                <h1 className="text-2xl font-semibold text-slate-900 leading-snug">Analytics</h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Insights and trends coming soon.
                </p>
            </div>

            <Card className="border-dashed border-slate-200 bg-slate-50">
                <CardHeader className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                        <BarChart3 className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-800 h-2">Analytics coming soon</CardTitle>
                </CardHeader>
                <CardContent className="pb-8 text-center text-sm text-slate-600">
                    We’re preparing charts and insights to help you track spending and income trends.
                </CardContent>
            </Card>
        </div>
    );
}

