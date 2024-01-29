"use client";

import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import Logo from "@/components/layouts/Header/components/Logo";
import View from "@/components/motions/View";
import WhileInView from "@/components/motions/WhileInView";
import Loading from "@/components/shared/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  loginAccount,
  registerAccountByGoogle,
} from "@/store/reducer/auth/auth.reducer";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";

export default function LoginPage() {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const handleLoginAccountGoogle = () => {
    dispatch(registerAccountByGoogle());
  };

  const handleLoginAccount = (e: any) => {
    const username = e.target.username.value;
    const password = e.target.password.value;

    const payload = {
      username,
      password,
    };

    dispatch(loginAccount(payload));
  };

  return (
    <div className="bg-white h-full flex justify-center px-3 md:px-0 flex-col gap-8 items-center">
      {loading && <Loading kind="load-action" />}
      <Logo />
      <View
        className="w-full max-w-[30rem] flex flex-col items-start bg-white px-8 py-8 rounded-2xl shadow-primary border text-sm border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="font-semibold text-gray-800 text-xl">
          Đăng nhập tài khoản
        </h1>
        <div className="flex gap-4 justify-center mt-2 py-4 items-center w-full">
          {loading ? (
            <Button
              className="font-medium text-sm rounded-lg bg-gray-100 border border-gray-200 text-gray-800 w-full py-2"
              disabled
              type="button"
            >
              <IonIcon name="logo-google" className="text-xl" />
              <span className="ml-2">Đăng nhập với Google</span>
            </Button>
          ) : (
            <Button
              className="font-medium text-sm rounded-lg bg-gray-100 border border-gray-200 text-gray-800 w-full py-2"
              onClick={handleLoginAccountGoogle}
            >
              <IonIcon name="logo-google" className="text-xl" />
              <span className="ml-2">Đăng nhập với Google</span>
            </Button>
          )}
        </div>
        <div className="w-full flex justify-center mt-2">
          <IonIcon name="caret-down" className="text-2xl" />
        </div>
        <WhileInView className="flex flex-col gap-4 mt-4 w-full">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginAccount(e);
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm font-medium">
                Tài khoản
              </label>
              <Input
                type="text"
                placeholder="Tài khoản"
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
            {loading ? (
              <Button
                className="font-medium text-sm rounded-lg bg-black text-white py-2 mt-4"
                disabled
              >
                Loading...
              </Button>
            ) : (
              <Button
                className="font-medium text-sm rounded-lg bg-black text-white py-2 mt-4"
                type="submit"
              >
                Đăng nhập
              </Button>
            )}
          </form>
          <hr className="mt-2" />
          <p className="mt-2">
            Nếu bạn chưa có tài khoản, hãy{" "}
            <Link
              href="/register"
              className="text-blue-600 font-medium underline"
            >
              đăng ký
            </Link>{" "}
          </p>
        </WhileInView>
      </View>
    </div>
  );
}
