"use client";

import { useRouter } from "next/navigation";
import { Input } from "./input";

export const Search = () => {
  const router = useRouter();
  return (
    <Input
      type="search"
      placeholder="Search"
      onChange={(e) => router.push(`?search=${e.target.value}`)}
    />
  );
};
