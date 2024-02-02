"use client";

import { IMAGES } from "@/assets/imgs";
import View from "@/components/motions/View";
import { Each } from "@/helper/Each";
import { useAppDispatch } from "@/hooks/useRedux";
import { AuthAction } from "@/store/reducer/auth/auth.reducer";
import { User } from "@/store/reducer/auth/auth.type";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  account: User;
};

export default function Account(props: Props) {
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const dispatch = useAppDispatch();

  const dataMenu = [
    {
      lable: "Tài khoản",
      icon: <IonIcon name="person" className="text-lg" />,
      link: `/account/${props.account?.uid}/products`,
    },
  ];

  return (
    <div className="flex gap-2 items-center relative md:border-l md:border-gray-300 md:pl-6">
      {isShowMenu && (
        <View
          className="absolute right-[-3.5rem] md:right-0 top-full flex flex-col gap-2 translate-y-[10%] text-black bg-white border border-gray-100 w-[200%] px-2 py-2 rounded-xl text-sm shadow-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 18 }}
          transition={{ duration: 0.3 }}
          variants={{
            open: { opacity: 1, y: 0 },
            closed: { opacity: 0, y: -10 },
          }}
        >
          {
            <Each
              of={dataMenu}
              render={(item, index) => (
                <Link
                  href={item.link}
                  className="flex gap-4 items-center text-gray-800 duration-150 hover:bg-gray-200 px-2 py-2 rounded-lg"
                  onClick={() => setIsShowMenu(false)}
                >
                  {item.icon}
                  <p>{item.lable}</p>
                </Link>
              )}
            />
          }
          <Link
            href={"/login"}
            className="flex gap-4 items-center text-gray-800 px-2 py-2 hover:bg-gray-200 rounded-lg"
            onClick={() => {
              dispatch(AuthAction.logout());
            }}
          >
            <IonIcon name="log-out" className="text-lg" />
            <p>Đăng xuất</p>
          </Link>
        </View>
      )}
      <div>
        <h1 className="text-sm font-semibold text-gray-800">
          {props?.account?.displayName
            ? props?.account?.displayName
            : "Anonymous"}
        </h1>
      </div>
      <View
        className="flex justify-center items-center w-[2.5rem] cursor-pointer h-[2.5rem] shadow-primary border border-gray-400 overflow-hidden rounded-full "
        onClick={() => setIsShowMenu(!isShowMenu)}
      >
        <Image
          src={props?.account?.avatar ? props?.account?.avatar : IMAGES.avatar}
          width={64}
          height={64}
          alt={props?.account?.username ? props?.account?.username : ""}
          className="w-full h-full rounded-full object-cover"
        />
      </View>
    </div>
  );
}
