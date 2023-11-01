import { type ReactNode } from "react";

export default function HomeLayout(props: {
  children: ReactNode;
  tasks: ReactNode;
  guilds: ReactNode;
  savedemotes: ReactNode;
  trendingemotes: ReactNode;
}) {
  return (
    <main className="space-y-6">
      {props.tasks}
      {props.guilds}
      {props.savedemotes}
      {props.children}
      {props.trendingemotes}
    </main>
  );
}
