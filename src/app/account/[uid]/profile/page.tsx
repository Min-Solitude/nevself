"use client";

import Button from "@/components/customs/Button";
import { useAppSelector } from "@/hooks/useRedux";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import React from "react";
import UpdateProfile from "./components/UpdateProfile";
import CreateProfile from "./components/CreateProfile";
import { Each } from "@/helper/Each";
import { IMAGES } from "@/assets/imgs";

export default function ProfileWPage() {
  const account = useAppSelector((state) => state.auth.account);
  const profile = useAppSelector((state) => state.auth.profile);

  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isCreate, setIsCreate] = React.useState(false);

  function formatDate(isoDate: any) {
    const date = new Date(isoDate);

    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }

  return (
    <div className="w-full">
      {isUpdate && (
        <UpdateProfile
          close={() => setIsUpdate(false)}
          profile={profile}
          uid_updater={account?.uid || ""}
        />
      )}
      {isCreate && (
        <CreateProfile
          close={() => setIsCreate(false)}
          profile={profile}
          uid_creator={account?.uid || ""}
        />
      )}
      {account?.uid === profile?.uid && (
        <div className="mb-4 md:mb-8 w-full flex justify-end">
          {profile?.information ? (
            <Button
              kind="primary"
              className="px-4"
              onClick={() => setIsUpdate(true)}
            >
              <span className="font-medium">Chỉnh sửa</span>
            </Button>
          ) : (
            <Button kind="primary" className="px-4">
              <span className="font-medium" onClick={() => setIsCreate(true)}>
                Tạo thông tin
              </span>
            </Button>
          )}
        </div>
      )}
      <div className="w-full text-sm flex flex-col gap-4  md:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <h1 className="font-medium text-gray-800  underline">Tiểu sử</h1>
          <p>
            {profile?.information?.story ||
              "Chưa có thông tin tiểu sử nào cho người dùng này"}
          </p>
          <h1 className="font-medium text-gray-800 text-sm  underline">
            Kinh nghiệm làm việc
          </h1>
          <div className="w-full flex flex-wrap gap-2">
            {profile?.information?.skills &&
            profile?.information?.skills.length > 0 ? (
              <Each
                of={profile?.information?.skills || []}
                render={(item, index) => (
                  <span
                    key={index}
                    className="py-1 px-3 font-medium rounded-lg bg-gray-200 text-gray-600"
                  >
                    {item}
                  </span>
                )}
              />
            ) : (
              <div>
                <p>Chưa cập nhật</p>
              </div>
            )}
          </div>
          {profile?.role === "vip" && (
            <div className="w-full my-8 flex justify-center md:justify-start">
              <Image src={IMAGES.stamp} width={200} height={200} alt="" />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col flex-1 gap-4">
          <div className="p-4 rounded-lg flex flex-col gap-4 bg-gray-100 text-gray-800">
            <div className="flex gap-2 items-center">
              <IonIcon name="location-outline" className="text-2xl" />
              <p className="">
                {profile?.information?.info?.location || "Chưa cập nhật"}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <IonIcon name="mail-outline" className="text-2xl" />
              <p className="">
                {profile?.information?.info?.mail || "Chưa cập nhật"}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <IonIcon name="globe-outline" className="text-2xl" />
              <p className="">
                Tham gia vào:{" "}
                {profile?.information?.info?.joinAt
                  ? formatDate(profile?.information?.info?.joinAt)
                  : "Chưa cập nhật"}
              </p>
            </div>
          </div>
          <div className="rounded-lg h-[40vh] bg-slate-500 overflow-hidden">
            <Image
              src={
                "https://i.pinimg.com/564x/78/90/42/789042c3c2633431aa678d6a7f6bcba0.jpg"
              }
              width={600}
              height={600}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
