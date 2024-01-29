"use client";

import { MotionProps, motion } from "framer-motion";

type CustomPropsDiv = Omit<React.HTMLProps<HTMLDivElement>, "ref">;

type Props = CustomPropsDiv &
  MotionProps & {
    children?: React.ReactNode;
  };

const View = ({ children, ...rest }: Props) => {
  return (
    <motion.div aria-hidden {...rest}>
      {children}
    </motion.div>
  );
};

export default View;
