import { NetWork, User } from "@/store/reducer/auth/auth.type";
import React from "react";
import View from "../motions/View";
import Close from "../customs/Close";
import { Each } from "@/helper/Each";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import { ICONS } from "@/assets/icons";
import Input from "../customs/Input";
import Button from "../customs/Button";
import { useAppDispatch } from "@/hooks/useRedux";
import { addNetworkProfile } from "@/store/reducer/auth/auth.reducer";
import { toast } from "react-toastify";

type Props = {
  profile: User;
  uid_account: string;
  close: () => void;
  network?: NetWork[];
};

const dataNetwork = [
  {
    label: "Facebook",
    value: "facebook",
  },
  {
    label: "Twitter",
    value: "twitter",
  },
  {
    label: "Instagram",
    value: "instagram",
  },
  {
    label: "Linkedin",
    value: "linkedin",
  },
  {
    label: "Youtube",
    value: "youtube",
  },
  {
    label: "Tiktok",
    value: "tiktok",
  },
  {
    label: "Pinterest",
    value: "pinterest",
  },
  {
    label: "Github",
    value: "github",
  },
];

export default function CreateNetwork({
  profile,
  uid_account,
  close,
  network,
}: Props) {
  const [isValue, setIsValue] = React.useState("facebook");
  const dispatch = useAppDispatch();

  const handleAddNetwork = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      uid: uid_account,
      label: isValue,
      link: e.currentTarget.link.value,
    };

    if (network?.length === 5) {
      toast.error("Chỉ được thêm tối đa 5 mạng xã hội");
      return;
    }

    if (network?.find((item) => item.label === isValue)) {
      toast.error("Mạng xã hội này đã tồn tại");
      return;
    }

    dispatch(addNetworkProfile(payload));

    close();
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 px-3 md:px-0 bg-[#ffffffce] flex justify-center items-center z-50">
      <View
        className="w-full max-w-[30rem] p-4 shadow-primary bg-white rounded-2xl border border-gray-200"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <div className="w-full flex justify-between">
          <h1 className="font-medium text-lg">Tạo mạng xã hội</h1>
          <Close onClick={close} size="xl" />
        </div>
        <div className="mt-4 w-full flex justify-center">
          <IonIcon name="caret-down" className="text-2xl text-gray-500" />
        </div>
        <div className="mt-4 w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="net" className="text-sm font-medium text-gray-800">
              Chọn nền tảng
            </label>
            <select
              name="net"
              id="net"
              className="outline-none py-2 rounded-lg border border-gray-200 px-3"
              value={isValue}
              onChange={(e) => setIsValue(e.target.value)}
            >
              <Each
                of={dataNetwork}
                render={(item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                )}
              />
            </select>
          </div>
        </div>
        <div className="w-full mt-4 flex flex-col items-start gap-4">
          <div className="w-[3.5rem] h-[3.5rem] shadow-primary border border-gray-200 bg-white p-2 rounded-lg">
            <Image
              src={ICONS[isValue as keyof typeof ICONS]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <form
            className="w-full flex flex-col gap-1"
            onSubmit={handleAddNetwork}
          >
            <label htmlFor="link">
              <span className="text-sm font-medium text-gray-800">
                Đường dẫn
              </span>
            </label>
            <Input
              id="link"
              placeholder="Ex: https://mindz.com"
              name="link"
              type="url"
              className="py-2 px-4 rounded-lg border border-gray-200 bg-gray-100"
              required
            />
            <Button
              kind="primary-dark"
              className="mt-4 font-medium"
              type="submit"
            >
              <span className="font-medium text-gray-50">Thêm</span>
            </Button>
          </form>
        </div>
      </View>
    </div>
  );
}
