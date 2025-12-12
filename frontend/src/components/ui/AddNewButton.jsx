import { Plus } from "lucide-react";
import { Button } from "./button";

export default function AddNewButton({ onAdd }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="h-11 rounded-xl px-4" onClick={onAdd}>
                <Plus className="h-5 w-5" />
                Add New
            </Button>
        </div>
    )
}