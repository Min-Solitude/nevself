"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

type ToggleProps = {
  isTurnOn: boolean;
  handleToggle: () => void;
};

export default function Toggle({ isTurnOn, handleToggle }: ToggleProps) {
  const [isOn, setIsOn] = useState(isTurnOn);

  return (
    <div
      className={` w-[55px]  h-[26px] flex rounded-full py-[3px] px-[4px] items-center cursor-pointer
      ${isOn ? "justify-end  bg-blue-500" : "justify-start bg-gray-200"}
      `}
      onClick={() => {
        handleToggle();
        setIsOn(!isOn);
      }}
    >
      <motion.div
        className="w-[16.6px] h-[16.6px] bg-white rounded-full"
        layout
        transition={spring}
      />
    </div>
  );
}
