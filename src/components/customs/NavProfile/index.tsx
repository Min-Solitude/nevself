"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import Button from "../Button";

export default function NavProfile() {
  const params = useParams<{ uid: string }>();

  const router = usePathname();

  return (
    <div className="-translate-y-[2rem] md:-translate-y-[5rem] flex gap-4 w-full py-2 border-y px-4 md:px-0 border-gray-200">
      <Link
        href={`/account/${params.uid}/products`}
        className={` duration-150`}
      >
        <Button
          className={`text-sm font-medium py-2 px-3 text-gray-700 rounded-lg  ${
            router === `/account/${params.uid}/products`
              ? "bg-gray-200"
              : "bg-transparent"
          }`}
        >
          Sản phẩm
        </Button>
      </Link>
      <Link href={`/account/${params.uid}/profile`} className={` duration-150`}>
        <Button
          className={`text-sm font-medium py-2 px-3 text-gray-700 rounded-lg  ${
            router === `/account/${params.uid}/profile`
              ? "bg-gray-200"
              : "bg-transparent"
          }`}
        >
          Giới thiệu
        </Button>
      </Link>
      <Link
        href={`/account/${params.uid}/reviews`}
        className={` duration-150 `}
      >
        <Button
          className={`text-sm font-medium py-2 px-3 text-gray-700 rounded-lg  ${
            router === `/account/${params.uid}/reviews`
              ? "bg-gray-200"
              : "bg-transparent"
          }`}
        >
          Đánh giá
        </Button>
      </Link>
    </div>
  );
}
