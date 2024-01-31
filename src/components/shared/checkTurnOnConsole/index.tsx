"use client";
import React, { useEffect } from "react";

export default function CheckTurnOnConsole() {
  useEffect(() => {
    const handleConsoleChange = (e: any) => {
      e.preventDefault();
      console.log(
        "%cTao chặn cái phím F12 rồi :))".replace(/\n/g, "\n\n"),
        "font-size: 1.5rem; font-weight: bold; color: #ff0000"
      );

      return false;
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "F12") {
        handleConsoleChange(e);
      }
    });

    return () => {
      window.removeEventListener("keydown", handleConsoleChange);
    };
  }, []);
  return null;
}
