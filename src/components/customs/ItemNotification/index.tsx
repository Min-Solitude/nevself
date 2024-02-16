import { IMAGES } from "@/assets/imgs";
import View from "@/components/motions/View";
import { timeAgo } from "@/helper/TimeAgo";
import { Notification } from "@/store/reducer/auth/auth.type";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/useRedux";
import { watchNoticeAccount } from "@/store/reducer/auth/auth.reducer";

type Props = {
  notice: Notification;
  closeNotice: () => void;
  uid_account: string;
};

export default function ItemNotice({
  notice,
  closeNotice,
  uid_account,
}: Props) {
  const [isWatched, setIsWatched] = useState<Notification | null>(null);
  const dispatch = useAppDispatch();

  const handleWatchNotice = () => {
    setIsWatched(notice);
    dispatch(watchNoticeAccount({ uid: uid_account, uuid: notice.uuid }));
  };

  return (
    <>
      {isWatched && (
        <View
          className="fixed top-0 left-0 bottom-0 px-4 right-0 z-50 bg-[#ffffff] flex justify-center items-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <div className="w-full bg-gray-100 border border-gray-200 shadow-primary flex flex-col items-center rounded-xl px-4 pt-8 pb-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden border-2 border-blue-500">
                <Image
                  src={isWatched.avatar}
                  width={500}
                  height={500}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="font-semibold text-gray-700 text-lg">
                {isWatched.displayName || "Anonymous"}
              </h1>
            </div>
            <div className="rounded-xl p-4 w-full mt-4 text-sm font-medium bg-gray-200">
              <p className="text-gray-600">{isWatched.content}</p>
            </div>
            <div className="w-full flex justify-end gap-2 mt-4">
              <Link href={`/account/${isWatched.uid}/products`} target="_blank">
                <Button
                  kind="primary"
                  className="text-sm font-medium px-4"
                  onClick={() => {
                    setIsWatched(null);
                    closeNotice();
                  }}
                >
                  Xem hồ sơ
                </Button>
              </Link>
              <Button
                kind="danger"
                className="text-sm font-medium px-4"
                onClick={() => {
                  setIsWatched(null);
                }}
              >
                Đóng
              </Button>
            </div>
          </div>
        </View>
      )}
      <div
        className={`w-full flex gap-2 relative items-center  p-3 rounded-xl border active:scale-95 duration-150 cursor-pointer hover:brightness-75  bg-gray-100 border-gray-200`}
        onClick={handleWatchNotice}
      >
        <div className="w-[3.2rem] h-[3.2rem] overflow-hidden border-[0.15rem] border-blue-500 rounded-full">
          <Image
            src={notice?.avatar ? notice.avatar : IMAGES.avatar}
            width={500}
            height={500}
            className="rounded-full w-full h-full object-cover"
            alt={notice.displayName || "Anonymous"}
          />
        </div>
        <div>
          <h1 className="font-semibold text-gray-800">
            {notice.displayName ? notice.displayName : "Anonymous"} -{" "}
            <span className="font-medium text-xs text-gray-500">
              {timeAgo(notice.time)}
            </span>
          </h1>
          <p className="text-sm text-gray-600">{notice.content}</p>
        </div>
        <div className="flex-1 flex justify-end mr-4">
          {notice?.status === "unread" ? (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          ) : (
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          )}
        </div>
      </div>
    </>
  );
}
