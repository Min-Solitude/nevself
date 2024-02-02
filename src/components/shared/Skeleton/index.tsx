import React from "react";

type Props = {
  kind: "load-page" | "load-item";
};

export default function Skeleton({ kind }: Props) {
  return (
    <div className="w-full bg-gray-100 border animate-pulse border-gray-200 rounded-xl shadow-primary p-2">
      <div className="h-[30vh] md:h-[20vh] bg-gray-300  rounded-xl overflow-hidden"></div>
      <div className="py-2">
        <div className="w-full flex gap-2 justify-between items-center">
          <div className="flex-1 flex-col gap-1 flex">
            <div className="h-2 w-[6rem] rounded-full bg-gray-300"></div>
            <div className="h-2 w-[3rem] rounded-full bg-gray-300"></div>
          </div>
          <div className="h-[2.5rem] w-[20%] rounded-lg bg-gray-300"></div>
        </div>
        <div className="w-full flex justify-end mt-4">
          <div className="h-[2.5rem] rounded-lg w-[100%] bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
