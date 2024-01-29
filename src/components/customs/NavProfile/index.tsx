"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function NavProfile() {
  const params = useParams<{ uid: string }>();

  const router = usePathname();

  return (
    <div className="-translate-y-[2rem] md:-translate-y-[5rem] flex gap-4 w-full py-4 border-y px-4 border-gray-200">
      <Link
        href={`/account/${params.uid}/products`}
        className={` py-2 px-6 text-sm font-medium duration-150 rounded-full ${
          router === `/account/${params.uid}/products`
            ? "bg-gray-200"
            : "bg-transparent"
        }`}
      >
        Sản phẩm
      </Link>
      <Link
        href={`/account/${params.uid}/profile`}
        className={` py-2 px-6 text-sm font-medium duration-150 rounded-full ${
          router === `/account/${params.uid}/profile`
            ? "bg-gray-200"
            : "bg-transparent"
        }`}
      >
        Giới thiệu
      </Link>
      <Link
        href={`/account/${params.uid}/reviews`}
        className={` py-2 px-6 text-sm font-medium duration-150 rounded-full ${
          router === `/account/${params.uid}/reviews`
            ? "bg-gray-200"
            : "bg-transparent"
        }`}
      >
        Đánh giá
      </Link>
    </div>
  );
}
