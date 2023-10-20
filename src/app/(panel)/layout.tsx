import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { firstLetters } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <div>
      <nav className="sticky top-0 border-b border-neutral-200 bg-white shadow-lg shadow-neutral-300/25">
        <div className="mx-auto flex max-w-screen-xl items-center gap-2 p-4">
          <Link href="/" className="items-top flex gap-2">
            <h2 className="font-heading text-3xl">Tetra</h2>
            <Badge className="h-fit w-fit">PANEL</Badge>
          </Link>
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
      <div className="m-4 mx-auto max-w-screen-xl px-4">{children}</div>
    </div>
  );
}
