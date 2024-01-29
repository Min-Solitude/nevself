import React from "react";
import Logo from "./components/Logo";
import Navlink from "./components/NavLink";

export default function Header() {
  return (
    <header className="bg-white w-full sticky top-0 z-40 flex justify-center p-4 md:px-0">
      <div className="w-full flex justify-between gap-4  duration-150 md:w-[90%] lg:w-[80%]">
        <Logo />
        <Navlink />
      </div>
    </header>
  );
}
