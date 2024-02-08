"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import React from "react";
import Button from "../Button";
import CreateNetwork from "@/components/CreateNetwork";
import { Each } from "@/helper/Each";
import Image from "next/image";
import { ICONS } from "@/assets/icons";
import Link from "next/link";
import IonIcon from "@reacticons/ionicons";
import Spiner from "../Spiner";
import { deleteNetworkProfile } from "@/store/reducer/auth/auth.reducer";

export default function NetWork() {
  const profile = useAppSelector((state) => state.auth.profile);
  const account = useAppSelector((state) => state.auth.account);
  const loading = useAppSelector((state) => state.auth.loading);

  const dispatch = useAppDispatch();

  const [isShow, setIsShow] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);

  return (
    <>
      {isShow && profile && account?.uid && (
        <CreateNetwork
          profile={profile}
          uid_account={account?.uid}
          close={() => setIsShow(false)}
          network={profile?.networks}
        />
      )}
      {account?.uid === profile?.uid ? (
        <div className="-translate-y-[2rem] text-sm md:-translate-y-[5rem] flex-col bg-white   flex  gap-4 w-full py-4 md:py-8 px-4 md:px-0">
          <div className="w-full items-center flex justify-between">
            <h1 className="font-bold text-gray-700 uppercase">
              Nền tảng mạng xã hội
            </h1>
            {account?.uid === profile?.uid &&
              profile?.networks &&
              profile?.networks.length > 0 && (
                <div className="flex gap-2 items-center">
                  <Button
                    kind="primary"
                    onClick={() => {
                      setIsShow(true);
                      setIsDelete(false);
                    }}
                  >
                    <IonIcon name="add" className="text-xl text-gray-800" />
                  </Button>
                  <Button kind="primary" onClick={() => setIsDelete(true)}>
                    <IonIcon
                      name="pencil-outline"
                      className="text-xl text-gray-800"
                    />
                  </Button>
                </div>
              )}
          </div>
          <div className=" mt-2 w-full">
            {profile?.networks && profile?.networks.length > 0 ? (
              <div className="w-full flex items-center justify-center md:text-start gap-4 ">
                <Each
                  of={profile?.networks}
                  render={(item, index) => (
                    <div className="flex flex-col items-center gap-4">
                      <Link
                        href={item.link}
                        className="flex justify-center  w-auto items-center"
                        target="_blank"
                      >
                        <Button className="w-[2.8rem] h-[2.8rem] rounded-lg bg-white shadow-primary p-1">
                          <Image
                            src={ICONS[item.label as keyof typeof ICONS]}
                            alt={item.label}
                            className="w-full h-full object-cover"
                          />
                        </Button>
                      </Link>
                      {isDelete &&
                        (loading ? (
                          <Button className="w-[1.5rem] h-[1.5rem]" disabled>
                            <Spiner />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              dispatch(
                                deleteNetworkProfile({
                                  uid: profile.uid,
                                  uuid: item.uuid,
                                })
                              );
                            }}
                          >
                            <IonIcon
                              name="trash"
                              className="text-xl text-red-500"
                            />
                          </Button>
                        ))}
                    </div>
                  )}
                />
              </div>
            ) : (
              <div className="w-full flex justify-center py-2 items-center">
                <Button
                  kind="primary"
                  className="px-5 font-medium"
                  onClick={() => setIsShow(true)}
                >
                  Thêm mạng xã hội
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        profile?.networks &&
        profile?.networks.length > 0 && (
          <div className="-translate-y-[2rem] text-sm md:-translate-y-[5rem] flex-col bg-white   flex  gap-4 w-full py-4 md:py-8 px-4 md:px-0">
            <div className="w-full items-center flex justify-between">
              <h1 className="font-bold text-gray-700 uppercase">
                Nền tảng mạng xã hội
              </h1>
            </div>
            <div className="w-full flex items-center justify-start gap-4 ">
              <div className="w-full flex items-center justify-center md:justify-start gap-4 ">
                <Each
                  of={profile?.networks}
                  render={(item, index) => (
                    <Link
                      href={item.link}
                      className="flex justify-center  w-auto items-center"
                      key={index}
                      target="_blank"
                    >
                      <Button className="w-[2.8rem] h-[2.8rem] rounded-lg bg-white shadow-primary p-1">
                        <Image
                          src={ICONS[item.label as keyof typeof ICONS]}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                      </Button>
                    </Link>
                  )}
                />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
