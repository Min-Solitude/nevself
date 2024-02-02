import { IMAGES } from "@/assets/imgs";
import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import { useAppDispatch } from "@/hooks/useRedux";
import { createDonateProfile } from "@/store/reducer/auth/auth.reducer";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import React from "react";

type Props = {
  close: () => void;
  uid_profile: string;
};

export default function CreateDonate({ close, uid_profile }: Props) {
  const [isQrUrl, setIsQrUrl] = React.useState<any>(null);
  const dispatch = useAppDispatch();

  const handleCreateDonate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const payload = {
      uid_profile: uid_profile,
      title: data.get("title"),
      description: data.get("description"),
      imageQr: isQrUrl,
    };

    if (
      payload.title &&
      payload.description &&
      payload.imageQr &&
      uid_profile
    ) {
      dispatch(createDonateProfile(payload));
      close();
    }
  };

  return (
    <div className="w-full flex py-2 flex-col items-center">
      <h1 className="text-xl font-bold text-gray-700">Tạo donate</h1>
      <div className="w-full mt-4 flex justify-center">
        <IonIcon name="caret-down" className="text-2xl" />
      </div>
      <form
        className="mt-4 w-full flex flex-col gap-4"
        onSubmit={handleCreateDonate}
      >
        <div className="w-full flex gap-1 flex-col">
          <label htmlFor="title" className="font-medium">
            Tiêu đề
          </label>
          <Input
            name="title"
            id="title"
            placeholder="Tiêu đề donate"
            required
            className="py-2 px-4 rounded-lg border border-gray-200 bg-gray-100"
          />
        </div>
        <div className="w-full flex gap-1 flex-col">
          <label htmlFor="description" className="font-medium">
            Mô tả
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Mô tả donate"
            required
            className="py-2 h-[20vh] px-4 outline-none rounded-lg border border-gray-200 bg-gray-100"
          />
        </div>
        <div className="w-full h-[30vh] relative rounded-lg overflow-hidden">
          <input
            type="file"
            accept="image/*"
            hidden
            name="qrCode"
            onChange={(e: any) => {
              if (e.target.files[0]) {
                setIsQrUrl(e.target.files[0]);
              }
            }}
            id="qrCode"
          />
          <label
            htmlFor="qrCode"
            className="h-full w-full flex justify-center items-center  bg-gray-100 border border-gray-200 absolute top-0 left-0"
          >
            {isQrUrl ? (
              <Image
                src={isQrUrl ? URL.createObjectURL(isQrUrl) : IMAGES.banner}
                alt="qr"
                width={1440}
                height={1200}
                className=" w-full md:rounded-xl rounded-lg  h-full object-cover"
              />
            ) : (
              <IonIcon name="image" className="text-3xl text-gray-500" />
            )}
          </label>
        </div>
        <Button kind="primary-dark" className="font-medium mt-4" type="submit">
          Tạo donate
        </Button>
      </form>
    </div>
  );
}
