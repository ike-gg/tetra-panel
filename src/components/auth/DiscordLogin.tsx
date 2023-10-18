"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

interface Props {
  provider: ClientSafeProvider;
}

export const DiscordLogin = ({ provider }: Props) => {
  const { id, name } = provider;
  if (id !== "discord") return null;

  const providerLogin = async () => {
    await signIn(id);
  };

  return (
    <Button onClick={providerLogin}>
      <DiscordLogoIcon className="mr-2 h-4 w-4" /> {name}
    </Button>
  );
};
