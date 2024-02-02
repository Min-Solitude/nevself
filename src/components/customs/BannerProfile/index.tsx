"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import IonIcon from "@reacticons/ionicons";
import View from "@/components/motions/View";
import {
  getProfileAccount,
  updateBannerAccount,
} from "@/store/reducer/auth/auth.reducer";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading";
import { IMAGES } from "@/assets/imgs";

export default function BannerProfile() {
  const account = useAppSelector((state) => state.auth.account);
  const profile = useAppSelector((state) => state.auth.profile);

  const params = useParams<{ uid: string }>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  const [isUpdateBanner, setIsUpdateBanner] = React.useState<boolean>(false);

  const [isBannerUrl, setIsBannerUrl] = useState<any>(null);

  const handleUpdateBanner = async () => {
    if (!isBannerUrl) return;

    const payload = {
      isBannerUrl,
      uid: account?.uid,
    };

    if (account?.uid) {
      dispatch(updateBannerAccount(payload));

      setIsBannerUrl(null);
      setIsUpdateBanner(false);
    } else {
      toast.error("Bạn chưa đăng nhập");
    }
  };

  useEffect(() => {
    dispatch(getProfileAccount({ uid: params.uid }));
  }, []);

  return (
    <>
      {loading && <Loading kind="load-action" />}
      {isUpdateBanner && (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex justify-center px-3 lg:px-0 items-center bg-[#ffffffe0]">
          <View
            className="p-4 rounded-2xl w-full max-w-[60rem] text-sm shadow-primary border bg-white border-gray-200"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full flex justify-between items-center">
              <h1 className="text-lg font-semibold text-gray-800">
                Cập nhật ảnh nền
              </h1>
              <Button
                onClick={() => {
                  setIsUpdateBanner(false);
                  setIsBannerUrl(null);
                }}
              >
                <IonIcon name="close" className="text-xl" />
              </Button>
            </div>
            <div className="h-[20vh] md:h-[30vh] lg:h-[40vh] bg-gray-100 flex justify-center items-center rounded-xl mt-4">
              <input
                type="file"
                accept="image/*"
                hidden
                name="bannerProfile"
                onChange={(e: any) => {
                  if (e.target.files[0]) {
                    setIsBannerUrl(e.target.files[0]);
                  }
                }}
                id="bannerProfile"
              />
              <label
                htmlFor="bannerProfile"
                className="w-full h-full flex justify-center cursor-pointer items-center"
              >
                {isBannerUrl ? (
                  <Image
                    src={
                      isBannerUrl
                        ? URL.createObjectURL(isBannerUrl)
                        : IMAGES.banner
                    }
                    alt="avatar"
                    width={1440}
                    height={1200}
                    className=" w-full md:rounded-xl rounded-lg  h-full object-cover"
                  />
                ) : (
                  <IonIcon name="camera" className="text-3xl text-gray-700" />
                )}
              </label>
            </div>
            {isBannerUrl && (
              <div className="mt-4">
                <Button
                  kind="primary-dark"
                  className="font-medium px-4"
                  onClick={() => handleUpdateBanner()}
                >
                  Cập nhật
                </Button>
              </div>
            )}
          </View>
        </div>
      )}
      <div className=" relative md:h-[20rem] h-[14rem] rounded-b-2xl md:rounded-2xl overflow-hidden">
        <Image
          src={profile?.banner ? profile?.banner : IMAGES.banner}
          className="w-full h-full object-cover"
          width={1440}
          height={400}
          alt={profile?.displayName ? profile?.displayName : ""}
        />
        {!loading && account?.uid === profile?.uid && (
          <Button
            className="absolute top-4 right-4 flex justify-center items-center bg-white p-2 rounded-full text-gray-800 z-10"
            onClick={() => setIsUpdateBanner(true)}
          >
            <IonIcon name="camera" className="text-xl" />
          </Button>
        )}
      </div>
    </>
  );
}
