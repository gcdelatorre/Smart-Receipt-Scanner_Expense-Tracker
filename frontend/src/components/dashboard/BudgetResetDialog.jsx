import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";

export default function BudgetResetDialog({ open, onOpenChange }) {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <CalendarClock className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-center text-xl">Monthly Budget Reset</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        Welcome back! It's a brand new month.
                        <br />
                        Your accumulated spending has been reset for <strong>{currentMonth}</strong>.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center mt-4">
                    <Button type="button" className="w-full sm:w-auto min-w-[120px]" onClick={() => onOpenChange(false)}>
                        Got it
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
