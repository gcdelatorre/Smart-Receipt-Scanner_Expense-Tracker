import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

// i will be compiling the tree modals here, each has own payload states and handled when submit from the parent container

export function AddIncomeModal({ open, onOpenChange }) {

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogTitle>Add Income</DialogTitle>
                    <DialogDescription>
                        <Input
                            type="number"
                            placeholder="0.00"
                        />
                    </DialogDescription>
                    <DialogClose>
                        <Button
                            variant="ghost"
                        >
                            Back
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    )
}
