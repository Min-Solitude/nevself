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

  if (kind === "primary")
    kindClass =
      "bg-white shadow-primary border text-black border-gray-200 p-2 rounded-xl";

  if (kind === "primary-dark")
    kindClass = "bg-black shadow-primary text-white p-2 rounded-xl";

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