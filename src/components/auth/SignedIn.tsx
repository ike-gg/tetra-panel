"use client";

import { type Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { firstLetters } from "~/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
  session: Session;
}

export const SignedIn = ({ session }: Props) => {
  const [loading, setLoading] = useState(false);
  const { name, image } = session.user;

  const authSignOut = async () => {
    setLoading(true);
    await signOut();
  };

  return (
    <>
      <p className="flex items-center gap-2 py-4">
        Signed in as
        <Avatar className="h-7 w-7">
          <AvatarImage src={image ?? ""} />
          <AvatarFallback>{firstLetters(name ?? "Unknown")}</AvatarFallback>
        </Avatar>
        <strong>{name ?? "Unknown"}</strong>
      </p>
      <div className="flex gap-3">
        <Button onClick={authSignOut} size="sm" variant={"secondary"}>
          {loading ? (
            <div className="mr-3 h-5 w-5 animate-spin rounded-full border-[2px] border-neutral-800 border-t-transparent " />
          ) : (
            <ExitIcon className="mr-2 h-4 w-4" />
          )}{" "}
          Sign out
        </Button>
        <Link className={buttonVariants({ size: "sm" })} href="/">
          <EnterIcon className="mr-2 h-4 w-4" /> Continue to Panel
        </Link>
      </div>
    </>
  );
};
