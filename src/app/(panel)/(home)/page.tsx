/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Spinner } from "~/components/ui/spinner";

export default function Home() {
  return (
    <div className="flex items-center gap-2 mix-blend-difference">
      <Spinner />
    </div>
  );
}
