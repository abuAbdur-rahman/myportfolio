import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--accent)] text-white",
        secondary:
          "border-transparent bg-[var(--tag-bg)] text-[var(--tag-text)] border-[var(--tag-border)]",
        outline:
          "border-[var(--border)] text-[var(--text-secondary)]",
        success:
          "border-transparent bg-[var(--accent-dim)] text-[var(--accent-2)]",
        warning:
          "border-transparent bg-[var(--accent-dim)] text-[var(--accent)]",
        destructive:
          "border-transparent bg-[var(--red-dim)] text-[var(--red)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
