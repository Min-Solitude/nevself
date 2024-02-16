"use client";

import BackPage from "@/components/customs/BackPage";
import Button from "@/components/customs/Button";
import DetailAuthor from "@/components/customs/DetailAuthor";
import WhileInView from "@/components/motions/WhileInView";
import { formatDate } from "@/helper/FormatDate";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getProductByUuid } from "@/store/reducer/product/product.reducer";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DetailProduct({
  params,
}: {
  params: {
    uid: string;
    uuid: string;
  };
}) {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const [isShowPopupProduct, setIsShowPopupProduct] = useState<boolean>(false);
  const account = useAppSelector((state) => state.auth.account);

  useEffect(() => {
    dispatch(getProductByUuid({ uuid: params.uuid, uid: params.uid }));
  }, [params.uuid, params.uid]);

  if (product?.uid_creator !== params.uid) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <WhileInView className="w-full md:bg-gray-100 p-0 md:p-8 md:rounded-2xl md:shadow-primary md:border md:border-gray-200 min-h-[60vh] flex flex-col gap-4 md:gap-8">
      <div>
        <BackPage type="icon" />
      </div>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-700 flex items-center">
          {product?.name ? product?.name : "---------"}
        </h1>
      </div>
      <div
        className={`w-full rounded-2xl md:h-[50vh] shadow-primary overflow-hidden ${
          !product?.image && "bg-gray-400 animate-pulse"
        }`}
      >
        {product?.image && (
          <Image
            src={product?.image}
            alt={product?.name}
            width={1440}
            height={1200}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex w-full items-center justify-between">
        {product?.updatedAt ? (
          <p>
            <span className="font-semibold text-base text-gray-700">
              Cập nhật:
            </span>{" "}
            <i className="text-green-500 font-medium">
              {formatDate(product?.updatedAt)}
            </i>
          </p>
        ) : (
          <p>
            <span className="font-semibold text-base text-gray-700">
              Đăng ngày:
            </span>{" "}
            <i className="text-gray-700 font-medium">
              {formatDate(product?.createdAt)}
            </i>
          </p>
        )}
        {product?.link && (
          <Link href={product?.link} className="text-blue-500 underline">
            Link sản phẩm
          </Link>
        )}
      </div>
      <div className="p-4 text-gray-800 rounded-xl bg-gray-100 md:bg-white border border-gray-200">
        <p>{product?.description}</p>
      </div>
      {product?.uid_creator && (
        <DetailAuthor
          uid_creator={product?.uid_creator}
          uuid_product={product?.uuid}
        />
      )}
    </WhileInView>
  );
}
