"use client";

import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import WhileInView from "@/components/motions/WhileInView";
import Loading from "@/components/shared/Loading";
import { regexUsername } from "@/helper/Regex";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { registerAccount } from "@/store/reducer/auth/auth.reducer";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Logo from "@/components/layouts/Header/components/Logo";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const router = useRouter();

  const [isStepRegister, setIsStepRegister] = useState(
    sessionStorage.getItem("step") ? Number(sessionStorage.getItem("step")) : 0
  );

  const [isValuePurpose, setIsValuePurpose] = useState<string | null>(
    sessionStorage.getItem("purpose") || null
  );

  const [isValuePhoneNumber, setIsValuePhoneNumber] = useState<string>(
    sessionStorage.getItem("phoneNumber") || ""
  );

  const [isValueRules, setIsValueRules] = useState<boolean>(
    sessionStorage.getItem("rules") === "true" || false
  );

  const handleRegisterAccount = async (e: any) => {
    const dataSubmit = {
      purpose: isValuePurpose,
      phoneNumber: isValuePhoneNumber,
      email: e.target.username.value,
      password: e.target.password.value,
    };

    if (!regexUsername.test(dataSubmit.email) || dataSubmit.email.length < 6) {
      toast.error("Tài khoản không được để trống và phải lớn hơn 6 ký tự");
      return;
    }

    if (dataSubmit.password.length < 6) {
      toast.error("Mật khẩu phải lớn hơn 6 ký tự");
      return;
    }

    if (dataSubmit.password !== e.target.repassword.value) {
      toast.error("Mật khẩu không trùng khớp");
      return;
    }

    await dispatch(registerAccount(dataSubmit));
  };

  return (
    <div className="w-full h-full px-4 md:px-0 bg-white flex-col gap-8 flex justify-center items-center">
      {loading && <Loading kind="load-action" />}
      <Logo />
      <WhileInView className="max-w-[30rem] bg-white flex flex-col gap-4 shadow-primary rounded-2xl px-8 py-8 border border-gray-100 w-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-semibold text-gray-800 text-xl">
            Đăng ký tài khoản
          </h1>
          {isStepRegister !== 0 && (
            <Button
              className="text-lg text-gray-800 font-medium"
              onClick={() => {
                setIsStepRegister((prev) => prev - 1);
                sessionStorage.setItem("step", String(isStepRegister - 1));
              }}
            >
              <IonIcon name="arrow-back" />
            </Button>
          )}
        </div>
        <div className="flex gap-2 items-center w-full">
          {
            <div className="flex gap-2 items-center w-full">
              <span
                className={`w-[2rem] rounded-full h-1 ${
                  isStepRegister >= 0 ? "bg-gradient" : "bg-gray-200"
                }`}
              ></span>
              <span
                className={`w-[2rem] rounded-full h-1 ${
                  isStepRegister >= 1 ? "bg-gradient" : "bg-gray-200"
                }`}
              ></span>
              <span
                className={`w-[2rem] rounded-full h-1 ${
                  isStepRegister >= 2 ? "bg-gradient" : "bg-gray-200"
                }`}
              ></span>
              <span
                className={`w-[2rem] rounded-full h-1 ${
                  isStepRegister >= 3 ? "bg-gradient" : "bg-gray-200"
                }`}
              ></span>
            </div>
          }
        </div>
        <div className="mt-2 w-full overflow-hidden">
          {isStepRegister === 0 && (
            <Step1
              value={isValuePurpose}
              setValue={setIsValuePurpose}
              nextStep={() => setIsStepRegister(1)}
            />
          )}
          {isStepRegister === 1 && (
            <Step2
              value={isValuePhoneNumber}
              setValue={setIsValuePhoneNumber}
              nextStep={() => setIsStepRegister(2)}
            />
          )}
          {isStepRegister === 2 && (
            <Step3
              value={isValueRules}
              setValue={setIsValueRules}
              nextStep={() => setIsStepRegister(3)}
            />
          )}
          {isStepRegister === 3 && (
            <WhileInView className="flex flex-col gap-4 mt-4">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegisterAccount(e);
                }}
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="username" className="text-sm font-medium">
                    Tài khoản
                  </label>
                  <Input
                    type="text"
                    placeholder="Tài khoản (minpro211, mindz18, ...)"
                    id="username"
                    name="username"
                    className="font-medium py-2 px-4 rounded-lg bg-gray-100 border border-gray-200 text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Mật khẩu
                  </label>
                  <Input
                    type="password"
                    placeholder="Mật khẩu"
                    id="password"
                    name="password"
                    className="font-medium py-2 px-4 rounded-lg bg-gray-100 border border-gray-200 text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="repassword" className="text-sm font-medium">
                    Nhập lại mật khẩu
                  </label>
                  <Input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    id="repassword"
                    name="repassword"
                    className="font-medium py-2 px-4 rounded-lg bg-gray-100 border border-gray-200 text-sm"
                    required
                  />
                </div>
                {loading ? (
                  <Button
                    className="font-medium text-sm rounded-lg bg-black text-white py-2 mt-2"
                    disabled
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    className="font-medium text-sm rounded-lg bg-black text-white py-2 mt-2"
                    type="submit"
                  >
                    Đăng ký tài khoản
                  </Button>
                )}
              </form>
            </WhileInView>
          )}
        </div>
        <div className="w-full flex gap-4 flex-col items-center">
          <IonIcon name="caret-down" className="text-2xl text-black" />
          <p className="text-sm font-medium">
            Bạn đã có tài khoản?{" "}
            <Link href="/login" className="underline text-blue-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </WhileInView>
    </div>
  );
}
