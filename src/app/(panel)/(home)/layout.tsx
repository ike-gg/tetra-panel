import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function HomeLayout(props: {
  children: ReactNode;
  tasks: ReactNode;
  guilds: ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) redirect("/auth");

  return (
    <main className="space-y-6">
      {props.tasks}
      {props.guilds}
      {props.children}
    </main>
  );
}
