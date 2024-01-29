import Link from "next/link";
import React from "react";

type Props = Readonly<{
  className?: string;
}>;

export default function Logo({ className }: Props) {
  return (
    <Link
      href={"/"}
      className={`flex justify-center items-center ${className}`}
    >
      <h1 className="font-semibold text-2xl tracking-wider text-black">
        NEVSELF
      </h1>
    </Link>
  );
}
