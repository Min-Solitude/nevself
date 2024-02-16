import View from "@/components/motions/View";
import IonIcon from "@reacticons/ionicons";
import React, { useEffect } from "react";
import Button from "../../Button";
import { useAppDispatch } from "@/hooks/useRedux";
import { User } from "@/store/reducer/auth/auth.type";
import {
  deleteNoticeAccount,
  getAllNoticeAccount,
} from "@/store/reducer/auth/auth.reducer";
import { Each } from "@/helper/Each";
import ItemNotice from "../../ItemNotification";

type Props = {
  uid_account: string;
  close: () => void;
  profile: User;
};

export default function Notification({ uid_account, profile, close }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllNoticeAccount({ uid: uid_account }));
  }, []);

  return (
    <View
      className="fixed w-full h-full bg-white max-w-[26rem] shadow-primary z-50 top-0 p-4 left-0"
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="font-semibold">
          Thông báo{" "}
          <span className=" text-gray-800">
            ({profile?.notifications?.length || 0})
          </span>{" "}
        </h1>
        <Button
          className="text-sm font-medium"
          onClick={() => {
            close();
          }}
        >
          <IonIcon name="close" className="text-xl" />
        </Button>
      </div>
      <div className="mt-4">
        {profile?.notifications ? (
          <div className="w-full flex flex-col h-[90vh] overflow-y-scroll hidden-scrollbar gap-4">
            <Each
              of={profile?.notifications}
              render={(item, index) => (
                <ItemNotice
                  notice={item}
                  closeNotice={close}
                  uid_account={uid_account}
                />
              )}
            />
            {profile?.notifications?.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                Không có thông báo nào
              </div>
            ) : (
              <Button
                className="w-full text-sm font-medium"
                kind="primary"
                onClick={() => {
                  dispatch(deleteNoticeAccount({ uid: uid_account }));
                }}
              >
                Xóa tất cả thông báo
              </Button>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </View>
  );
}
