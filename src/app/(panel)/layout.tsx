import Link from "next/link";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { routes } from "~/constants/routes";
import { firstLetters } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

export default async function PanelLayout({
  children,
  context,
}: {
  children: ReactNode;
  context: ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) redirect(routes.auth);

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 border-b border-neutral-200 bg-white shadow-lg shadow-neutral-300/25">
        <div className="mx-auto flex max-w-screen-xl items-center gap-2 p-4">
          <Link href="/" className="items-top flex gap-2">
            <h2 className="font-heading text-3xl">Tetra</h2>
            <Badge className="h-fit w-fit">PANEL</Badge>
          </Link>
          {context}
          <Link
            href="/user"
            className={buttonVariants({
              className: "ml-auto",
              variant: "outline",
            })}
          >
            <Avatar className="mr-2 h-7 w-7">
              <AvatarImage src={session?.user.image ?? ""} />
              <AvatarFallback>
                {firstLetters(session?.user.name ?? "Unknown")}
              </AvatarFallback>
            </Avatar>
            <p>{session?.user.name}</p>{" "}
          </Link>
        </div>
      </nav>
      <div className="m-6 mx-auto h-full min-h-[calc(100vh-16rem)] max-w-screen-xl px-4">
        {children}
      </div>
      <footer className="border-t-2">
        <div className="mx-auto max-w-screen-xl px-4">
          fooooooooter soooooon
        </div>
      </footer>
    </div>
  );
}
