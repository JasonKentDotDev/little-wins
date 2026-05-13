import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:bg-slate-800 dark:bg-white dark:text-slate-950",
        gradient: "bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 text-white shadow-lg shadow-fuchsia-500/25",
        ghost: "bg-white/60 text-slate-700 hover:bg-white dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15",
        outline: "border border-white/30 bg-white/50 text-slate-800 backdrop-blur hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:text-white",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
