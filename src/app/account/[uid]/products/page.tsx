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
import { Each } from "@/helper/Each";
import ItemProduct from "@/components/customs/ItemProduct";
import Skeleton from "@/components/shared/Skeleton";
import { Product } from "@/store/reducer/product/product.type";
import UpdateProduct from "./UpdateProduct";

export default function AccountProductPage() {
  const profile = useAppSelector((state) => state.auth.profile);
  const account = useAppSelector((state) => state.auth.account);

  const loading = useAppSelector((state) => state.product.loading);
  const products = useAppSelector((state) => state.product.products);

  const dispatch = useAppDispatch();

  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isCreateProduct, setIsCreateProduct] = useState(false);

  const [isUpdateProduct, setIsUpdateProduct] = useState<Product | null>(null);

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
  }, [profile?.uid, profile?.kindProfile]);

  if (isUpdateProduct) {
    return (
      <UpdateProduct
        product={isUpdateProduct}
        uid_account={account?.uid ? account?.uid : ""}
        close={() => setIsUpdateProduct(null)}
      />
    );
  }

  return (
    <>
      {loading && <Loading kind="load-action" />}
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
                  {isCreateProduct ? "Hủy" : "Đăng sản phẩm"}
                </Button>
              </div>
            )}
            {isCreateProduct && account?.uid ? (
              <CreateProduct
                uid={account?.uid}
                close={() => setIsCreateProduct(false)}
              />
            ) : (
              <div className="w-full mt-4 md:mt-8">
                {loading ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
                    {
                      <Each
                        of={[1, 2, 3, 4, 5]}
                        render={(_, index) => <Skeleton kind="load-item" />}
                      />
                    }
                  </div>
                ) : products && products.length > 0 ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
                    <Each
                      of={products}
                      render={(item, index) => (
                        <ItemProduct
                          createdAt={item.createdAt}
                          description={item.description}
                          image={item.image}
                          key={index}
                          link={item.link}
                          name={item.name}
                          status={item.status}
                          uid_creator={item.uid_creator}
                          delay={index * 0.1}
                          uid_account={account?.uid}
                          uuid_product={item.uuid}
                          handleUpdateProduct={() => {
                            setIsUpdateProduct(item);
                          }}
                          likes={item.likes}
                        />
                      )}
                    />
                  </div>
                ) : (
                  <div className="w-full h-[20vh] rounded-xl bg-gray-100 border border-gray-200 flex justify-center items-center font-semibold text-gray-700 text-lg">
                    Chưa có sản phẩm nào
                  </div>
                )}
              </div>
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
