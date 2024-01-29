"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type TextProps = {
  className?: string;
  text: string;
  el?: keyof JSX.IntrinsicElements;
  once?: boolean;
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    // y: 20,
  },
  visible: {
    opacity: 1,
    // y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function AnimateText({
  className,
  text,
  el: Wrapper = "p",
  once,
}: TextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  return (
    <Wrapper className={`${className}`}>
      <span className="sr-only">{text}</span>
      <motion.span
        className="aria-hidden"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }}
        aria-hidden
      >
        {text.split(" ").map((word, index) => (
          <span key={index} className="inline-block">
            {word.split("").map((char, index) => (
              <motion.span
                className="inline-block"
                key={index}
                variants={defaultAnimations}
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
