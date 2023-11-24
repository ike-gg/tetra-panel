import { type ReactNode } from "react";

interface LibraryLayoutProps {
  children: ReactNode;
  seventv: ReactNode;
  bttv: ReactNode;
  ffz: ReactNode;
}

export default function LibraryLayout({
  bttv,
  children,
  ffz,
  seventv,
}: LibraryLayoutProps) {
  return (
    <div className="space-y-4">
      {children}
      {seventv}
      {bttv}
      {ffz}
    </div>
  );
}
