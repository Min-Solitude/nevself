import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import Spiner from "@/components/customs/Spiner";
import View from "@/components/motions/View";
import NotFound from "@/components/shared/NotFound";
import { Each } from "@/helper/Each";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateInfoProfile } from "@/store/reducer/auth/auth.reducer";
import { User } from "@/store/reducer/auth/auth.type";
import IonIcon from "@reacticons/ionicons";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  uid_updater: string | null;
  profile: User | null;
  close: () => void;
};

export default function UpdateProfile(props: Props) {
  const [isSkills, setIsSkills] = React.useState(
    props.profile?.information?.skills || []
  );

  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    if (
      form.story.value === "" ||
      form.location.value === "" ||
      form.mail.value === ""
    ) {
      return toast.error("Vui lòng điền đầy đủ thông tin");
    }

    dispatch(
      updateInfoProfile({
        uid_profile: props.profile?.uid || "",
        data: {
          story: form.story.value,
          info: {
            location: form.location.value,
            mail: form.mail.value,
            joinAt: props.profile?.information?.info?.joinAt || "",
          },
          skills: isSkills,
        },
      })
    );

    props.close();
  };

  return (
    <View
      className="top-0 left-0 bottom-0 right-0 bg-white flex flex-col item-center px-3 md:px-0 fixed z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className="w-full flex justify-end">
        <Button kind="primary" className="px-4" onClick={props.close}>
          <span className="font-medium">Đóng</span>
        </Button>
      </div>
      {props.uid_updater === props.profile?.uid ? (
        <div className="w-full mt-4 max-w-[30rem] m-auto">
          <h1 className="font-bold text-xl text-gray-800">
            Cập nhật thông tin
          </h1>
          <div className="m-auto w-6 h-1 bg-gray-500 rounded-full my-4" />
          <form
            className="mt-4 w-full  flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="story" className="font-medium">
                Tiểu sử
              </label>
              <Input
                name="story"
                id="story"
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-200"
                defaultValue={props.profile?.information?.story}
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="location" className="font-medium">
                Địa chỉ
              </label>
              <Input
                name="location"
                id="location"
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-200"
                defaultValue={props.profile?.information?.info?.location}
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="mail" className="font-medium">
                Email
              </label>
              <Input
                name="mail"
                id="mail"
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-200"
                defaultValue={props.profile?.information?.info?.mail}
                required
              />
            </div>
            <hr className="bg-gray-400 my-4" />
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="skills" className="font-medium">
                Kỹ năng
              </label>
              <div className="w-full flex gap-2">
                <Input
                  name="skills"
                  id="skills"
                  className="py-2 px-3 flex-1 rounded-lg bg-gray-100 border border-gray-200"
                />
                <Button
                  kind="primary"
                  className="px-3"
                  onClick={() => {
                    const skills = document.getElementById(
                      "skills"
                    ) as HTMLInputElement;
                    if (skills.value === "") {
                      return toast.error("Vui lòng nhập kỹ năng");
                    } else {
                      setIsSkills([...isSkills, skills.value]);
                      skills.value = "";
                    }
                  }}
                >
                  <IonIcon name="add" className="text-gray-600 text-base" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {
                <Each
                  of={isSkills}
                  render={(item, index) => (
                    <div className="p-2  flex gap-2 items-center rounded-lg bg-gray-200 font-medium px-4 text-gray-600">
                      <span>{item}</span>
                      <Button
                        onClick={() => {
                          setIsSkills(
                            isSkills.filter((_: any, i: number) => i !== index)
                          );
                        }}
                      >
                        <IonIcon
                          name="close"
                          className="text-gray-600 text-base"
                        />
                      </Button>
                    </div>
                  )}
                />
              }
            </div>
            {loading ? (
              <Button kind="primary-dark" className="mt-4">
                <Spiner />
              </Button>
            ) : (
              <Button type="submit" kind="primary-dark" className="mt-4">
                <span className="font-medium">Cập nhật</span>
              </Button>
            )}
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 mt-4 rounded-lg md:rounded-2xl h-[50vh] flex justify-center items-center md:vh-[40vh]">
          <NotFound />
        </div>
      )}
    </View>
  );
}
