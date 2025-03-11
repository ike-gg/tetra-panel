import Image from "next/image";

export default function OnHoldPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-lg rounded-2xl border border-neutral-100 bg-white p-12 shadow-xl">
        <h1 className="text-2xl font-medium">
          Tetra Panel is currently on hold.
        </h1>
        <i className="text-sm text-neutral-500">But it will be back soon!</i>
        <div className="mt-4 space-y-4">
          <p className="">
            Tetra recently joined over 2,500 servers, which means I need to
            change how the bot works. This requires some code changes, so due to
            this, Panel will be on hold.
          </p>
          <p className="font-bold underline decoration-wavy underline-offset-4">
            But Tetra as a bot will remain active and fully operational.
          </p>
          <p className=" text-neutral-800">
            Im currently working on{" "}
            <span className="from-new-tetra-400 to-new-tetra-800 bg-gradient-to-r bg-clip-text font-bold text-transparent">
              new version of Tetra
            </span>{" "}
            that will be more advanced and have more features. The Panel feature
            will be available again with the new version of Tetra.
          </p>
          <p>Anyway, thanks for visiting and using Tetra :)</p>
        </div>
        <Image
          src="https://cdn.7tv.app/emote/01H3YN7XBG000BH97SCKY1D88B/4x.webp"
          alt="Tetra"
          width={256}
          height={128}
          className="mt-12 w-full rounded-lg"
        />
      </div>
    </div>
  );
}
