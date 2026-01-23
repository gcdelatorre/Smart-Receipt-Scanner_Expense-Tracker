import { Search } from "lucide-react";
import { Input } from "./input";

export default function SearchTransaction({ search, setSearch }) {
    return (
        <div className="relative w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions..." 
                className="pl-10 h-10" />
        </div>
    )
}