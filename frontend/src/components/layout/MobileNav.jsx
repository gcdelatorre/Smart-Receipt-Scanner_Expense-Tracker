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
        className="fixed top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg lg:hidden hover:opacity-90 transition"
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
          <div className="fixed inset-x-0 bottom-0 z-40 max-h-[90vh] overflow-y-auto rounded-t-3xl border-t border-border bg-card shadow-2xl lg:hidden">
            <div className="space-y-2 p-6">
              {/* User Profile */}
              <div className="flex items-center gap-3 rounded-2xl bg-muted p-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {initials}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{username}</p>
                  <p className="text-xs text-muted-foreground">{email}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2 border-b border-border pb-6">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition ${active
                        ? "bg-primary/10 text-primary shadow-inner"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
                className="w-full rounded-2xl bg-destructive/10 px-4 py-3 text-left text-base font-medium text-destructive hover:bg-destructive/20 transition"
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

