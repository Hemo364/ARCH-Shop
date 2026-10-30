export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-85",
  secondary: "border border-border bg-secondary text-foreground hover:border-primary",
  danger: "border border-red-900 bg-red-950/40 text-red-300 hover:bg-red-950",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
};

export function buttonClass(variant: ButtonVariant = "secondary") {
  return `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]}`;
}
