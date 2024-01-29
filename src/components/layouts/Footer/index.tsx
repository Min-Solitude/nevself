import Button from "@/components/customs/Button";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white w-full text-sm ">
      <hr className="border-1 border-primary" />
      <div className="h-[20rem] px-4 mt-8 md:mt-0 w-full md:px-0 flex justify-center">
        <div className="w-full md:w-[90%] duration-150 flex items-center flex-col lg:flex-row gap-8 lg:w-[80%]">
          <div className="w-full flex flex-col gap-8 items-center">
            <div className="flex justify-center items-center gap-4 lg:justify-start w-full">
              <Button
                kind="primary-dark"
                className="flex justify-center items-center px-8 py-3 gap-2"
              >
                <IonIcon name="logo-apple" className="text-2xl" />
                <span className="font-semibold translate-y-[10%]">
                  {" "}
                  App Store
                </span>
              </Button>
              <Button
                kind="primary"
                className="flex justify-center items-center px-8 py-3 gap-2"
              >
                <IonIcon name="logo-google-playstore" className="text-2xl" />
                <span className="font-semibold translate-y-[10%]">
                  {" "}
                  Google Play
                </span>
              </Button>
            </div>
            <ul className="font-medium text-gray-800 w-full flex justify-center lg:justify-start flex-wrap gap-4">
              <li>
                <Link href={"/"} className="hover:underline">
                  Đặc trưng
                </Link>
              </li>
              <li>
                <Link href={"/"} className="hover:underline">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href={"/"} className="hover:underline">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href={"/"} className="hover:underline">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href={"/"} className="hover:underline">
                  Báo cáo
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex w-full justify-center flex-wrap gap-8 lg:justify-end">
            <Link href={"/"} className="flex justify-center items-center">
              <IonIcon name="logo-facebook" className="text-3xl" />
            </Link>
            <Link href={"/"} className="flex justify-center items-center">
              <IonIcon name="logo-instagram" className="text-3xl" />
            </Link>
            <Link href={"/"} className="flex justify-center items-center">
              <IonIcon name="logo-twitter" className="text-3xl" />
            </Link>
            <Link href={"/"} className="flex justify-center items-center">
              <IonIcon name="logo-youtube" className="text-3xl" />
            </Link>
            <Link href={"/"} className="flex justify-center items-center">
              <IonIcon name="logo-linkedin" className="text-3xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
