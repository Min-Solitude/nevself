import BannerProfile from "@/components/customs/BannerProfile";
import NavProfile from "@/components/customs/NavProfile";
import Profile from "@/components/customs/Profile";
import React from "react";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white w-full flex justify-center">
      <div className="w-full flex flex-col  md:py-8 md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] gap-4 md:gap-8 duration-150">
        <BannerProfile />
        <Profile />
        <NavProfile />
        {children}
      </div>
    </div>
  );
}