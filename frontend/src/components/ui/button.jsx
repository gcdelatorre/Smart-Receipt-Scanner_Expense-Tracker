import { cn } from "../../lib/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50 shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 focus-visible:ring-ring",
  ghost: "text-foreground hover:bg-muted hover:text-accent-foreground",
  outline: "border border-border bg-background hover:bg-muted hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
};

const sizes = {
  sm: "h-9 px-3",
  md: "h-11 px-4",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10",
};

export function Button({ className, variant = "default", size = "md", ...props }) {
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

