"use client";

import { UserContextMenuCommandInteraction } from "discord.js";
import { Fragment } from "react";
import { useEmoteContextStore } from "~/app/store/emoteContextStore";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

const ALL_LINKS = [
  {
    name: "Emote library",
    links: [
      {
        name: "Search 7TV emotes",
        href: "/library",
        description: "Search through 7TV emotes library.",
      },
      {
        name: "Search channel emotes",
        href: "/library",
        description: "Search through twitch channel emotes.",
      },
      {
        name: "Search twitch emotes",
        href: "/library",
        description: "Search through twitch emotes.",
      },
    ],
  },
  {
    name: "Test",
    links: [
      {
        name: "Search 7TV emotes",
        href: "/library",
        description: "Search through 7TV emotes library.",
      },
    ],
  },
] as const;

export const Nav = () => {
  const guilds = useEmoteContextStore((s) => s.guilds);
  return (
    <>
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {ALL_LINKS.map((group) => (
              <NavigationMenuItem key={group.name + "nav"}>
                <NavigationMenuTrigger>{group.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[450px] p-4">
                    {group.links.map((link) => (
                      <NavigationMenuLink
                        className="block p-2 hover:bg-muted"
                        key={link.href + group.name}
                        href={link.href}
                      >
                        <h3>{link.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Your guilds</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {guilds?.map((guild) => (
                    <li key={guild.id}>
                      <NavigationMenuLink
                        className="block p-2 hover:bg-muted"
                        href={`/guild/${guild.id}`}
                      >
                        <h3>{guild.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {guild.id}
                        </p>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="md:hidden">witam.</div>
    </>
  );
};
