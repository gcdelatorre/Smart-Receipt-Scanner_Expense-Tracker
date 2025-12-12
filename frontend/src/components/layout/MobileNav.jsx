import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function MobileNav({ navItems, isActive, onLogout, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const username = user?.username || "User";
  const email = user?.email || "user@example.com";
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg lg:hidden hover:bg-indigo-700 transition"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content */}
          <div className="fixed inset-x-0 bottom-0 z-40 max-h-[90vh] overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white shadow-2xl lg:hidden">
            <div className="space-y-2 p-6">
              {/* User Profile */}
              <div className="flex items-center gap-3 rounded-2xl bg-indigo-50 p-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                  {initials}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{username}</p>
                  <p className="text-xs text-slate-500">{email}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2 border-b border-slate-200 pb-6">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition ${
                        active
                          ? "bg-indigo-50 text-indigo-700 shadow-inner"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full rounded-2xl bg-red-50 px-4 py-3 text-left text-base font-medium text-red-700 hover:bg-red-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

