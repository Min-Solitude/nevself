"use client";

import { Each } from "@/helper/Each";
import Button from "@/components/customs/Button";
import Close from "@/components/customs/Close";
import View from "@/components/motions/View";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";
import React from "react";
import Logo from "../Logo";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Account from "../Account";
import { AuthAction } from "@/store/reducer/auth/auth.reducer";

const dataNavlink = [
  {
    id: 1,
    name: "Đặc trưng",
    link: "/features",
  },
  {
    id: 2,
    name: "FAQ",
    link: "/faq",
  },
  {
    id: 3,
    name: "Liên hệ",
    link: "/contact",
  },
];

export default function Navlink() {
  const [isShowMenu, setIsShowMenu] = React.useState(false);

  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.auth.account);

  return (
    <nav className=" flex items-center gap-4 md:gap-8 justify-end">
      <ul className="hidden md:flex items-center gap-8">
        <Each
          of={dataNavlink}
          render={(item, index) => (
            <li className="w-full flex justify-center">
              <Link
                href={item.link}
                className="cursor-pointer flex justify-center items-center duration-150 hover:underline"
              >
                <span className="font-medium text-gray-900 text-sm text-truncate">
                  {item.name}
                </span>
              </Link>
            </li>
          )}
        />
      </ul>

      {account ? (
        <Account account={account} />
      ) : (
        <Link href={"/login"} className="flex justify-center items-center">
          <Button kind="primary-dark" className="px-4">
            <span className="font-medium text-sm">Đăng nhập</span>
          </Button>
        </Link>
      )}

      <Button
        kind="primary"
        onClick={() => setIsShowMenu(true)}
        className="md:hidden"
      >
        <IonIcon name="menu" className="text-2xl text-gray-900" />
      </Button>
      {isShowMenu && (
        <View
          className="fixed z-40 top-0 left-0 bottom-0 py-4 px-8 flex flex-col gap-4 right-0 bg-white md:hidden"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: 100 },
          }}
        >
          <div className="w-full items-center flex justify-between py-4">
            <Logo />
            <Close onClick={() => setIsShowMenu(false)} />
          </div>
          <ul className=" h-full flex flex-col gap-8 items-center">
            <Each
              of={dataNavlink}
              render={(item, index) => (
                <li className="w-full flex justify-center">
                  <Link
                    href={item.link}
                    className="w-full text-center bg-gray-100 duration-150 active:scale-95 cursor-pointer border border-gray-200 flex justify-center items-center py-2 rounded-xl"
                  >
                    <span className="font-medium text-sm text-gray-900">
                      {item.name}
                    </span>
                  </Link>
                </li>
              )}
            />
            {account && (
              <li className="w-full flex justify-center md:hidden">
                <Link
                  href={`/login`}
                  className="w-full text-center bg-black  duration-150 active:scale-95 cursor-pointer border border-gray-200 flex justify-center items-center py-2 rounded-xl"
                  onClick={() => {
                    dispatch(AuthAction.logout());
                  }}
                >
                  <span className="font-medium text-sm text-white">
                    Đăng xuất
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </View>
      )}
    </nav>
  );
}
