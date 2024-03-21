/* eslint-disable @next/next/no-img-element */
"use client";

import { useGuildStore } from "~/app/store/guildStore";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { getGuildIcon } from "~/lib/utils";
import { SevenTVLogo } from "../icons/SevenTVLogo";
import { BTTVLogo } from "../icons/BTTVLogo";
import { FFZLogo } from "../icons/FFZLogo";

const ALL_LINKS = [
  {
    name: "Emote library",
    links: [
      {
        name: "Search emotes",
        href: "/library",
        description: "7TV, BTTV, FFZ.",
      },
    ],
  },
] as const;

const EMOTE_RPOVIDERS = [
  {
    name: "7TV",
    icon: SevenTVLogo,
    href: "/library?provider=7tv",
  },
  {
    name: "BTTV",
    icon: BTTVLogo,
    href: "/library?provider=bttv",
  },
  {
    name: "FFZ",
    icon: FFZLogo,
    href: "/library?provider=ffz",
  },
] as const;

export const Nav = () => {
  const guilds = useGuildStore((s) => s.guilds);
  return (
    <>
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {ALL_LINKS.map((group) => (
              <NavigationMenuItem
                className="![&>*~p]:bg-pink-300/50"
                key={group.name + "nav"}
              >
                <NavigationMenuTrigger>{group.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-80 flex-col gap-4 p-4">
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
                    <div className="flex gap-4">
                      {EMOTE_RPOVIDERS.map(({ href, icon: Icon, name }) => (
                        <NavigationMenuLink
                          className="group flex-1 space-y-2 p-3 text-xs text-muted-foreground hover:bg-muted"
                          href={href}
                          key={href}
                        >
                          <Icon className="size-8 fill-neutral-300 group-hover:fill-neutral-500" />
                          <p>{name}</p>
                        </NavigationMenuLink>
                      ))}
                    </div>
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
                        className="flex items-center gap-2 p-2 hover:bg-muted"
                        href={`/guild/${guild.id}`}
                      >
                        {guild.icon && (
                          <img
                            alt={guild.name + " guild icon"}
                            className="rounded-full"
                            src={getGuildIcon(guild.id, guild.icon, {
                              size: 32,
                            })}
                          />
                        )}
                        <h3>{guild.name}</h3>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="md:hidden">mobile nav soon</div>
    </>
  );
};
