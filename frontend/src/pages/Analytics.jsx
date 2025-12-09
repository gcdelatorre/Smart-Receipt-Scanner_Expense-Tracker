import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Overview
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900">Analytics</h2>
                    <p className="text-sm text-slate-500">Insights and trends coming soon.</p>
                </div>
                <Badge className="bg-indigo-50 text-indigo-700">Coming soon</Badge>
            </div>

            <Card className="border-dashed border-slate-200 bg-slate-50">
                <CardHeader className="flex flex-col items-center justify-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                        <BarChart3 className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-800">Analytics coming soon</CardTitle>
                </CardHeader>
                <CardContent className="pb-8 text-center text-sm text-slate-600">
                    We’re preparing charts and insights to help you track spending and income trends.
                </CardContent>
            </Card>
        </div>
    );
}

