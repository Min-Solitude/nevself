import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import WhileInView from "@/components/motions/WhileInView";
import React from "react";
import { toast } from "react-toastify";

type Props = Readonly<{
  value: string;
  setValue: (value: string) => void;
  nextStep: () => void;
}>;

export default function Step2({ value, setValue, nextStep }: Props) {
  return (
    <WhileInView>
      <label htmlFor="phoneNumber" className="text-sm font-medium">
        Số điện thoại:
      </label>
      <Input
        placeholder="Nhập số điện thoại của bạn"
        id="phoneNumber"
        name="phoneNumber"
        className="text-sm font-medium mt-2 bg-gray-200 py-2 px-4 rounded-lg border border-gray-200 text-gray-800 w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <i className="text-xs text-gray-600">
        * Vui lòng nhập đúng số điện thoại để chúng tôi có thể liên hệ với bạn
      </i>
      <div className="w-full pt-6 mt-4 border-t border-gray-200">
        <Button
          className="px-6 text-sm"
          kind="primary"
          onClick={() => {
            if (value) {
              nextStep();
              sessionStorage.setItem("phoneNumber", value);
              sessionStorage.setItem("step", "2");
            } else {
              toast.error("Vui lòng nhập số điện thoại");
            }
          }}
        >
          Tiếp theo
        </Button>
      </div>
    </WhileInView>
  );
}
