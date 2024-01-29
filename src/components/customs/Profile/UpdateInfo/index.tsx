import View from "@/components/motions/View";
import { Each } from "@/helper/Each";
import { updateInfoAccount } from "@/store/reducer/auth/auth.reducer";
import { HagTag, User } from "@/store/reducer/auth/auth.type";
import IonIcon from "@reacticons/ionicons";
import React from "react";
import { toast } from "react-toastify";
import Button from "../../Button";
import Input from "../../Input";
import { useAppDispatch } from "@/hooks/useRedux";

type PropsType = {
  account: User | null;
  close: () => void;
};

export default function UpdateInfo({ account, close }: PropsType) {
  const [isTags, setIsTags] = React.useState<HagTag[]>(account?.tags || []);

  const dispatch = useAppDispatch();

  const handleUpdateInfo = (e: any) => {
    e.preventDefault();

    const payload = {
      displayName: e.target.displayName.value || null,
      introduction: e.target.introduce.value || null,
      tags: isTags || null,
      uid: account?.uid,
    };

    if (account) {
      dispatch(updateInfoAccount(payload));
    }

    close();
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 px-3 md:px-0 right-0 z-50 bg-[#ffffffc4] flex justify-center items-center">
      <View
        className="w-full max-w-[30rem] px-4 py-4 rounded-2xl shadow-primary border text-sm flex flex-col items-center border-gray-200 bg-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <div className="w-full flex justify-between">
          <h1 className="font-semibold text-gray-800 text-lg">
            Cập nhật thông tin{" "}
          </h1>
          <Button onClick={close}>
            <IonIcon name="close" className="text-xl" />
          </Button>
        </div>
        <div className="w-full mt-4 flex flex-col gap-2">
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={(e: any) => {
              handleUpdateInfo(e);
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-gray-800 font-semibold">
                Tên tài khoản{" "}
                <span className="text-gray-600 font-medium">
                  (Tên cũ: {account?.displayName})
                </span>
              </label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="
                  Tên mới
                "
                className="p-2 bg-gray-100 border border-gray-200 rounded-lg "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="introduce"
                className="text-gray-800 font-semibold"
              >
                Giới thiệu
                <span className="text-gray-600 font-medium">
                  (Tối đa 50 ký tự)
                </span>
              </label>
              <textarea
                id="introduce"
                name="introduce"
                placeholder="
                  Lời giới thiệu
                "
                className="p-2 bg-gray-100 h-[10vh] outline-none border border-gray-200 rounded-lg "
                maxLength={50}
              />
            </div>
            <Button
              kind="primary"
              className="w-full shadow-none mt-2"
              type="submit"
            >
              Cập nhật
            </Button>
          </form>
          <hr className="my-4" />
          <div className="flex flex-col gap-1">
            <label htmlFor="tag" className="text-gray-800 font-semibold">
              #Hashtag
            </label>
            <form
              className="flex items-center gap-2"
              onSubmit={(e: any) => {
                e.preventDefault();
                if (isTags.length < 5) {
                  if (e.target.tag.value.length < 15) {
                    setIsTags([
                      ...isTags,
                      {
                        name: e.target.tag.value,
                      },
                    ]);

                    e.target.tag.value = "";
                  } else {
                    toast.error("Hashtag không được quá 12 ký tự");
                  }
                } else {
                  toast.error("Bạn chỉ được thêm tối đa 5 hashtag");
                }
              }}
            >
              <Input
                id="tag"
                name="tag"
                required
                placeholder="Hashtag (#minkien #kiendz)"
                className="p-2 flex-1 bg-gray-100 border border-gray-200 rounded-lg "
              />
              <Button kind="primary" className="p-3 shadow-none" type="submit">
                <IonIcon name="add" />
              </Button>
            </form>
            <div className="mt-1 text-sm flex gap-2 flex-wrap">
              {isTags.length > 0 ? (
                <Each
                  of={isTags}
                  render={(item, index) => (
                    <div className="py-1 px-3 flex gap-1  rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                      <span>#{item.name}</span>
                      <Button
                        onClick={() => {
                          const newTags = isTags.filter(
                            (tag) => tag.name !== item.name
                          );
                          setIsTags(newTags);
                        }}
                      >
                        <IonIcon name="close" className="text-sm" />
                      </Button>
                    </div>
                  )}
                />
              ) : (
                <p className="text-sm font-medium text-gray-700">
                  Chưa cập nhật
                </p>
              )}
            </div>
          </div>
        </div>
      </View>
    </div>
  );
}
