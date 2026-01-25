import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "next-themes";
import lightLogo from "/TrackWise-Logo-removebg-preview.png";
import darkLogo from "/logo-dark-mode.png";

function NavItem({ icon: Icon, label, path, active }) {
  return (
    <Link
      to={path}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? "bg-primary/10 text-primary shadow-inner" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

export default function Sidebar({ navItems, isActive }) {
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();

  return (
    <aside className="hidden lg:flex h-[95vh] w-64 flex-col sticky top-0 rounded-3xl border bg-card pt-2 px-6 pb-6 shadow-sm">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-24 w-full -ml-4 items-center justify-start rounded-2xl">
            <img
              src={resolvedTheme === 'dark' ? darkLogo : lightLogo}
              alt="TrackWise Logo"
              className="max-h-full w-auto object-contain"
            />
          </div>
        </div>
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} active={isActive(item.path)} />
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4 mt-auto">
        <UserDropdown user={user} />
      </div>
    </aside>
  );
}

