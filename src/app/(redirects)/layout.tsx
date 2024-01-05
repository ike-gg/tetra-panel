import { ReactNode } from "react";

export default function RedirectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div>{children}</div>
    </main>
  );
}
