"use client";

import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";

interface whileInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  kind?: "default" | "spin-around";
}

const WhileInView = ({
  children,
  className,
  delay = 1,
  kind = "default",
}: whileInViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  if (kind === "spin-around") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, rotateY: 0 }}
        animate={
          isInView ? { opacity: 1, rotateY: 360 } : { opacity: 0, rotateY: 0 }
        }
        transition={{ duration: 0.5, delay: 0.2 * delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, translateY: 50 }}
      animate={
        isInView
          ? { opacity: 1, translateY: 0 }
          : { opacity: 0, translateY: 50 }
      }
      transition={{ duration: 0.5, delay: 0.2 * delay }}
    >
      {children}
    </motion.div>
  );
};

export default WhileInView;
