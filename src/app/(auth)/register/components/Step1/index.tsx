import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import View from "@/components/motions/View";
import { Each } from "@/helper/Each";
import IonIcon from "@reacticons/ionicons";
import { useState } from "react";
import { toast } from "react-toastify";

const dataStep1 = [
  {
    label: "Tạo trang cá nhân",
    value: "Tạo trang cá nhân",
  },
  {
    label: "Tạo affiliate ",
    value: "Tạo affiliate ",
  },
  {
    label: "Kiếm ghệ",
    value: "Kiếm ghệ",
  },
];

type Props = {
  value: string | null;
  setValue: (value: string | null) => void;
  nextStep: () => void;
};

export default function Step1({ value, setValue, nextStep }: Props) {
  return (
    <View
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-sm font-medium">Đề xuất:</h1>
      </div>
      <div className="flex mt-2 items-center gap-2 text-sm flex-wrap">
        <Each
          of={dataStep1}
          render={(item, index) => (
            <Button
              className={`bg-gray-200 py-1 text-gray-800 px-4 rounded-full font-medium border ${
                value === item.value ? "border-primary" : "border-gray-200"
              }`}
              onClick={() => {
                setValue(item.value);
              }}
            >
              {item.label}
            </Button>
          )}
        />
        <View className="w-full mt-4">
          <label htmlFor="order" className="text-sm font-medium">
            Lý do:
          </label>
          <Input
            placeholder="Nhập mục đích của bạn"
            id="order"
            name="order"
            className="text-sm font-medium mt-2 bg-gray-200 py-2 px-4 rounded-lg border border-gray-200 text-gray-800 w-full"
            onChange={(e) => {
              setValue(e.target.value ? e.target.value : null);
            }}
            value={value ? value : ""}
          />
          <i className="text-xs text-gray-600">
            * Nếu bạn không chọn mục đích, bạn sẽ không thể sử dụng các tính
          </i>
        </View>
        <div className="w-full pt-6 mt-4 border-t border-gray-200">
          <Button
            className="px-6"
            kind="primary"
            onClick={() => {
              if (value) {
                nextStep();
                sessionStorage.setItem("purpose", value);
                sessionStorage.setItem("step", "1");
              } else {
                toast.error("Vui lòng chọn mục đích");
              }
            }}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </View>
  );
}
