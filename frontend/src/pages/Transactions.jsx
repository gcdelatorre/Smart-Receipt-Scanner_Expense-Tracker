import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Receipt, PlusCircle } from "lucide-react";

export default function TransactionsPage() {
    return (
        <div className="grid gap-5">
            <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Overview
                </p>
                <h1 className="text-2xl font-semibold text-slate-900 leading-snug">Transactions</h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Recent activity across your accounts.
                </p>
            </div>

            <Card className="border-dashed border-slate-200 bg-slate-50">
                <CardHeader className="flex flex-col items-center justify-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                        <Receipt className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-800">No recent transactions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-3 pb-8 text-sm text-slate-600">
                    <p className="text-center max-w-md">
                        You haven’t added any income or expenses yet. Add a new entry to start tracking.
                    </p>
                    <Button className="rounded-xl px-4" disabled>
                        <PlusCircle className="h-5 w-5" />
                        Add a transaction
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

