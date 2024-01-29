import AnimateText from "@/components/motions/AnimateText";
import WhileInView from "@/components/motions/WhileInView";
import React from "react";

type TitleProps = {
  className?: string;
  text: string;
  delay?: number;
  label?: string;
};

export default function Title({
  className,
  text,
  delay = 1,
  label,
}: TitleProps) {
  return (
    <WhileInView className={`${className}`} delay={delay}>
      <h1 className="lg:text-5xl text-3xl font-bold text-center">
        {label}
        {` `}
        <AnimateText text={text} className="text-gradient" />
      </h1>
    </WhileInView>
  );
}
