"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  likeProfileAccount,
  removeLikeProfileAccount,
  updateAvatarAccount,
} from "@/store/reducer/auth/auth.reducer";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import UpdateInfo from "./UpdateInfo";
import { Each } from "@/helper/Each";
import Notification from "./Notification";
import { IMAGES } from "@/assets/imgs";
import { toast } from "react-toastify";
import Spiner from "../Spiner";

export default function Profile() {
  const account = useAppSelector((state) => state.auth.account);
  const profile = useAppSelector((state) => state.auth.profile);
  const loading = useAppSelector((state) => state.auth.loading);

  const [isUpdateInfo, setIsUpdateInfo] = React.useState(false);
  const [isShowNotification, setIsShowNotification] = React.useState(false);

  const [isAvatarUrl, setIsAvatarUrl] = React.useState<any>(null);

  const dispatch = useAppDispatch();

  return (
    <>
      {isUpdateInfo && (
        <UpdateInfo account={profile} close={() => setIsUpdateInfo(false)} />
      )}
      {account?.uid && profile && isShowNotification && (
        <Notification
          uid_account={account?.uid}
          profile={profile}
          close={() => setIsShowNotification(false)}
        />
      )}
      <div className=" -translate-y-[4rem] md:-translate-y-[6rem]  flex flex-col items-center relative gap-2">
        <div
          className={` w-[6rem] h-[6rem] relative md:w-[7rem] md:h-[7rem] shadow-primary border-2  z-10 rounded-full ${
            profile?.role === "vip" ? "border-blue-500" : "border-white"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            name="avatar"
            onChange={(e: any) => {
              if (e.target.files[0]) {
                setIsAvatarUrl(e.target.files[0]);
              }
            }}
            id="avatar"
          />
          <Image
            src={
              isAvatarUrl
                ? URL.createObjectURL(isAvatarUrl)
                : profile?.avatar
                ? profile?.avatar
                : IMAGES.avatar
            }
            className="w-full h-full object-cover rounded-full"
            width={500}
            height={500}
            alt={profile?.displayName ? profile?.displayName : ""}
          />
          {account?.uid === profile?.uid && (
            <label
              htmlFor="avatar"
              className="absolute flex justify-center items-center cursor-pointer right-0 bottom-0 z-10 p-1 rounded-full border border-blue-400  bg-white"
            >
              <IonIcon name="pencil" className="text-base text-gray-800" />
            </label>
          )}
        </div>
        {isAvatarUrl && (
          <Button
            className="text-sm bg-blue-600 py-1 px-4 rounded-lg mt-2 text-white font-medium"
            onClick={() => {
              dispatch(updateAvatarAccount({ isAvatarUrl, uid: account?.uid }));
              setIsAvatarUrl(null);
            }}
          >
            Lưu
          </Button>
        )}
        <div className="flex flex-col items-center ">
          <h1 className="font-semibold text-lg flex items-center">
            <span>
              {profile?.displayName ? profile?.displayName : "Anonymous"}{" "}
            </span>
            <span className="text-sm text-gray-700 font-medium">
              (#{profile?.username}){" "}
            </span>{" "}
            {profile?.role === "vip" && (
              <span className="flex justify-center items-center ml-2">
                <IonIcon name="checkmark-circle" className="text-blue-500" />
              </span>
            )}
          </h1>
          {profile?.tags && profile?.tags?.length > 0 && (
            <div className="text-gray-600 mt-2 flex gap-3 text-sm">
              {
                <Each
                  of={profile?.tags}
                  render={(item, index) => (
                    <span className="py-1 px-3 rounded-full bg-gray-100">
                      #{item.name}
                    </span>
                  )}
                />
              }
            </div>
          )}
          {profile?.introduction && (
            <div className="mt-6 max-w-[20rem] text-center">
              <i className="text-sm text-gray-700  ">
                &quot; {profile?.introduction}&quot;
              </i>
            </div>
          )}
        </div>
        <div className="md:absolute mt-6 md:mt-0 left-0 top-[5rem] items-center flex gap-2">
          {account?.uid === profile?.uid && (
            <Button
              className="text-sm font-medium px-4"
              kind="primary"
              onClick={() => setIsUpdateInfo(true)}
            >
              Chỉnh sửa
            </Button>
          )}
          {account?.uid === profile?.uid && (
            <Button
              className="text-sm font-medium border border-gray-200 w-[2.2rem] h-[2.2rem] rounded-xl shadow-primary "
              onClick={() => setIsShowNotification(true)}
            >
              <IonIcon name="notifications" className="text-base " />
            </Button>
          )}
          {loading ? (
            <Button
              className="text-sm font-medium border border-gray-200 w-[2.2rem] h-[2.2rem] rounded-xl shadow-primary bg-white"
              disabled
            >
              <Spiner />
            </Button>
          ) : (
            <Button
              className={`text-sm font-medium border border-gray-200 w-[2.2rem] h-[2.2rem] rounded-xl shadow-primary  ${
                profile?.likes?.find((item) => item === account?.uid)
                  ? "bg-red-500 text-white"
                  : "bg-white text-red-500"
              }`}
              onClick={() => {
                const payload = {
                  uid_like: account?.uid,
                  uid_profile: profile?.uid,
                };

                if (account?.uid && profile?.uid) {
                  if (profile?.likes?.find((item) => item === account?.uid)) {
                    dispatch(removeLikeProfileAccount(payload));
                  } else {
                    dispatch(likeProfileAccount(payload));
                  }
                } else {
                  toast.error("Vui lòng đăng nhập để có thể thích");
                }
              }}
            >
              {profile?.likes?.find((item) => item === account?.uid) ? (
                <IonIcon name="heart" className="text-base" />
              ) : (
                <IonIcon name="heart-outline" className="text-base" />
              )}
            </Button>
          )}
          <span className="flex justify-center items-center w-[2.2rem] shadow-primary text-sm font-bold text-red-500 h-[2.2rem] rounded-xl border border-gray-200">
            {profile?.likes?.length ? profile?.likes?.length : 0}
          </span>
        </div>
      </div>
    </>
  );
}
