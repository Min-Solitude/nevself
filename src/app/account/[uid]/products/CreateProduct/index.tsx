"use client";

import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import WhileInView from "@/components/motions/WhileInView";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createProduct } from "@/store/reducer/product/product.reducer";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import React from "react";

type Props = {
  uid: string;
  close?: () => void;
};

export default function CreateProduct({ uid, close }: Props) {
  const [isImageProduct, setIsImageProduct] = React.useState<File | null>(null);
  const dispatch = useAppDispatch();

  const hanldeCreateProduct = (e: any) => {
    e.preventDefault();
    const payload = {
      image: isImageProduct,
      name: e.target.nameProduct.value,
      link: e.target.linkProduct.value,
      description: e.target.descriptionProduct.value,
      uid,
    };

    dispatch(createProduct(payload));

    e.target.reset();
    setIsImageProduct(null);
    close && close();
  };
  return (
    <WhileInView className="w-full mt-4 p-4 rounded-xl flex flex-col gap-4 border border-gray-200 bg-white shadow-primary">
      <h1 className="font-bold text-lg text-gray-800">Tạo sản phẩm</h1>
      <input
        type="file"
        accept="image/*"
        hidden
        name="imageProduct"
        onChange={(e: any) => {
          if (e.target.files[0]) {
            setIsImageProduct(e.target.files[0]);
          }
        }}
        id="imageProduct"
      />
      <label
        htmlFor="imageProduct"
        className="h-[20vh] flex justify-center items-center bg-gray-100 rounded-lg"
      >
        {isImageProduct ? (
          <Image
            src={
              isImageProduct
                ? URL.createObjectURL(isImageProduct)
                : "https://i.pinimg.com/736x/8c/41/43/8c4143462a98f8ceb1996748c9b83dfc.jpg"
            }
            alt="avatar"
            width={1440}
            height={1200}
            className=" w-full md:rounded-xl rounded-lg  h-full text-gray-700 object-cover"
          />
        ) : (
          <IonIcon name="camera" className="text-3xl text-gray-700" />
        )}
      </label>
      <form
        action=""
        className="mt-4 flex flex-col gap-2 w-full"
        onSubmit={hanldeCreateProduct}
      >
        <div className="flex flex-col w-full ">
          <label
            htmlFor="nameProduct"
            className="font-bold text-base text-gray-800"
          >
            Tiêu đề
          </label>
          <Input
            placeholder="Tiêu đề"
            name="nameProduct"
            id="nameProduct"
            required
            className="py-2 px-4 rounded-lg border border-gray-200 bg-gray-100"
          />
        </div>
        <div className="flex flex-col w-full ">
          <label
            htmlFor="linkProduct"
            className="font-bold text-base text-gray-800"
          >
            Link sản phẩm
          </label>
          <Input
            placeholder="Link sản phẩm"
            name="linkProduct"
            id="linkProduct"
            required
            type="url"
            className="py-2 px-4 rounded-lg border border-gray-200 bg-gray-100"
          />
        </div>
        <div className="flex flex-col w-full ">
          <label
            htmlFor="descriptionProduct"
            className="font-bold text-base text-gray-800"
          >
            Mô tả sơ sơ
          </label>
          <textarea
            name="descriptionProduct"
            id="descriptionProduct"
            required
            className="py-2 px-4 rounded-lg border h-[15vh] outline-none border-gray-200 bg-gray-100"
          />
        </div>
        <Button kind="primary-dark" className="w-full mt-4" type="submit">
          <span className="font-medium">Tạo sản phẩm</span>
        </Button>
      </form>
    </WhileInView>
  );
}
