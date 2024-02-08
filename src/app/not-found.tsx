import { GIFS } from "@/assets/gifs";
import BackPage from "@/components/customs/BackPage";
import Image from "next/image";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-600">
        Không tìm thấy trang! <br />{" "}
        <span className="text-5xl text-gray-700 lg:text-6xl">404</span>
      </h1>
      <Image src={GIFS.notfound} alt="notfound" />
      <BackPage className="px-8" />
    </div>
  );
}
