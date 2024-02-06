import React from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import IonIcon from "@reacticons/ionicons";

type Props = {
  className?: string;
  type?: "text" | "icon";
};

export default function BackPage({ className, type = "text" }: Props) {
  const router = useRouter();

  if (type === "icon") {
    return (
      <Button
        kind="primary"
        className={`font-medium px-4 ${className}`}
        onClick={() => {
          router.back();
        }}
      >
        <IonIcon name="arrow-back" />
      </Button>
    );
  }

  return (
    <Button
      kind="primary"
      className={`font-medium px-4 ${className}`}
      onClick={() => {
        router.back();
      }}
    >
      Trở lại
    </Button>
  );
}
