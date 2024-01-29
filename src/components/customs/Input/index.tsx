import React from "react";

type Props = Readonly<{
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  className?: string;
  required?: boolean;
}>;

export default function Input({
  value,
  onChange,
  id,
  name,
  type = "text",
  placeholder,
  className,
  required,
}: Props) {
  return (
    <input
      className={`focus:outline-none ${className}`}
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
    />
  );
}
