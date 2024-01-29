import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import WhileInView from "@/components/motions/WhileInView";
import React from "react";
import { toast } from "react-toastify";

type Props = Readonly<{
  value: boolean;
  setValue: (value: boolean) => void;
  nextStep: () => void;
}>;

export default function Step3({ value, setValue, nextStep }: Props) {
  return (
    <WhileInView>
      <h1 className="text-sm font-medium">Xác nhận điều khoản:</h1>
      <div className="bg-gray-100 p-4 text-sm h-[26rem] overflow-y-auto rounded-xl border border-gray-200 mt-4">
        <div>
          <h2 className="font-medium">1: Điều thứ nhất</h2>
          <p className="mt-1">
            Không được phép sử dụng tài khoản của người khác để đăng nhập vào hệ
            thống.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-medium">2: Điều thứ hai</h2>
          <p className="mt-1">
            Không được phép sử dụng tài khoản của người khác để đăng nhập vào hệ
            thống.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-medium">3: Điều thứ ba</h2>
          <p className="mt-1">
            Không được phép sử dụng tài khoản của người khác để đăng nhập vào hệ
            thống.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-medium">4: Điều thứ tư</h2>
          <p className="mt-1">
            Không được phép sử dụng tài khoản của người khác để đăng nhập vào hệ
            thống.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-medium">5: Điều thứ năm</h2>
          <p className="mt-1">
            Không được phép sử dụng tài khoản của người khác để đăng nhập vào hệ
            thống.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-medium">6: Điều thứ sáu</h2>
          <p className="mt-1">
            Không được phép sử dụng tài khoản của người khác để đăng nhập vào hệ
            thống.
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-1 items-center">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => {
            setValue(e.target.checked);
          }}
        />
        <span className="ml-2 text-sm">
          Tôi đã đọc và đồng ý với điều khoản
        </span>
      </div>
      <div className="w-full pt-6 mt-4 border-t border-gray-200">
        <Button
          className="px-6 text-sm"
          kind="primary"
          onClick={() => {
            if (value) {
              nextStep();
              sessionStorage.setItem("rules", String(value));
              sessionStorage.setItem("step", "3");
            } else {
              toast.error("Vui lòng xác nhận điều khoản");
            }
          }}
        >
          Tiếp theo
        </Button>
      </div>
    </WhileInView>
  );
}
