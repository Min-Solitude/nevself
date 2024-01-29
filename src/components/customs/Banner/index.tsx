import AnimateText from "@/components/motions/AnimateText";
import View from "@/components/motions/View";
import IonIcon from "@reacticons/ionicons";
import React from "react";
import Button from "../Button";
import Image from "next/image";
import { IMAGES } from "@/assets/imgs";
import WhileInView from "@/components/motions/WhileInView";

export default function Banner() {
  return (
    <WhileInView className="min-h-[60vh] flex flex-col items-center w-full justify-start py-8 gap-8">
      <View className="w-full bg-white flex md:shadow-primary rounded-2xl du md:mt-8 justify-center items-center">
        <div className="md:border-[0.2rem] md:border-gray-200 lg:h-[60vh] xl:h-[75vh] overflow-hidden w-full rounded-xl bg-white flex justify-center items-center relative">
          <WhileInView className="flex flex-col  px-4 flex-1 text-black py-8 z-10 bg-white min-h-[20vh] justify-center items-center gap-4 ">
            <Image src={IMAGES.emoji} alt="logo" width={130} height={130} />
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 items-center">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <IonIcon
                    name="star"
                    key={index}
                    className="text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-center text-gray-700">
                Cùng bắt tay cùng 500,000 nhà sáng tạo khác
              </p>
            </div>
            <h1 className="font-bold text-black text-3xl xl:text-4xl text-center py-8">
              Dịch vụ tạo trang cá nhân chỉ <br />
              <AnimateText
                text="trong vài giây."
                el="span"
                className="text-gradient"
              />
            </h1>
            <Button
              kind="primary"
              className="px-4 py-3 text-sm hover:bg-black hover:text-white duration-200 gap-2 font-medium"
            >
              Bắt đầu ngay <IonIcon name="arrow-forward" />
            </Button>
            <p className="text-sm text-center mt-4 text-gray-700">
              Sử dụng dịch vụ hoàn toàn miễn phí.
            </p>
          </WhileInView>
          <div
            className="bg-gray-100 hidden xl:flex h-full shadow-primary rounded-l-2xl flex-1"
            style={{
              background:
                "url('https://i.pinimg.com/originals/46/07/57/460757eb7eb4e7dda4281f42afae6adf.jpg') center center / cover no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </View>
    </WhileInView>
  );
}
