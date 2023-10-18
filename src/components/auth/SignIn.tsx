"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

interface Props {
  provider: ClientSafeProvider;
}

export const SignIn = ({ provider }: Props) => {
  const [loading, setLoading] = useState(false);
  const { id } = provider;

  if (id !== "discord") return null;

  const authDiscord = async () => {
    setLoading(true);
    await signIn(id);
  };

  return (
    <>
      <Button className="my-8 w-fit" disabled={loading} onClick={authDiscord}>
        {loading ? (
          <div className="mr-3 h-5 w-5 animate-spin rounded-full border-[2px] border-white border-t-transparent " />
        ) : (
          <DiscordLogoIcon className="mr-3 h-5 w-5" />
        )}
        Sign in with Discord
      </Button>
      <Accordion className="w-full" type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the Tetra Panel?</AccordionTrigger>
          <AccordionContent className="w-fit">
            The Tetra Panel is an optional extension for the Tetra bot that
            enhances the bot&apos;s capabilities. It provides features such as
            manual adjustment, improved emoji search across all available
            platforms, and a convenient interface for copying emojis from other
            servers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Are there alternative login options?
          </AccordionTrigger>
          <AccordionContent className="w-fit">
            Unfortunately, no. Introducing other login methods wouldn&apos;t
            make sense as the entire application is ultimately built around
            Discord. To use the Tetra Panel, we require essential information
            about your account, allowing us to authenticate you.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What permissions do you require?</AccordionTrigger>
          <AccordionContent className="w-fit">
            We need basic account information and access to your email address
            for authentication purposes. Additionally, we require information
            about the servers you&apos;re part of to understand which servers
            you share with the Tetra bot and what permissions you hold on them.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
