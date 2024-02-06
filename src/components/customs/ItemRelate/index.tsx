import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  image: string;
  name: string;
  uid_creator: string;
  uuid: string;
};

export default function ItemRelate({ image, name, uid_creator, uuid }: Props) {
  return (
    <Link
      href={`/account/${uid_creator}/products/${uuid}`}
      className="w-full h-[25vh] active:scale-95 duration-150 relative group rounded-2xl overflow-hidden"
    >
      <Image
        src={image}
        alt={name}
        width={1440}
        height={1200}
        className="w-full h-full object-cover"
      />
      <div className="opacity-0 p-4 flex justify-start items-end absolute top-0 left-0 w-full h-full group-hover:opacity-100 duration-150 bg-gradient-to-t from-[#00000098]">
        <h1 className="text-white font-medium text-base line-clamp-1">
          {name}
        </h1>
      </div>
    </Link>
  );
}
