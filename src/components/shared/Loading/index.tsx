import { GIFS } from "@/assets/gifs";
import Image from "next/image";
import React from "react";

type Props = {
  kind?: "load-web" | "load-action" | "load-page";
};

export default function Loading({ kind = "load-web" }: Props) {
  if (kind === "load-action") {
    return (
      <div className="z-50 fixed top-0 left-0 w-full h-1">
        <div className="w-full h-full loading-action"></div>
      </div>
    );
  }

  return (
    <div className=" h-screen flex justify-center items-center bg-white">
      <Image src={GIFS.loading} alt="loading" width={100} height={100} />
    </div>
  );
}
