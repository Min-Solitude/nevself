"use client";

import Button from "@/components/customs/Button";
import WhileInView from "@/components/motions/WhileInView";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getProfileAccount } from "@/store/reducer/auth/auth.reducer";
import React, { useEffect } from "react";
import CreateDonate from "./components/CreateDonate";
import View from "@/components/motions/View";
import Image from "next/image";
import { formatDate } from "@/helper/FormatDate";
import UpdateDonate from "./components/UpdateDonate";
import { toast } from "react-toastify";
import NotFound from "@/components/shared/NotFound";

export default function DonatePage({
  params,
}: {
  params: {
    uid: string;
  };
}) {
  const account = useAppSelector((state) => state.auth.account);
  const profile = useAppSelector((state) => state.auth.profile);

  const [isCreateDonate, setIsCreateDonate] = React.useState(false);
  const [isUpdateDonate, setIsUpdateDonate] = React.useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profile || profile.uid !== params.uid) {
      dispatch(getProfileAccount({ uid: params.uid }));
    }
  }, []);

  if (isUpdateDonate)
    return profile?.uid && profile?.donate && account?.uid ? (
      <UpdateDonate
        close={() => setIsUpdateDonate(false)}
        uid_updater={account?.uid}
        uid_creator={profile?.uid}
        donate={profile?.donate}
      />
    ) : (
      <div className="w-full bg-gray-100 rounded-xl border border-gray-200 flex justify-center items-center font-medium text-red-500 min-h-[20vh]">
        Lỗi thưc thi hành động
      </div>
    );

  return (
    <WhileInView
      className={`w-full md:rounded-2xl min-h-screen md:items-center md:border md:border-gray-200 md:shadow-primary flex justify-center ${
        isCreateDonate ? "items-start" : "items-start"
      } p-4 min-h-[30vh]`}
    >
      {isCreateDonate ? (
        <CreateDonate
          close={() => setIsCreateDonate(false)}
          uid_profile={params.uid}
        />
      ) : account?.uid === params.uid ? (
        <div>
          {profile?.role === "admin" || profile?.role === "vip" ? (
            <div className="w-full">
              {profile.donate ? (
                <div className="w-full flex flex-col gap-8 items-center">
                  <div className="w-full flex flex-col items-center gap-2 justify-center">
                    <h1 className="font-bold text-xl text-center text-gray-700">
                      {profile.donate?.title}
                    </h1>
                    <p className="font-medium text-gray-700">
                      Trạng thái:{" "}
                      <span
                        className={`
                      ${
                        profile.donate?.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                      `}
                      >
                        {profile.donate?.status === "active"
                          ? "Đang hoạt động"
                          : "Đã bị vô hiệu hóa"}
                      </span>
                    </p>
                    <i className="font-medium underline text-gray-700">
                      {profile.donate?.updatedAt ? (
                        <>
                          Cập nhật lần cuối:{" "}
                          {formatDate(profile.donate?.updatedAt)}
                        </>
                      ) : (
                        <>Tạo ngày: {formatDate(profile.donate?.createdAt)}</>
                      )}
                    </i>
                  </div>
                  <View className="shadow-primary ">
                    <div className="h-[40vh] w-full rounded-2xl">
                      <Image
                        src={profile.donate?.imageQr}
                        width={800}
                        height={800}
                        alt={profile.displayName + " donate"}
                        className="rounded-xl w-full h-full border-4 border-gray-200 object-cover"
                      />
                    </div>
                  </View>
                  <div className="p-4 rounded-xl border border-gray-200 w-full min-h-[10vh] bg-gray-50">
                    <p className="text-gray-900">
                      {profile.donate?.description}
                    </p>
                  </div>
                  {account?.uid === params.uid && (
                    <div className="w-full justify-center flex">
                      <Button
                        kind="primary"
                        className="font-medium px-4"
                        onClick={() => {
                          if (account?.uid === params.uid)
                            setIsUpdateDonate(true);
                          else
                            toast.error(
                              "Bạn không có quyền chỉnh sửa donate này"
                            );
                        }}
                      >
                        Chỉnh sửa
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full flex gap-2 flex-col px-3 md:px-0 items-center">
                  <Button
                    kind="primary"
                    className="font-medium px-4"
                    onClick={() => setIsCreateDonate(true)}
                  >
                    Tạo donate
                  </Button>
                  <i className="text-center text-gray-500">
                    Bạn có thể tạo donate để giúp người dùng này có thêm nguồn
                    thu nhập &nbsp;🎉
                  </i>
                </div>
              )}
            </div>
          ) : (
            <div>2</div>
          )}
        </div>
      ) : (
        <div>
          {profile?.role === "admin" || profile?.role === "vip" ? (
            profile.donate?.status === "active" ? (
              <div className="w-full flex flex-col gap-8 items-center">
                <div className="w-full flex flex-col items-center gap-2 justify-center">
                  <h1 className="font-bold text-xl text-center text-gray-700">
                    {profile.donate?.title}
                  </h1>
                </div>
                <View className="shadow-primary ">
                  <div className="h-[40vh] w-full rounded-2xl">
                    <Image
                      src={
                        profile.donate?.imageQr ||
                        "https://i.pinimg.com/564x/8a/29/b9/8a29b9b23a92b51a000e4de07feb71a9.jpg"
                      }
                      width={800}
                      height={800}
                      alt={profile.displayName + " donate"}
                      className="rounded-xl w-full h-full border-4 border-gray-200 object-cover"
                    />
                  </div>
                </View>
                <div className="p-4 rounded-xl border border-gray-200 w-full min-h-[10vh] bg-gray-50">
                  <p className="text-gray-900">{profile.donate?.description}</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-lg font-medium text-gray-800">
                  Donate này đã bị vô hiệu hóa
                </div>
              </div>
            )
          ) : (
            <div>
              <NotFound />
            </div>
          )}
        </div>
      )}
    </WhileInView>
  );
}
