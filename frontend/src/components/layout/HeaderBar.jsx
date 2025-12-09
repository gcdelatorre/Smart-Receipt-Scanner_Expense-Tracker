import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function HeaderBar({ pageTitle, onAdd }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="hidden md:block">
        <p className="text-sm font-medium text-slate-500">{pageTitle}</p>
      </div>
      <div className="md:hidden">
        <p className="text-base font-semibold text-slate-900">{pageTitle}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search transactions..." className="pl-11" />
        </div>
        <Button className="h-11 rounded-xl px-4" onClick={onAdd}>
          <Plus className="h-5 w-5" />
          Add New
        </Button>
      </div>
    </div>
  );
}

