import { type AnchorHTMLAttributes, forwardRef } from "react";

import { cn } from "~/lib/utils";

const ExLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, children, ...props }, ref) => {
  return (
    <a
      className={cn(
        "text-sm opacity-60 transition-opacity hover:opacity-100",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </a>
  );
});
ExLink.displayName = "External Link";

export { ExLink };
