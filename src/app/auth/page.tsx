import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { FileTextIcon } from "lucide-react";
import { getProviders } from "next-auth/react";
import { SignIn } from "~/components/auth/SignIn";
import { SignedIn } from "~/components/auth/SignedIn";
import { Badge } from "~/components/ui/badge";
import { ExLink } from "~/components/ui/exlink";
import { getServerAuthSession } from "~/server/auth";

export default async function AuthSignin() {
  const providers = await getProviders();
  const session = await getServerAuthSession();

  const discordProvider = providers?.discord;

  return (
    <div className="flex h-screen w-screen">
      <div className="from-tetra-200 to-tetra-900 via-tetra-100 relative flex-1 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]">
        <div className="bg-grainy absolute h-full w-full opacity-60 brightness-100 contrast-150" />
      </div>
      <main className="flex h-full w-full max-w-xl flex-col overflow-y-auto overflow-x-hidden px-8">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="items-top flex gap-2">
            <h1 className="font-heading text-6xl">Tetra</h1>
            <Badge className="h-fit w-fit">PANEL</Badge>
          </div>
          {!session && discordProvider && <SignIn provider={discordProvider} />}
          {session && <SignedIn session={session} />}
        </div>
        <div className="flex items-center justify-center gap-6 py-8">
          <ExLink
            target="_blank"
            href="https://github.com/ike-gg/Tetra"
            className="flex items-center gap-2"
          >
            <GitHubLogoIcon className="h-4 w-4" /> GitHub
          </ExLink>
          <ExLink
            target="_blank"
            href="https://discord.com/api/oauth2/authorize?client_id=1029899066911490158&permissions=413390915648&scope=applications.commands%20bot"
            className="flex items-center gap-2"
          >
            <DiscordLogoIcon className="h-4 w-4" /> Invite bot
          </ExLink>
          <ExLink
            target="_blank"
            href="https://raw.githubusercontent.com/ike-gg/Tetra/main/privacy-policy.md"
            className="flex items-center gap-2"
          >
            <FileTextIcon className="h-4 w-4" /> Privacy policy
          </ExLink>
        </div>
      </main>
    </div>
  );
}
