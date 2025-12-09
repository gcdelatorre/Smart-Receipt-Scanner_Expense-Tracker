import { Aperture } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Link } from "react-router-dom";

function NavItem({ icon: Icon, label, path, active }) {
  return (
    <Link
      to={path}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
        active ? "bg-indigo-50 text-indigo-700 shadow-inner" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

export default function Sidebar({ navItems, isActive }) {
  return (
    <aside className="hidden w-64 flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 lg:flex">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-sm shadow-indigo-100">
            <Aperture className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">TrackWise</p>
            <p className="text-xs text-slate-500">Budget &amp; Finance</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} active={isActive(item.path)} />
          ))}
        </div>
      </div>

      <Card className="border-0 bg-indigo-600 text-white shadow-lg shadow-indigo-100">
        <CardContent className="flex items-center gap-3 p-4">
          <Avatar className="h-12 w-12 bg-indigo-900 text-white border">AD</Avatar>
          <div className="flex-1 space-y-0.5">
            <p className="text-sm font-semibold text-slate-900 leading-tight">Alex Doe</p>
            <p className="text-xs text-slate-500 leading-tight">alex@example.com</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

