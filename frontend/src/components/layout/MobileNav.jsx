import { Link } from "react-router-dom";

export default function MobileNav({ navItems, isActive }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_12px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition ${
                active ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  active ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-500"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

