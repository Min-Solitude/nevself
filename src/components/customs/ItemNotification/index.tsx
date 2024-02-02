import { timeAgo } from "@/helper/TimeAgo";
import { Notification } from "@/store/reducer/auth/auth.type";
import Image from "next/image";
import Button from "../Button";
import IonIcon from "@reacticons/ionicons";
import { useAppDispatch } from "@/hooks/useRedux";
import { IMAGES } from "@/assets/imgs";

type Props = {
  notice: Notification;
};

export default function ItemNotice({ notice }: Props) {
  return (
    <div className="w-full flex gap-2 relative items-center bg-gray-100 p-3 rounded-xl border border-gray-200">
      <div className="w-[3.2rem] h-[3.2rem] overflow-hidden border-[0.15rem] border-blue-500 rounded-full">
        <Image
          src={notice?.avatar ? notice.avatar : IMAGES.avatar}
          width={500}
          height={500}
          className="rounded-full w-full h-full object-cover"
          alt={notice.displayName}
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
    </div>
  );
}
