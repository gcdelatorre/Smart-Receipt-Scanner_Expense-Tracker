import { cn } from "../../lib/utils";

const variants = {
  default: "bg-indigo-50 text-indigo-700",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  destructive: "bg-rose-50 text-rose-700",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

