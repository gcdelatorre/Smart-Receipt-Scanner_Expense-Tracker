import { Search } from "lucide-react";
import { Input } from "./input";

export default function SearchTransaction() {
    return (
        <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search transactions..." className="pl-11" />
        </div>
    )
}