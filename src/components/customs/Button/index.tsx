"use client";

import { motion } from "framer-motion";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  kind?:
    | "primary"
    | "primary-dark"
    | "primary-dark-full"
    | "secondary"
    | "danger"
    | "warning"
    | "success";
  disabled?: boolean;
};

export default function Button({
  children,
  className,
  type = "button",
  onClick,
  kind,
  disabled = false,
}: ButtonProps) {
  let kindClass = "";

  if (kind === "danger") {
    kindClass = "bg-red-500 text-white p-2 rounded-xl";
  }

  if (kind === "primary")
    kindClass =
      "bg-white shadow-primary border text-black border-gray-200 p-2 rounded-xl";

  if (kind === "primary-dark")
    kindClass = "bg-black shadow-primary text-white p-2 rounded-xl";

  if (kind === "primary-dark-full")
    kindClass = "bg-black shadow-primary text-white p-2 rounded-full";

  return (
    <motion.button
      onClick={onClick}
      type={type}
      whileTap={{ scale: 0.9 }}
      className={`flex justify-center items-center ${kindClass} ${className}`}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
