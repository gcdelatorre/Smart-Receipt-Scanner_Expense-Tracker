import { Aperture } from "lucide-react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useAuth } from "../../contexts/AuthContext";
import logo from "/TrackWise-Logo-removebg-preview.png";

function NavItem({ icon: Icon, label, path, active }) {
  return (
    <Link
      to={path}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? "bg-indigo-50 text-indigo-700 shadow-inner" : "text-slate-600 hover:bg-slate-50"
        }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

export default function Sidebar({ navItems, isActive }) {
  const { user } = useAuth();

  return (
    <aside className="hidden lg:flex h-[95vh] w-64 flex-col sticky top-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
      <div className="flex-1 space-y-8 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-full -ml-4 items-center justify-center rounded-2xl">
            <img src={logo} alt="TrackWise Logo" />
          </div>
        </div>
        <div className="space-y-1.5">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} active={isActive(item.path)} />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 mt-auto">
        <UserDropdown user={user} />
      </div>
    </aside>
  );
}

