"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { getProfileAccount } from "@/store/reducer/auth/auth.reducer";

export default function NavProfile() {
  const params = useParams<{ uid: string }>();
  const profile = useAppSelector((state) => state.auth.profile);
  const account = useAppSelector((state) => state.auth.account);
  const dispatch = useAppDispatch();

  const router = usePathname();

  useEffect(() => {
    if ((!profile && params.uid) || (profile && profile.uid !== params.uid)) {
      dispatch(getProfileAccount({ uid: params.uid }));
    }
  }, []);

  return (
    <div className="-translate-y-[2rem] md:-translate-y-[5rem] flex overflow-x-scroll hidden-scrollbar gap-4 w-full py-2 border-y px-4 md:px-0 border-gray-200">
      <Link
        href={`/account/${params.uid}/products`}
        className={` duration-150`}
      >
        <Button
          className={`text-sm font-medium py-2 px-3 text-truncate text-gray-700 rounded-lg  ${
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
          className={`text-sm font-medium py-2 px-3 text-truncate text-gray-700 rounded-lg  ${
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
          className={`text-sm font-medium py-2 px-3 text-truncate text-gray-700 rounded-lg  ${
            router === `/account/${params.uid}/reviews`
              ? "bg-gray-200"
              : "bg-transparent"
          }`}
        >
          Đánh giá
        </Button>
      </Link>
      {profile?.role === "vip" && account?.uid === profile.uid && (
        <Link
          href={`/account/${params.uid}/donate`}
          className={` duration-150 `}
        >
          <Button
            className={`text-sm font-medium py-2 px-3 text-truncate text-gray-700 rounded-lg  ${
              router === `/account/${params.uid}/donate`
                ? "bg-gray-200"
                : "bg-transparent"
            }`}
          >
            Ủng hộ
          </Button>
        </Link>
      )}
    </div>
  );
}
