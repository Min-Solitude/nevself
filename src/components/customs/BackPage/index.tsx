import React from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

export default function BackPage({ className }: Props) {
  const router = useRouter();

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
