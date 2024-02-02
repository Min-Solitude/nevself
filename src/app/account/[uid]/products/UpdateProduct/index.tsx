import BackPage from "@/components/customs/BackPage";
import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import WhileInView from "@/components/motions/WhileInView";
import NotFound from "@/components/shared/NotFound";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateProduct } from "@/store/reducer/product/product.reducer";
import { Product } from "@/store/reducer/product/product.type";
import Image from "next/image";
import { useState } from "react";

type Props = {
  product: Product;
  uid_account: string;
  close?: () => void;
};

export default function UpdateProduct({ product, uid_account, close }: Props) {
  const [isImageProduct, setIsImageProduct] = useState<File | null>();
  const dispatch = useAppDispatch();

  if (uid_account !== product.uid_creator) return <NotFound />;

  const handleUpdateProduct = (e: any) => {
    e.preventDefault();
    const payload = {
      image: isImageProduct || null,
      imageOld: product?.image,
      name: e.target.nameProduct.value,
      link: e.target.linkProduct.value,
      description: e.target.descriptionProduct.value,
      uid: uid_account,
      uuid: product?.uuid,
    };

    dispatch(updateProduct(payload));

    close && close();
  };

  return (
    <div className="w-full  relative">
      <Button
        kind="primary"
        className="px-4 font-medium"
        onClick={() => close && close()}
      >
        Trở lại
      </Button>
      <WhileInView className="w-full mt-4 p-4 rounded-xl flex flex-col gap-4 border max-w-[40rem] m-auto border-gray-200 bg-white shadow-primary">
        <h1 className="font-bold text-lg text-gray-800">Chỉnh sửa sản phẩm</h1>
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
          className="h-[20vh] md:h-[30vh] flex justify-center items-center bg-gray-100 rounded-lg"
        >
          <Image
            src={
              isImageProduct
                ? URL.createObjectURL(isImageProduct)
                : product?.image
            }
            alt="avatar"
            width={1440}
            height={1200}
            className=" w-full md:rounded-xl rounded-lg  h-full text-gray-700 object-cover"
          />
        </label>
        <form
          action=""
          className="mt-4 flex flex-col gap-2 w-full"
          onSubmit={handleUpdateProduct}
        >
          <div className="flex flex-col w-full ">
            <label
              htmlFor="nameProduct"
              className="font-bold text-base text-gray-800"
            >
              Tiêu đề
            </label>
            <Input
              defaultValue={product?.name}
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
              defaultValue={product?.link}
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
              defaultValue={product?.description}
              name="descriptionProduct"
              id="descriptionProduct"
              required
              className="py-2 px-4 rounded-lg border h-[15vh] md:h-[25vh] outline-none border-gray-200 bg-gray-100"
            />
          </div>
          <Button kind="primary-dark" className="w-full mt-4" type="submit">
            <span className="font-medium">Cập nhật</span>
          </Button>
        </form>
      </WhileInView>
    </div>
  );
}
