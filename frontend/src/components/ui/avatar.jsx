import { cn } from "../../lib/utils";

export function Avatar({ className, children }) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700",
        className
      )}
    >
      {children}
    </div>
  );
}

