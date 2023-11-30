import { type ReactNode } from "react";

interface LibraryLayoutProps {
  children: ReactNode;
}

export default function LibraryLayout({ children }: LibraryLayoutProps) {
  return <div className="space-y-4">{children}</div>;
}
