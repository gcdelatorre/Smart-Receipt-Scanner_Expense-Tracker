import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Setting({ openSettings, setOpenSettings }) {

    return (
        <Dialog open={openSettings} onOpenChange={setOpenSettings}>
            <DialogContent className="sm:max-w-[500px] border-none shadow-2xl bg-card/95 backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Settings</DialogTitle>
                    <DialogDescription className="text-center">
                        Configure your settings
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}