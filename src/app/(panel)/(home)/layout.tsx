import { type ReactNode } from "react";

export default function HomeLayout(props: {
  children: ReactNode;
  tasks: ReactNode;
  guilds: ReactNode;
}) {
  return (
    <main className="space-y-6">
      {props.tasks}
      {props.guilds}
      {props.children}
    </main>
  );
}
