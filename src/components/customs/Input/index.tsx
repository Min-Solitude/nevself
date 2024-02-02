import React from "react";

type Props = Readonly<{
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "url";
  placeholder?: string;
  className?: string;
  required?: boolean;
  defaultValue?: string;
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
  defaultValue,
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
      defaultValue={defaultValue}
    />
  );
}
