"use client";

import Button from "@/components/customs/Button";
import Input from "@/components/customs/Input";
import View from "@/components/motions/View";
import WhileInView from "@/components/motions/WhileInView";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createProfileAccount } from "@/store/reducer/auth/auth.reducer";
import { useEffect, useState } from "react";
import CreateProduct from "./CreateProduct";
import Loading from "@/components/shared/Loading";
import { getProducts } from "@/store/reducer/product/product.reducer";

export default function AccountProductPage() {
  const profile = useAppSelector((state) => state.auth.profile);
  const account = useAppSelector((state) => state.auth.account);

  const loading = useAppSelector((state) => state.product.loading);
  const products = useAppSelector((state) => state.product.products);

  const dispatch = useAppDispatch();

  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isCreateProduct, setIsCreateProduct] = useState(false);

  const handleCreateProfile = (e: any) => {
    e.preventDefault();
    const kindProfile = e.target.kindProfile.value;

    if (account)
      dispatch(
        createProfileAccount({
          kindProfile,
          uid: account.uid,
        })
      );
  };

  useEffect(() => {
    if (profile?.kindProfile) {
      dispatch(getProducts({ uid: profile?.uid }));
    }
  }, []);

  console.log(products);

  return (
    <>
      {loading && <Loading kind="load-page" />}
      <WhileInView className="w-full flex justify-center items-center">
        {profile?.kindProfile ? (
          <div className="w-full">
            {account?.uid === profile?.uid && (
              <div className="w-full flex justify-end items-center">
                <Button
                  className="font-medium py-2 px-4"
                  kind={isCreateProduct ? "danger" : "primary"}
                  onClick={() => setIsCreateProduct(!isCreateProduct)}
                >
                  {isCreateProduct ? "Hủy" : "Tạo sản phẩm"}
                </Button>
              </div>
            )}
            {isCreateProduct && account?.uid ? (
              <CreateProduct
                uid={account?.uid}
                close={() => setIsCreateProduct(false)}
              />
            ) : (
              <div>1</div>
            )}
          </div>
        ) : account?.uid === profile?.uid ? (
          isShowPopup ? (
            <View className="min-h-[20vh] gap-2 md:gap-4 text-sm md:min-h-[40vh] bg-gray-100 border border-gray-200 w-full rounded-2xl flex flex-col items-center justify-center">
              <h1 className="font-medium md:font-bold md:text-xl text-gray-700 text-lg">
                Chủ đề của bạn
              </h1>
              <form
                className="w-full px-3 max-w-[26rem]"
                onSubmit={handleCreateProfile}
              >
                <Input
                  placeholder="Chủ đề (Tranh ảnh, link website,...)"
                  name="kindProfile"
                  id="kindProfile"
                  className="rounded-lg border border-gray-100 py-2 w-full shadow-sm px-3"
                  required
                />
                <i className="text-gray-600">
                  <span className="text-red-500">*</span>Mang tính chất khảo sát
                </i>
                <Button
                  kind="primary-dark"
                  className="font-medium mt-4 w-full"
                  type="submit"
                >
                  Tạo hồ sơ
                </Button>
              </form>
            </View>
          ) : (
            <div className="h-[20vh] bg-gray-100 rounded-2xl w-full px-3 md:px-0 border flex-col gap-2 border-gray-200 flex justify-center items-center">
              <Button
                kind="primary"
                className="font-medium px-4"
                onClick={() => setIsShowPopup(true)}
              >
                Tạo hồ sơ
              </Button>
              <i className="text-gray-400 text-center">
                Tạo hồ sơ để có thể đăng những sản phẩm của bạn
              </i>
            </div>
          )
        ) : (
          <div className="h-[20vh] bg-gray-100 rounded-2xl w-full px-3 md:px-0 border flex-col gap-2 border-gray-200 flex justify-center items-center">
            <i className="text-gray-400 text-center">
              Người dùng chưa có hồ sơ
            </i>
          </div>
        )}
      </WhileInView>
    </>
  );
}
