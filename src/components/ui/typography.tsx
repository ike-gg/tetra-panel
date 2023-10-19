import { ReactNode } from "react";
import { cn } from "~/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className }: TypographyProps) {
  return (
    <p
      className={cn("text-sm leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}jects were, realized the error of his ways and repealed the joke
      tax.
    </p>
  );
}

export function TypographyLead({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-lg text-muted-foreground", className)}>
      {children} important content and expects a response.
    </p>
  );
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return <div className={cn("font-semibold", className)}>{children}</div>;
}

export function TypographySmall({ children, className }: TypographyProps) {
  return (
    <small className={cn("text-xs font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>
  );
}
