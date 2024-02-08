import { IMAGES } from "@/assets/imgs";
import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import Toggle from "@/components/customs/Toggle";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateDonateProfile } from "@/store/reducer/auth/auth.reducer";
import { Donate } from "@/store/reducer/auth/auth.type";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import React from "react";

type Props = {
  close: () => void;
  donate: Donate;
  uid_updater: string;
  uid_creator: string;
};

export default function UpdateDonate({
  close,
  uid_updater,
  donate,
  uid_creator,
}: Props) {
  const [isQrUrl, setIsQrUrl] = React.useState<any>(null);
  const [isStatus, setIsStatus] = React.useState(
    donate.status === "active" ? true : false
  );
  const dispatch = useAppDispatch();

  const handleUpdateDonate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uid_creator === uid_updater) {
      const data = new FormData(e.currentTarget);

      const payload = {
        uid_profile: uid_creator,
        title: data.get("title"),
        description: data.get("description"),
        imageQr: isQrUrl,
        status: isStatus ? "active" : "inactive",
        createdAt: donate.createdAt,
        old_image: donate.imageQr,
      };

      dispatch(updateDonateProfile(payload));

      close();
    }
  };

  return (
    <div className="w-full">
      <Button kind="danger" className="px-4 font-medium" onClick={close}>
        Hủy
      </Button>
      <div className="w-full">
        <div className="w-full flex py-2 flex-col items-center">
          <h1 className="text-xl font-bold text-gray-700">Cập nhật donate</h1>
          <div className="w-full mt-4 flex justify-center">
            <IonIcon name="caret-down" className="text-2xl" />
          </div>
          <form
            className="mt-4 w-full flex flex-col gap-4"
            onSubmit={handleUpdateDonate}
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
                defaultValue={donate.title}
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
                defaultValue={donate.description}
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
                  <Image
                    src={donate.imageQr ? donate.imageQr : IMAGES.banner}
                    alt="qr"
                    width={1440}
                    height={1200}
                    className=" w-full md:rounded-xl rounded-lg  h-full object-cover"
                  />
                )}
              </label>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="status" className="font-medium">
                Trạng thái :
              </label>
              <div className="w-full flex items-center gap-4">
                <Toggle
                  handleToggle={() => setIsStatus(!isStatus)}
                  isTurnOn={isStatus}
                />
                <span
                  className={`font-medium py-1 px-3 rounded-full ${
                    isStatus
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {isStatus ? " Hoạt động" : "Vô hiệu hóa"}
                </span>
              </div>
            </div>
            <Button
              kind="primary-dark"
              className="font-medium mt-4"
              type="submit"
            >
              Cập nhật
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
